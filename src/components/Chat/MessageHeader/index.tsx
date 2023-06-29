import { CSSProperties } from "react";
import BubbleHeader from "../BubbleHeader";
import styles from "./index.module.css";
import { Message, RawMessage } from "../../../types/channel";
import { relevanceFuniction } from "../../../utils/boxShadov";
import Icon from "../../Icon";
import Assets from "../../../utils/requireAssets";


interface Props {
  message?: RawMessage;
  onStarPress?: (
    messageID?: string | number,
    isPimped?: boolean,
    timeStamp?: string,
    relevance?: number
  ) => void;
  isPimped?: boolean;
  showStar?: boolean;
  timeStamp?: string;
  relevance?: number;
  openRelevence?: () => void;
  position?: string;
  channelSlug?: string;
  channelID?: number;
  name?: string;
  showReply?: boolean;
  showMinRelevance?: boolean;
  hideMessage?: () => void;
  repliedMessage?: Message;
  channelId?: number;
  color?: string;
  filterMsgNumber?: number | null | undefined;
  style?: CSSProperties;
}

const MessageHeader = ({
  message,
  name,
  color,
  relevance,
  openRelevence,
  channelID,
  channelSlug,
  filterMsgNumber,
  hideMessage,
  isPimped,
  repliedMessage,
  showMinRelevance,
  showReply,
  style,
}: Props) => {
  const MESSAGE_STYLE = relevanceFuniction(message as RawMessage);
  const textSize = MESSAGE_STYLE?.fontSize;

  return (
    <div className={styles.container}>
      <div className={styles.replayContainer}>
        <BubbleHeader
          title={name}
          color={color}
          padding={5}
          textSize={textSize}
        />
        {!showReply && (
          <div className={styles.relevence}>
            <button
              style={{
                fontFamily: "sans-serif",
                fontSize: "15px",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              {relevance}
            </button>
            {/* {showStar && ( */}
            <div className={styles.messageHeaderStar}>
              <Icon
                src={Assets.up_downIcon}
                width="15px"
                height="15px"
                color={color}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default MessageHeader;
