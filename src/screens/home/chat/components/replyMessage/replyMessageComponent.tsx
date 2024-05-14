import styles from './replyMessage.module.css';
import { Env } from '../../../../../env';
import { ChartIcon, CloseIcon, DocumentIcon, EditIcon, ReplyIcon, VideoPlayIcon } from '../../../../../utils/icons';
import Colors from '../../../../../utils/colors';
import { observer } from 'mobx-react-lite';
import useRootStore from '../../../../../hooks/useRootStore';
import { RawMessage } from '../../../../../types/channel';

const ReplyMessage = () => {
    const { setReplyMessage, editMessage, clearReplyMessage, setMessageText } = useRootStore().messageStore;

    function renderReplayMessage(message: RawMessage) {
        let result = <div />;

        if (message.type === 'text') {
            result = (
                <div className={styles.replyTextCard}>
                    <span
                        className={styles.userName}
                        style={{
                            color: message.color,
                        }}
                    >
                        {message.username}
                    </span>
                    <div className={styles.reply_message_box}>{message.message}</div>
                </div>
            );
        } else {
            let LeftIconArea = <div />;
            switch (message.type) {
                case 'image':
                    LeftIconArea = (
                        <img
                            src={`${Env.AssetsUrl}/${message.mediaUrl}`}
                            width={40}
                            height={40}
                            style={{ borderRadius: '6px', objectFit: 'cover' }}
                            alt=""
                        />
                    );
                    break;
                case 'video':
                    LeftIconArea = (
                        <video
                            src={`${Env.AssetsUrl}/${message.mediaUrl}`}
                            width={40}
                            height={40}
                            style={{ borderRadius: '6px', objectFit: 'cover' }}
                        />
                    );
                    break;
                case 'document':
                    LeftIconArea = <DocumentIcon size={30} padding={0} color={Colors.BaliHai} hoverActive={false} />;
                    break;
                case 'audio':
                    LeftIconArea = <VideoPlayIcon size={30} padding={0} color={Colors.BaliHai} hoverActive={false} />;
                    break;
                case 'NORMAL':
                    LeftIconArea = <ChartIcon size={30} padding={0} color={Colors.BaliHai} hoverActive={false} />;
                    break;
                case 'RELEVANCE':
                    LeftIconArea = <ChartIcon size={30} padding={0} color={Colors.BaliHai} hoverActive={false} />;
                    break;
                default:
                    LeftIconArea = <div />;
                    break;
            }
            result = (
                <div className={styles.replyVideoCard}>
                    <div className={styles.replyMessage}>
                        <span
                            className={styles.userName}
                            style={{
                                color: message.color,
                            }}
                        >
                            {message.username}
                        </span>
                        <div className={styles.replyMessageType}>{message.type}</div>
                    </div>
                    <div className={styles.reply_video_message_box}>{LeftIconArea}</div>
                </div>
            );
        }
        return result;
    }

    const ReplayOrEditIcon = editMessage ? EditIcon : ReplyIcon;

    return (
        <>
            {!!setReplyMessage ? (
                <div className={styles.container}>
                    <div className={styles.replyIcon}>
                        <ReplayOrEditIcon size={20} padding={10} color={Colors.BaliHai} hoverActive={false} />
                    </div>
                    {renderReplayMessage(setReplyMessage)}
                    <div
                        className={styles.cencelBtn}
                        onClick={() => {
                            setMessageText('');
                            clearReplyMessage();
                        }}
                    >
                        <CloseIcon size={20} padding={14} color={Colors.BaliHai} />
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default observer(ReplyMessage);
