import axios from "axios";
import { FC, useState } from "react";
import { Env } from "../../../env";
import { ChannelsUsersType, RawMessage } from "../../../types/channel";
import { relevanceFuniction } from "../../../utils/boxShadov";
import Colors from "../../../utils/colors";
import { DocumentIcon, DownloadIcon } from "../../../utils/icons";
import CircleProgress from "../CircleProgress";
import MessageComponent from "../MessageComponent/MessageComponent";
import styles from "./index.module.css";

interface Props {
  message: RawMessage;
  status: "Play" | "Download" | "View";
  downloadFile?: () => void;
  loading: boolean;
  mediaLocation?: string;
  deleteReportMessage?: () => void;
  mediaTitle?: string;
}

const MessageDoc: FC<Props> = ({
  message,
  mediaLocation,
  mediaTitle,
}) => {
  const [percentCompleted, setPercentCompleted] = useState<any>(0);

  const filename = mediaTitle ?? "";

  const MESSAGE_STYLE = relevanceFuniction(message);
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
          fontFamily: 'Montserrat',
          fontWeight:500
              }}
            >
              {mediaTitle}
            </span>
          </div>
  );
};

export default MessageDoc;
