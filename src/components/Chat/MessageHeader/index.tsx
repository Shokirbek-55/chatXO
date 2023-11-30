import {
    CSSProperties,
    Dispatch,
    SetStateAction,
    useMemo,
    useState,
} from "react";
import BubbleHeader from "../BubbleHeader";
import styles from "./index.module.css";
import { RawMessage } from "../../../types/channel";
import { relevanceFuniction } from "../../../utils/boxShadov";
import Icon from "../../Icon";
import Assets from "../../../utils/requireAssets";
import useRootStore from "../../../hooks/useRootStore";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

interface Props {
    message?: RawMessage;
    relevance?: number;
    name?: string;
    showReply?: boolean;
    color?: string;
    userId?: number;
    style?: CSSProperties;
    setPimp?: Dispatch<
        SetStateAction<
            | {
                  pimpType: "pimp" | "unPimp";
                  value: number | undefined;
              }
            | undefined
        >
    >;
}

const MessageHeader = ({
    message,
    name,
    color,
    relevance,
    showReply,
    userId,
    setPimp,
}: Props) => {
    const MESSAGE_STYLE = relevanceFuniction({} as RawMessage, relevance);
    const textSize = MESSAGE_STYLE.fontSize;

    const { getOneMember, channelUsers } = useRootStore().channelStore;
    const { pimpMessage, unPimpMessage } = useRootStore().chatStore;
    const { user } = useRootStore().authStore;
    const [activePimp, setActivePimp] = useState(false);

    const myself = useMemo(
        () => channelUsers.find((e) => e.id === user.id),
        [channelUsers, user]
    );

    const jsonStr = message?.pimps as never;

    const data: {
        [key: string]: number;
    } = useMemo(() => {
        try {
            return JSON.parse(jsonStr);
        } catch (error) {
            console.error("JSON parsing error:", error);
            return {};
        }
    }, [jsonStr]);

    const hasKey265 = useMemo(() => {
        setActivePimp((user?.id as never) in data);
    }, [data, user]);

    const onRelevance = (id: number) => {
        getOneMember(id);
    };

    const PimpMesssage = (
        userId: any,
        messageId: any,
        channelSlug: string,
        timestamp: any
    ) => {
        pimpMessage(userId, messageId, channelSlug, timestamp);
        console.log(toJS(myself));
        setPimp &&
            setPimp({
                pimpType: "pimp",
                value: myself?.relevance,
            });
        setActivePimp(true);
    };

    const UnPimpMesssage = (
        userId: any,
        messageId: any,
        channelSlug: string,
        timestamp: any
    ) => {
        unPimpMessage(userId, messageId, channelSlug, timestamp);
        const keys = Object.keys(data);
        const il = keys[0] === `${user?.id}` ? 1 : 0;
        console.log(toJS(message));
        setPimp &&
            setPimp({
                pimpType: "unPimp",
                value: data[`${keys[il]}`],
            });
        setActivePimp(false);
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
                        {activePimp ? (
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
export default observer(MessageHeader);
