import { CSSProperties } from "react";
import BubbleHeader from "../BubbleHeader";
import styles from "./index.module.css";
import { Message, RawMessage } from "../../../types/channel";
import { relevanceFuniction } from "../../../utils/boxShadov";
import Icon from "../../Icon";
import Assets from "../../../utils/requireAssets";
import useRootStore from "../../../hooks/useRootStore";
import MessageAllert from "antd/lib/message";

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
    userId?: number;
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
    userId,
}: Props) => {
    const MESSAGE_STYLE = relevanceFuniction({} as RawMessage, relevance);
    const textSize = MESSAGE_STYLE.fontSize;

    const { getOneMember, adminId } = useRootStore().channelStore;
    const { user } = useRootStore().authStore;
    const { show } = useRootStore().visibleStore;

    const onRelevance = (id: number) => {
        if (adminId === user.id) {
            getOneMember(id);
            show("RelevenceModal");
        } else {
            MessageAllert.warning("You are not admin");
        }
    };

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
                    <div
                        className={styles.relevence}
                        onClick={() => onRelevance(userId as number)}
                    >
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
