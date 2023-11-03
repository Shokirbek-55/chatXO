import { makeAutoObservable, runInAction, toJS } from "mobx";
import { AppRootStore } from "../store";
import {
    RawMessage,
    SearchRequest,
    SearchResponse,
    SendMessage,
    TimestampHistoryRequest,
    TimestampHistoryResponse,
    VoteOption,
} from "../../types/channel";

class ChatStore {
    root: AppRootStore;
    constructor(root: AppRootStore) {
        makeAutoObservable(this);
        this.root = root;
    }

    init = () => {
        console.log("init events");
        this.root.socketStore.socket?.on("message", (payload: RawMessage) => {
            console.log("new message", payload);
            this.root.messageStore.addMessageToCache(payload);
            if (this.root.hashtagStore.isOpenHashTagScreen) {
                this.root.hashtagStore.addMessageHashTags(payload);
            }
        });

        this.root.socketStore.socket?.on(
            "mergeMessage",
            (payload: RawMessage) => {
                console.log("merge message", payload);
                this.root.messageStore.addMergeMessageToCache(payload);
                if (this.root.hashtagStore.isOpenHashTagScreen) {
                    this.root.hashtagStore.addMessageHashTags(payload);
                }
            }
        );

        this.root.socketStore.socket?.on(
            "leaveChannel",
            (payload: { slug: string; userId: number }) => {
                runInAction(() => {
                    console.log("leave channel", payload);
                    this.root.channelStore.channelUsers =
                        this.root.channelStore.channelUsers.filter(
                            (i) => i.id !== payload.userId
                        );
                });
            }
        );
        this.root.socketStore.socket?.on(
            "deleteChannel",
            (payload: { slug: string }) => {
                console.log("delete channel", payload);
            }
        );

        this.root.socketStore.socket?.on("changeAdmin", (payload: any) => {
            console.log("change admin", payload);
        });

        this.root.socketStore.socket?.on(
            "deleteMessage",
            (payload: {
                channelSlug: string;
                messageId: string;
                timestamp: Date;
            }) => {
                console.log("delete message", payload);
                this.root.messageStore.onDeleteMessage(payload.messageId)
            }
        );

        this.root.socketStore.socket?.on(
            "blockUser",
            (payload: { slug: string; userId: number }) => {
                console.log("block user", payload);
            }
        );

        this.root.socketStore.socket?.on(
            "search",
            (payload: SearchResponse) => {
                runInAction(() => {
                    console.log("search", payload);
                    this.root.messageStore.searchMessages = payload as never;
                    console.log(
                        "searchMessages",
                        toJS(this.root.messageStore.searchMessages)
                    );
                });
            }
        );

        this.root.socketStore.socket?.on(
            "timestampHistory",
            (payload: TimestampHistoryResponse) => {
                console.log("timestamp history", payload);
            }
        );

        this.root.socketStore.socket?.on("poll", (payload: RawMessage) => {
            console.log("poll", payload);
            this.root.messageStore.addMessageToCache(payload);
            if (this.root.hashtagStore.isOpenHashTagScreen) {
                this.root.hashtagStore.addMessageHashTags(payload);
            }
        });

        this.root.socketStore.socket?.on(
            "vote",
            async (payload: RawMessage) => {
                console.log("vote", payload);
            }
        );
    };

    history = ({
        slug,
        pageState,
        relevance,
        hashtags,
    }: {
        slug: string;
        pageState?: string | null | undefined;
        relevance?: number;
        hashtags?: string[];
    }) => {
        this.root.socketStore.socket?.emit("history", {
            pageState,
            channelSlug: slug,
            relevance,
            hashtags,
        });
    };

    join = (slug: string) => {
        this.root.socketStore.socket?.emit("joinRoom", slug);
    };

    leave = (slug: string) => {
        this.root.socketStore.socket?.emit("leaveRoom", slug);
    };

    remove = (payload: { slug: string; id: string; timestamp: Date }) => {
        console.log("emit delete event ", payload);

        this.root.socketStore.socket?.emit("deleteMessage", {
            messageId: payload.id,
            channelSlug: payload.slug,
            timestamp: payload.timestamp,
        });
    };

    sendPoll = (slug: string, message: SendMessage) => {
        this.root.socketStore.socket?.emit("poll", <RawMessage>{
            id: message._id,
            channelSlug: slug,
            type: message.type,
            message: message.text,
            userId: message.user?.id,
            hashtags: message.hashtags,
            mediaUrl: message.mediaUrl,
            minRelevance: message.minRelevance,
            videoThumbnail: message.videoThumbnail,
            mediaTitle: message.mediaTitle,
            isReply: message?.isReply,
            originMessageId: message?.originMessageId,
            originMessageTimestamp: message?.originMessageTimestamp,
            topic: message?.topic,
            pollType: message?.pollType,
            options: message?.options,
        });
    };

    search = (
        searchMessage: string,
        channelSlug: string,
        pageState?: string
    ) => {
        if (searchMessage && channelSlug) {
            this.root.socketStore.socket?.emit("search", <SearchRequest>{
                searchMessage,
                channelSlug,
                pageState,
            });
        }
    };

    vote = (
        pollOption: number,
        channelSlug: string,
        pollId: number,
        messageId: string,
        callback: () => void
    ) => {
        this.root.socketStore.socket?.emit("vote", <VoteOption>{
            pollOption,
            channelSlug,
            pollId,
            messageId,
        });
        callback();
        console.log(pollOption, pollId, messageId, channelSlug, "poll message");
    };

    pimpMessage = (
        userId: any,
        messageId: any,
        channelSlug: string,
        timestamp: any
    ) => {
        this.root.socketStore.socket?.emit("pimpMessage", {
            userId,
            messageId,
            channelSlug,
            timestamp,
        });
    };
    unPimpMessage = (
        userId: any,
        messageId: any,
        channelSlug: string,
        timestamp: any
    ) => {
        this.root.socketStore.socket?.emit("unPimpMessage", {
            userId,
            messageId,
            channelSlug,
            timestamp,
        });
    };

    timestampHistory = (
        channelSlug: string,
        timestamp: any,
        findOlder?: boolean
    ) => {
        this.root.socketStore.socket?.emit("timestampHistory", <
            TimestampHistoryRequest
        >{
            channelSlug,
            timestamp,
            findOlder,
        });
    };
}

export default ChatStore;
