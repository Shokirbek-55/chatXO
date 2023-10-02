import { FC } from "react";
import { Env } from "../../../env";
import { ChannelsUsersType, RawMessage } from "../../../types/channel";
import MessageComponent from "../MessageComponent/MessageComponent";
import styles from "./index.module.css";

interface Props {
  message: RawMessage;
  own: boolean;
  users?: {
    [key: string]: ChannelsUsersType;
  };
}

const MessageVideo: FC<Props> = ({ message, users, own }) => {
  const url = message.mediaUrl;

  return (
    <MessageComponent position={own} message={message} users={users}>
          <video
            id="player"
            controls
            data-poster="/path/to/poster.jpg"
            className={styles.videoPlayer}
          >
            <source src={`${Env.AssetsUrl}/${url}`} type="video/mp4" />
            <track
              kind="captions"
              label="English captions"
              src="/path/to/captions.vtt"
              srcLang="en"
              default
            />
      </video>
    </MessageComponent>
  );
};

export default MessageVideo;
