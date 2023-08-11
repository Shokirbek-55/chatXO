import { FC, useState } from "react";
import CircleProgress from "../CircleProgress";
import styles from "./index.module.css";
import DropDownMenu from "../DropDownMenu/dropdownmenu";
import { ChannelsUsersType, RawMessage } from "../../../types/channel";
import { User } from "../../../types/user";
import { relevanceFuniction } from "../../../utils/boxShadov";
import { DocumentIcon, DownloadIcon } from "../../../utils/icons";
import SmallAvatar from "../../SmallAvatar/smallAvatar";
import { Env } from "../../../env";
import Colors from "../../../utils/colors";
import axios from "axios";

interface Props {
  message: RawMessage;
  status: "Play" | "Download" | "View";
  downloadFile?: () => void;
  loading: boolean;
  mediaLocation?: string;
  deleteReportMessage?: () => void;
  mediaTitle?: string;
  own?: boolean;
  isReply?: boolean;
  users?: {
    [key: string]: ChannelsUsersType;
  };
}

const MessageDoc: FC<Props> = ({
  message,
  users,
  mediaLocation,
  mediaTitle,
  own,
  status,
  isReply,
  downloadFile,
}) => {
  const [state, setState] = useState<any>();
  const [percentCompleted, setPercentCompleted] = useState<any>(0);

  const filename = mediaTitle ?? "";

  const isOwnAvatarCard = own ? { display: "none" } : { display: "block" };
  const isOwn = own
    ? { justifyContent: "flex-end" }
    : { justifyContent: "flex-start" };

  const currentUser: ChannelsUsersType | undefined =
    users?.[message.userId];

  const MESSAGE_STYLE = relevanceFuniction(message);
  const boxShadov = MESSAGE_STYLE?.boxShadow;
  const textSize = MESSAGE_STYLE?.fontSize;

  const handleClickDownloader = async() => {
    await axios({
      url: `${Env.AssetsUrl}/${mediaLocation}`,
      method: "GET",
      responseType: "blob", // important
      onDownloadProgress: (progressEvent) => {
        setPercentCompleted(
          Math.round((progressEvent.loaded * 100) / progressEvent.total!)
        ); // you can use this to show user percentage of file downloaded
      },
    })
      .then((response) => {
        console.log(response, "response");

        const url = window.URL.createObjectURL(
          new Blob([response.data], {
            type: response.headers["content-type"],
          })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        setState({ downloading: false });
        console.log("Errore: " + error.message);
        return [];
      });
  };

  const changeIcons = () => {
    if (percentCompleted == 0) {
      return <DownloadIcon />;
    } else if (percentCompleted == 100) {
      return <DocumentIcon />;
    } else {
      return <CircleProgress progress={percentCompleted} />;
    }
  };

  return (
    <div className={styles.container} style={isOwn}>
      <div className={styles.avatarCard} style={isOwnAvatarCard}>
        <SmallAvatar
          style={{ justifyContent: "flex-end" }}
          color={currentUser?.color}
          imageUrl={
            currentUser?.avatar ? `${Env.AssetsUrl}/${currentUser?.avatar}` : ""
          }
        />
      </div>

      <div className={styles.docMessage} style={{ boxShadow: boxShadov }}>
        <DropDownMenu massage={message}>
          <div
            className={styles.ownCard}
            onClick={() => handleClickDownloader()}
          >
            <div
              className={styles.ondownloadCard}
              style={{ backgroundColor: Colors.YellowOrange }}
            >
              {changeIcons()}
            </div>
            <span
              style={{
                fontSize: textSize,
                marginTop: "10px",
                fontFamily: 'Montserrat4'
              }}
            >
              {mediaTitle}
            </span>
          </div>
        </DropDownMenu>
      </div>
    </div>
  );
};

export default MessageDoc;
