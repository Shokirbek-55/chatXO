import { FC } from "react";
import styles from "./replyMessage.module.css";
import { Env } from "../../../../../env";
import { CloseIcon, DocumentIcon, ReplyIcon, VideoPlayIcon } from "../../../../../utils/icons";
import Colors from "../../../../../utils/colors";


export type MessageReply = {
  slug: string;
  message: any;
};

interface Props {
  replyMessages?: MessageReply[];
  isReply: boolean;
  other: boolean;
}

const ReplyMessage: FC<Props> = ({ replyMessages, isReply, other }) => {

  const OtherReplyMessage = other ? styles.container : styles.noneContainer;


  const hadleCloseBtn = () => {
    
  };

  function renderReplayMessage(messageType: any) {
    let result = <div />;

    if (messageType.type === "text") {
      result = (
        <div className={styles.replyTextCard}>
          <span className={styles.userName}>{messageType.username}</span>
          <div className={styles.reply_message_box}>
            <span className={styles.reply_message}>{messageType.message} </span>
          </div>
        </div>
      );
    }
    if (messageType.type === "image") {
      result = (
        <div className={styles.replyImgCard}>
          <span className={styles.userName}>{'REPLY_USENAME'}</span>
          <div className={styles.reply_img_message_box}>
            {/* <span className={styles.reply_img_message}> */}
            <img
              src={`${Env.AssetsUrl}/${messageType.mediaUrl}`}
              width={40}
              height={40}
              style={{ borderRadius: "6px" }}
              alt=""
            />
            {/* </span> */}
          </div>
        </div>
      );
    }
    if (messageType.type === "video") {
      result = (
        <div className={styles.replyVideoCard}>
          <span className={styles.userName}>{'REPLY_USENAME'}</span>
          <div className={styles.reply_video_message_box}>
            <span className={styles.reply_video_message}>
              <VideoPlayIcon
                size={30}
                padding={14}
                color={Colors.BaliHai}
                hoverActive={false}
              />
            </span>
          </div>
        </div>
      );
    }
    if (messageType.type === "document") {
      result = (
        <div className={styles.replyDocCard}>
          <span className={styles.userName}>{'REPLY_USENAME'}</span>
          <div className={styles.reply_doc_message_box}>
            <span className={styles.reply_doc_message}>
              <DocumentIcon
                size={30}
                padding={14}
                color={Colors.BaliHai}
                hoverActive={false}
              />
            </span>
          </div>
        </div>
      );
    }
    if (messageType.type === "audio") {
      result = (
        <div className={styles.replyDocCard}>
          <span className={styles.userName}>{'REPLY_USENAME'}</span>
          <div className={styles.reply_doc_message_box}>
            <span className={styles.reply_doc_message}>
              <VideoPlayIcon
                size={30}
                padding={14}
                color={Colors.BaliHai}
                hoverActive={false}
              />
            </span>
          </div>
        </div>
      );
    }
    return result;
  }

  return (
    <>
      {!!'REPLY_MESSAGE' ? (
        <div className={OtherReplyMessage}>
          <div className={styles.replyIcon}>
            <ReplyIcon
              size={20}
              padding={10}
              color={Colors.BaliHai}
              hoverActive={false}
            />
          </div>
          {renderReplayMessage('REPLYED_MESSAGE')}
          <div className={styles.cencelBtn} onClick={() => hadleCloseBtn()}>
            <CloseIcon size={20} padding={14} color={Colors.BaliHai} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ReplyMessage;
