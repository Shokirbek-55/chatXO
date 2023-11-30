import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { observer } from "mobx-react-lite";
import { RawMessage } from "../../../types/channel";
import Text from "../../Text/Text";
import styles from "./index.module.css";
import { useAsyncFn } from "react-use";
import useRootStore from "../../../hooks/useRootStore";
import { pollMessage } from "../../../types/messageType";
import APIs from "../../../api/api";
import { Skeleton, Tooltip } from "antd";
import { toJS } from "mobx";
interface Props {
    message: RawMessage;
}

const MessagePoll: FC<Props> = ({ message }) => {
    const { getPollId } = useRootStore().messageStore;
    const { vote } = useRootStore().chatStore;
    const { socket } = useRootStore().socketStore;
    const [messsageDetails, setMessageDetails] = useState<pollMessage>();

    const canVote = useMemo(() => {
        return !messsageDetails?.options?.find((option) => option.voted);
    }, [messsageDetails]);

    const voteHandle = (
        pollOption: number,
        channelSlug: string,
        pollId: number,
        messageId: string
    ) => {
        if (canVote) vote(pollOption, channelSlug, pollId, messageId);
        getPollId(pollId, true);
    };

    socket?.on("vote", async (payload: pollMessage) => {
        if (message?.id === payload.messageId) {
            const { data }: any = await APIs.channels.getPollDetails(
                message.pollId as never,
                true
            );
            setMessageDetails({ ...data });
        }
    });

    const [{}, getPollInfo] = useAsyncFn(async () => {
        const { data }: any = await APIs.channels.getPollDetails(
            message.pollId || 0,
            true
        );
        delete data.createdAt; //BE returns wrong timestamp
        setMessageDetails({ ...data });
    }, [message, message.pollId, message.isReply]);

    const votedInPoll = useMemo(() => {
        return !!messsageDetails?.options?.find((option) => option?.voted);
    }, [messsageDetails]);

    useEffect(() => {
        getPollInfo();
    }, [message.pollId, getPollInfo]);

    const renderAnswer = (option: any) => {
        const percentages = Math.round(
            //@ts-ignore
            (option?.votes / messsageDetails?.votesCount) * 100 || 0
        );

        return (
            <div
                key={option.id}
                className={styles.voteBox}
                onClick={() =>
                    voteHandle(
                        option.id,
                        message.channelSlug,
                        messsageDetails?.id as never,
                        message.id
                    )
                }
            >
                {canVote && (
                    <div className={styles.radioBox}>
                        <div className={styles.radio}></div>
                    </div>
                )}
                {!canVote && (
                    <div className={styles.votedBox}>
                        <Text fontSize="13px" children={`${percentages}%`} />
                        <div className={styles.checkedIcon}>
                            {option.voted ? <AiFillCheckCircle /> : null}
                        </div>
                    </div>
                )}
                {!canVote ? (
                    <Tooltip
                        trigger={"click"}
                        title={`${
                            option.votes > 1
                                ? option.votes + " votes"
                                : option.votes + " vote"
                        }`}
                    >
                        <div className={styles.option}>
                            <Text
                                margin="0 0 10px 0"
                                fontSize="14px"
                                children={option.name}
                            />
                            {canVote ? (
                                <div className={styles.line}></div>
                            ) : !option.votes ? (
                                <div className={styles.votedDot}></div>
                            ) : (
                                <div className={styles.checkedLine}></div>
                            )}
                        </div>
                    </Tooltip>
                ) : (
                    <div className={styles.option}>
                        <Text
                            margin="0 0 10px 0"
                            fontSize="14px"
                            children={option.name}
                        />
                        {canVote ? (
                            <div className={styles.line}></div>
                        ) : !option.votes ? (
                            <div className={styles.votedDot}></div>
                        ) : (
                            <div className={styles.checkedLine}></div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            {(messsageDetails?.options || []).length ? (
                <div className={styles.pollTop}>
                    <Text fontSize="15px" children={messsageDetails?.topic} />
                    <Text
                        fontSize="12px"
                        children={`${
                            message.pollType === "NORMAL"
                                ? "Normal Poll"
                                : "Relevance Poll"
                        }`}
                    />
                    <div>
                        {(messsageDetails?.options || [])
                            ?.slice()
                            ?.sort(
                                (option1, option2) => option1?.id - option2?.id
                            )
                            ?.map(renderAnswer)}
                    </div>
                    <Text
                        center
                        fontSize="13px"
                        margin="5px 0"
                        children={
                            messsageDetails?.votesCount
                                ? `${
                                      messsageDetails?.votesCount > 1
                                          ? messsageDetails?.votesCount +
                                            " votes"
                                          : messsageDetails?.votesCount +
                                            " vote"
                                  }`
                                : "no voted yet"
                        }
                    />
                </div>
            ) : (
                <Skeleton
                    active
                    paragraph={{ rows: 5 }}
                    className={styles.skeleton}
                />
            )}
        </>
    );
};

export default observer(MessagePoll);
