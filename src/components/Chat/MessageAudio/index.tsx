import { FC } from "react";
import ReactAudioPlayer from "react-audio-player";
import DropDownMenu from "../DropDownMenu/dropdownmenu";
import MessageHeader from "../MessageHeader";
import styles from "./index.module.css";
import { RawMessage } from "../../../types/channel";
import { User } from "../../../types/user";
import { relevanceFuniction } from "../../../utils/boxShadov";
import SmallAvatar from "../../SmallAvatar/smallAvatar";
import { Env } from "../../../env";

interface Props {
  message: RawMessage;
  position: boolean;
  users?: User[];
}

const MessageAudio: FC<Props> = ({ message, users, position }) => {
  const url = message.mediaUrl;

  const POSITION_MESSAGE = position
    ? { justifyContent: "flex-start" }
    : { justifyContent: "flex-end" };

  const currentUser: User | null =
    users?.find((user) => user.id === message.userId) ?? null;

  const MESSAGE_STYLE = relevanceFuniction(message);
  const boxShadov = MESSAGE_STYLE?.boxShadow;

  const messageUSerId = message.userId
  const handleRelevenceModal = () => {
   
  }

  return (
    <div className={styles.parentContainer} style={POSITION_MESSAGE}>
      <div className={styles.childContainer}>
        {position && (
          <span onClick={() => handleRelevenceModal()}>
            <MessageHeader
              name={message.username}
              relevance={message?.relevance}
              color={currentUser?.color}
            />
          </span>
        )}
        <div className={styles.messageCard}>
          {position && (
            <div className={styles.avatarCard}>
              {currentUser && (
                <SmallAvatar
                  color={currentUser?.color}
                  imageUrl={
                    currentUser.avatar
                      ? `${Env.AssetsUrl}/${currentUser.avatar}`
                      : ""
                  }
                />
              )}
            </div>
          )}
          <DropDownMenu massage={message}>
            <div
              className={styles.videoContainer}
              style={{
                boxShadow: boxShadov,
                borderRadius: "30px",
                overflow: "hidden",
                backgroundColor: "#f4f3f3e",
                height: "50px",
                zIndex: "11",
                padding: 0,
              }}
            >
              <ReactAudioPlayer
                src={
                  url.startsWith("blob") ? `${url}` : `${Env.AssetsUrl}/${url}`
                }
                controls
                style={{
                  backgroundColor: "red",
                  borderRadius: "30px",
                  height: "50px",
                  zIndex: "11",
                }}
              />
            </div>
          </DropDownMenu>
        </div>
      </div>
    </div>
  );
};

export default MessageAudio;
