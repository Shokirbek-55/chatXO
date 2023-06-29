import { FC, useState } from "react";
import CircleProgress from "../CircleProgress";
import styles from "./index.module.css";
import DropDownMenu from "../DropDownMenu/dropdownmenu";
import { RawMessage } from "../../../types/channel";
import { User } from "../../../types/user";
import { relevanceFuniction } from "../../../utils/boxShadov";
import { DocumentIcon, DownloadIcon } from "../../../utils/icons";
import SmallAvatar from "../../SmallAvatar/smallAvatar";
import { Env } from "../../../env";
import Colors from "../../../utils/colors";

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
  users?: User[];
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

  const currentUser: User | null =
    users?.find((user) => user.id === message.userId) ?? null;

  const MESSAGE_STYLE = relevanceFuniction(message);
  const boxShadov = MESSAGE_STYLE?.boxShadow;
  const textSize = MESSAGE_STYLE?.fontSize;
  const textWeight = MESSAGE_STYLE?.fontWeight;
  const textLineHeight = MESSAGE_STYLE?.lineHeight;

  const handleClickDownloader =  () => {

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
            currentUser?.avatar ? `${Env.AssetsUrl}/${currentUser.avatar}` : ""
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
