import { FC } from "react";
import styles from "./index.module.css";
import DropDownMenu from "../DropDownMenu/dropdownmenu";
import { ChannelsUsersType, RawMessage } from "../../../types/channel";
import { User } from "../../../types/user";
import { relevanceFuniction } from "../../../utils/boxShadov";
import SmallAvatar from "../../SmallAvatar/smallAvatar";
import { Env } from "../../../env";

interface Props {
  message: RawMessage;
  own?: boolean;
  users?: {
    [key: string]: ChannelsUsersType;
  };
}

const MessageVideo: FC<Props> = ({ message, users, own }) => {
  const url = message.mediaUrl;

  const isOwnAvatarCard = own ? { display: "none" } : { display: "block" };
  const isOwn = own
    ? { justifyContent: "flex-end" }
    : { justifyContent: "flex-start" };
  const currentUser: ChannelsUsersType | undefined =
    users?.[message.userId];

  const MESSAGE_STYLE = relevanceFuniction(message);
  const boxShadov = MESSAGE_STYLE?.boxShadow;
  const textSize = MESSAGE_STYLE?.fontSize;
  const textWeight = MESSAGE_STYLE?.fontWeight;
  const textLineHeight = MESSAGE_STYLE?.lineHeight;

  const handleRelevenceModal = () => {
    
  }

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
      <DropDownMenu massage={message}>
        <div style={{ boxShadow: boxShadov }} className={styles.messageCard}>
          <video
            id="player"
            playsInline
            controls
            // data-poster="/path/to/poster.jpg"
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
        </div>
      </DropDownMenu>
    </div>
  );
};

export default MessageVideo;
