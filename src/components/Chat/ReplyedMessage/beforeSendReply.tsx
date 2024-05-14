import styles from './index.module.css';
import { RawMessage } from '../../../types/channel';
import { relevanceFuniction } from '../../../utils/boxShadov';
import Text from '../../Text/Text';
import Colors from '../../../utils/colors';
import { Env } from '../../../env';
import { DocumentIcon, VideoPlayIcon, ChartIcon } from '../../../utils/icons';

export const ReplyTypeRender = (ReplyMessage: RawMessage) => {
    const originMedialUrl = ReplyMessage.originMessage?.mediaUrl;
    const replyMessageStyle: any = ReplyMessage.originMessage;
    const MESSAGE_STYLE_REPLAYED = relevanceFuniction(replyMessageStyle);

    const textSizeReplayed = MESSAGE_STYLE_REPLAYED?.fontSize;
    const textWeightReplayed = MESSAGE_STYLE_REPLAYED?.fontWeight;
    const lineHeightReplayed = MESSAGE_STYLE_REPLAYED?.lineHeight;

    if (ReplyMessage.originMessage?.type === 'text') {
        return (
            <div className={styles.replyedMessage}>
                <Text
                    children={ReplyMessage.originMessage?.message}
                    style={{
                        fontFamily: 'sans-serif',
                        color: Colors.ChatText,
                        fontSize: textSizeReplayed,
                        fontWeight: textWeightReplayed,
                        lineHeight: lineHeightReplayed,
                    }}
                />
            </div>
        );
    }

    if (ReplyMessage.originMessage?.type === 'image') {
        return (
            <div className={styles.replyedMediaCard}>
                <img
                    src={`${Env.AssetsUrl}/${originMedialUrl}`}
                    width={40}
                    height={40}
                    style={{ borderRadius: '6px' }}
                    alt=""
                />
            </div>
        );
    }

    if (ReplyMessage.originMessage?.type === 'video') {
        return (
            <div className={styles.replyedMediaCard}>
                <VideoPlayIcon size={30} padding={5} color={Colors.BaliHai} hoverActive={false} />
            </div>
        );
    }

    if (ReplyMessage.originMessage?.type === 'document') {
        return (
            <div className={styles.replyedMediaCard}>
                <DocumentIcon size={30} padding={5} color={Colors.BaliHai} hoverActive={false} />
            </div>
        );
    }

    if (ReplyMessage.originMessage?.type === 'audio') {
        return (
            <div className={styles.replyedMediaCard}>
                <VideoPlayIcon size={30} padding={5} color={Colors.BaliHai} hoverActive={false} />
            </div>
        );
    }

    if (ReplyMessage.originMessage?.type === 'NORMAL' || ReplyMessage.originMessage?.type === 'RELEVANCE') {
        return (
            <div className={styles.replyedMediaCard}>
                <ChartIcon size={30} padding={5} color={Colors.BaliHai} hoverActive={false} />
                <Text
                    children={`Poll: ${ReplyMessage.originMessage?.type.toLocaleLowerCase()}`}
                    style={{
                        fontFamily: 'sans-serif',
                        color: Colors.ChatText,
                        fontSize: '12px',
                        fontWeight: 700,
                    }}
                />
            </div>
        );
    }
};
