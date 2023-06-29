import { FC } from "react";

import styles from "./index.module.css";
import { RawMessage } from "../../../types/channel";
import { User } from "../../../types/user";
import { relevanceFuniction } from "../../../utils/boxShadov";
import SmallAvatar from "../../SmallAvatar/smallAvatar";
import { Env } from "../../../env";
import DropDownMenu from "../DropDownMenu/dropdownmenu";

interface Props {
  message: RawMessage;
  own?: boolean;
  users?: User[];
}

const MessageImg: FC<Props> = ({ message, own, users }) => {

  const url = message.mediaUrl;

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

  const handleRelevenceModal = () => {
    
  }

  return (
    <div className={styles.parentContainer} style={isOwn}>
      <div className={styles.avatarCard} style={isOwnAvatarCard}>
        <SmallAvatar
          style={{ justifyContent: "flex-end" }}
          color={currentUser?.color}
          imageUrl={
            currentUser?.avatar ? `${Env.AssetsUrl}/${currentUser.avatar}` : ""
          }
        />
      </div>
      <DropDownMenu massage={message}>
        <div style={{ boxShadow: boxShadov }}>
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
  );
};

export default MessageImg;
