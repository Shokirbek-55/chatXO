import { CSSProperties, useMemo } from "react";
import BubbleHeader from "../BubbleHeader";
import styles from "./index.module.css";
import { Message, RawMessage } from "../../../types/channel";
import { relevanceFuniction } from "../../../utils/boxShadov";
import Icon from "../../Icon";
import Assets from "../../../utils/requireAssets";
import useRootStore from "../../../hooks/useRootStore";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { toJS } from "mobx";

interface Props {
    message?: RawMessage;
    onStarPress?: () => void;
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
    showReply,
    userId,
    onStarPress,
}: Props) => {
    const MESSAGE_STYLE = relevanceFuniction({} as RawMessage, relevance);
    const textSize = MESSAGE_STYLE.fontSize;

    const { getOneMember, channelUsers } = useRootStore().channelStore;
    const { pimpMessage, unPimpMessage } = useRootStore().chatStore;
    const { user } = useRootStore().authStore;

    const onRelevance = async (id: number) => {
        getOneMember(id);
    };

    console.log("message", toJS(message));

    const PimpMesssage = (
        userId: any,
        messageId: any,
        channelSlug: string,
        timestamp: any
    ) => {
        pimpMessage(userId, messageId, channelSlug, timestamp);
        console.log("pimp", toJS(message?.relevance));
    };
    const myself = channelUsers.find((e) => e.id === user.id);

    const jsonStr = message?.pimps as never;

    // useMemo orqali JSON matnini obyektda ajratib olamiz
    const data = useMemo(() => {
        try {
            return JSON.parse(jsonStr);
        } catch (error) {
            console.error("JSON parsing error:", error);
            return {};
        }
    }, [jsonStr]);

    // data obyekti ichida 265 kalitining mavjudligini tekshiramiz
    const hasKey265 = (user?.id as never) in data;

    const UnPimpMesssage = (
        userId: any,
        messageId: any,
        channelSlug: string,
        timestamp: any
    ) => {
        unPimpMessage(userId, messageId, channelSlug, timestamp);
        console.log("ccccc");
    };

    console.log("ispImp", toJS(hasKey265));

    return (
        <div className={styles.container}>
            <div className={styles.replayContainer}>
                <BubbleHeader
                    title={name}
                    color={color}
                    padding={5}
                    textSize={textSize}
                    onPress={() => onRelevance(userId || 0)}
                />
                {!showReply && (
                    <div className={styles.relevence}>
                        <div
                            className={styles.messageHeaderStar}
                            onClick={() => onRelevance(userId || 0)}
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
                            <Icon
                                src={Assets.up_downIcon}
                                width="15px"
                                height="15px"
                                color={"#000"}
                            />
                        </div>
                        {hasKey265 ? (
                            <AiFillStar
                                color="#FFAA33"
                                onClick={() =>
                                    UnPimpMesssage(
                                        user.id,
                                        message?.id,
                                        message?.channelSlug as never,
                                        message?.timestamp
                                    )
                                }
                            />
                        ) : (
                            <AiOutlineStar
                                onClick={() =>
                                    PimpMesssage(
                                        user.id,
                                        message?.id,
                                        message?.channelSlug as never,
                                        message?.timestamp
                                    )
                                }
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default MessageHeader;
