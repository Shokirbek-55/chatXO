import { FC } from "react";
import { RawMessage } from "../../../types/channel";
import { User } from "../../../types/user";
import DropDownMenu from "../DropDownMenu/dropdownmenu";
import MessageHeader from "../MessageHeader";
import { ReplyTypeRender } from "./beforeSendReply";
import styles from "./index.module.css";
import { relevanceFuniction } from "../../../utils/boxShadov";
import SmallAvatar from "../../SmallAvatar/smallAvatar";
import { Env } from "../../../env";
import Text from "../../Text/Text";
import Colors from "../../../utils/colors";

interface Props {
  message: RawMessage;
  position?: boolean;
  users?: User[];
}

const RepliedMessage: FC<Props> = ({ message, position, users }) => {

  const currentUser: User | null =
    users?.find((user) => user.id === message.userId) ?? null;
  
  const positionMessage = position
    ? { justifyContent: "flex-end" }
    : { justifyContent: "flex-start" };

  const messageHeaderIsPosition = position
    ? { display: "none" }
    : { display: "block", justifyContent: "flex-end" };

  const MESSAGE_STYLE = relevanceFuniction(message);
  const boxShadov = MESSAGE_STYLE?.boxShadow;
  const textSize = MESSAGE_STYLE?.fontSize;
  const textWeight = MESSAGE_STYLE?.fontWeight;
  const textLineHeight = MESSAGE_STYLE?.lineHeight;

  const handleRelevenceModal = () => {
   
  }

  return (
    <div className={styles.container} style={positionMessage}>
      <div className={styles.originMessageCard} style={positionMessage}>
        <div style={messageHeaderIsPosition}>
          <span onClick={() => handleRelevenceModal()}>
            <MessageHeader
              name={message.username}
              color={message.color}
              relevance={message?.relevance}
            />
          </span>
        </div>
        <div className={styles.replyMessageBox}>
          <div className={styles.avatarCard} style={messageHeaderIsPosition}>
            <SmallAvatar
              style={{ display: "flex", justifyContent: "flex-end" }}
              color={currentUser?.color}
              imageUrl={
                currentUser?.avatar
                  ? `${Env.AssetsUrl}/${currentUser?.avatar}`
                  : ""
              }
            />
          </div>
          <div
            className={styles.replyMessageCard}
            style={{ boxShadow: boxShadov }}
          >
            <MessageHeader
              name={message.originMessage?.username}
              showReply
              color={message?.color}
              style={{
                fontFamily: "sans-serif",
                fontSize: "20px",
              }}
            />
            {ReplyTypeRender(message)}
            <DropDownMenu massage={message}>
              <Text
                style={{
                  color: Colors.ChatText,
                  fontSize: textSize,
                  fontWeight: textWeight,
                  lineHeight: textLineHeight,
                }}
              >
                {message.message}
              </Text>
            </DropDownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RepliedMessage;
