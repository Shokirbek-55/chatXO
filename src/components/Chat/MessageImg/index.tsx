import { FC } from "react";

import styles from "./index.module.css";
import { ChannelsUsersType, RawMessage } from "../../../types/channel";
import { User } from "../../../types/user";
import { relevanceFuniction } from "../../../utils/boxShadov";
import SmallAvatar from "../../SmallAvatar/smallAvatar";
import { Env, TMP_URL } from "../../../env";
import DropDownMenu from "../DropDownMenu/dropdownmenu";
import { toJS } from "mobx";
import MessageHeader from "../MessageHeader";

interface Props {
  message: RawMessage;
  own?: boolean;
  users?: {
    [key: string]: ChannelsUsersType;
  };
}

const MessageImg: FC<Props> = ({ message, own, users }) => {

  const url = message.mediaUrl;

  const isOwnAvatarCard = own ? { display: "none" } : { display: "block" };
  const isOwn = own
    ? { justifyContent: "flex-end" }
    : { justifyContent: "flex-start" };

  const currentUser: ChannelsUsersType | undefined =
    users?.[message.userId];

  const MESSAGE_STYLE = relevanceFuniction(message);
  const boxShadov = MESSAGE_STYLE?.boxShadow;

  const handleRelevenceModal = () => {

  }

  return (
    <div className={styles.parentContainer} style={isOwn}>
      <div className={styles.childContainer}>
        {!own && (
          <MessageHeader
            name={message.username}
            relevance={message?.relevance}
            color={currentUser?.color}
          />
        )}
        <div className={styles.messageCard}>
          {!own && (
            <div className={styles.avatarCard}>
              {currentUser && (
                <SmallAvatar
                  color={currentUser?.color}
                  imageUrl={
                    currentUser.avatar
                      ? `${TMP_URL}/${currentUser.avatar}`
                      : ""
                  }
                />
              )}
            </div>
          )}
        <DropDownMenu massage={message}>
          <div style={{ boxShadow: boxShadov, borderRadius:'15px', display:'flex'}}>
            <img
              src={`${Env.AssetsUrl}/${url}`}
              alt="#"
              className={styles.imgCard}
              onClick={() => {
                handleRelevenceModal();
              }}
            />
          </div>
        </DropDownMenu>
        </div>
      </div>
    </div>
  );
};

export default MessageImg;
