import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { AppRootStore } from '../store';
import {
    RawMessage,
    SearchRequest,
    SearchResponse,
    SendMessage,
    TimestampHistoryRequest,
    TimestampHistoryResponse,
    VoteOption,
} from '../../types/channel';

class ChatStore {
    root: AppRootStore;
    props: any;
    constructor(root: AppRootStore) {
        makeAutoObservable(this);
        this.root = root;
    }

    init = () => {
        console.log('init events');

        this.root.socketStore.socket?.on('openChannel', data => {
            console.log('openChannel', toJS(data));
        });

        this.root.socketStore.socket?.on('exitChannel', data => {
            console.log('exitChannel', toJS(data));
        });

        this.root.socketStore.socket?.on('message', (payload: RawMessage) => {
            console.log('new message', payload);
            this.root.messageStore.addMessageToCache(payload);
            if (this.root.hashtagStore.isOpenHashTagScreen) {
                this.root.hashtagStore.addMessageHashTags(payload);
            }
        });

        this.root.socketStore.socket?.on('mergeMessage', (payload: RawMessage) => {
            console.log('merge message', payload);
            this.root.messageStore.addMergeMessageToCache(payload);
            if (this.root.hashtagStore.isOpenHashTagScreen) {
                this.root.hashtagStore.addMessageHashTags(payload);
            }
        });

        this.root.socketStore.socket?.on('leaveChannel', (payload: { slug: string; userId: number }) => {
            runInAction(() => {
                console.log('leave channel', payload);
                this.root.channelStore.filterLeftUser(payload.userId);
            });
        });
        this.root.socketStore.socket?.on('deleteChannel', (payload: { slug: string }) => {
            console.log('delete channel', payload);
        });

        this.root.socketStore.socket?.on('changeAdmin', (payload: any) => {
            console.log('change admin', payload);
        });

        this.root.socketStore.socket?.on(
            'deleteMessage',
            (payload: { channelSlug: string; messageId: string; timestamp: Date }) => {
                console.log('delete message', payload);
                this.root.messageStore.onDeleteMessage(payload.messageId);
            },
        );

        this.root.socketStore.socket?.on('editMessage', (payload: RawMessage) => {
            console.log('edit Message', payload);
            this.root.messageStore.onEditMessage(payload);
        });

        this.root.socketStore.socket?.on('blockUser', (payload: { slug: string; userId: number }) => {
            console.log('block user', payload);
        });

        this.root.socketStore.socket?.on('search', (payload: SearchResponse) => {
            runInAction(() => {
                console.log('search', payload);
                this.root.messageStore.searchMessages = payload as never;
                console.log('searchMessages', toJS(this.root.messageStore.searchMessages));
            });
        });

        this.root.socketStore.socket?.on('timestampHistory', (payload: TimestampHistoryResponse) => {
            console.log('timestamp history', payload);
        });

        this.root.socketStore.socket?.on('poll', (payload: RawMessage) => {
            console.log('createPoll', payload);
            this.root.messageStore.addMessageToCache(payload);
            if (this.root.hashtagStore.isOpenHashTagScreen) {
                this.root.hashtagStore.addMessageHashTags(payload);
            }
        });

        this.root.socketStore.socket?.on('vote', (payload: RawMessage) => {
            console.log('vote', payload);
        });

        this.root.socketStore.socket?.on('joinRoom', (payload: any) => {
            console.log('joinRoom', payload);
            this.root.channelStore.filterAddUser(payload.id);
            this.root.channelStore.getMyChannels();
        });
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
        this.root.socketStore.socket?.emit('history', {
            pageState,
            channelSlug: slug,
            relevance,
            hashtags,
        });
    };

    unreadMessages = () => {
        this.root.socketStore.socket?.emit('unreadMessages', data => {
            console.log('unreadMessages', data);
        });
    };

    openChannel = (slug: string) => {
        this.root.socketStore.socket?.emit('openChannel', slug, data => {
            console.log('openChannel emit', data);
        });
    };

    exitChannel = (slug: string) => {
        this.root.socketStore.socket?.emit('exitChannel', slug, data => {
            console.log('exitChannel emit', data);
        });
    };

    join = (slug: string) => {
        this.root.socketStore.socket?.emit('joinRoom', slug, data => {
            console.log('join', data);
        });
    };

    leave = (slug: string) => {
        this.root.socketStore.socket?.emit('leaveRoom', slug);
    };

    remove = (payload: { slug: string; id: string; timestamp: Date }) => {
        console.log('emit delete event ', payload);
        this.root.socketStore.socket?.emit('deleteMessage', {
            messageId: payload.id,
            channelSlug: payload.slug,
            timestamp: payload.timestamp,
        });
    };

    sendPoll = (slug: string, message: SendMessage) => {
        this.root.socketStore.socket?.emit('poll', {
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
        } as RawMessage);
    };

    search = (searchMessage: string, channelSlug: string, pageState?: string) => {
        if (searchMessage && channelSlug) {
            this.root.socketStore.socket?.emit('search', {
                searchMessage,
                channelSlug,
                pageState,
            } as SearchRequest);
        }
    };

    vote = (pollOption: number, channelSlug: string, pollId: number, messageId: string) => {
        this.root.socketStore.socket?.emit(
            'vote',
            {
                pollOption,
                channelSlug,
                pollId,
                messageId,
            } as VoteOption,
            data => {
                console.log('data', toJS(data));
            },
        );
    };

    pimpMessage = (userId: any, messageId: any, channelSlug: string, timestamp: any) => {
        this.root.socketStore.socket?.emit('pimpMessage', {
            userId,
            messageId,
            channelSlug,
            timestamp,
        });
    };

    unPimpMessage = (userId: any, messageId: any, channelSlug: string, timestamp: any) => {
        this.root.socketStore.socket?.emit('unPimpMessage', {
            userId,
            messageId,
            channelSlug,
            timestamp,
        });
    };

    timestampHistory = (channelSlug: string, timestamp: any, findOlder?: boolean) => {
        this.root.socketStore.socket?.emit('timestampHistory', {
            channelSlug,
            timestamp,
            findOlder,
        } as TimestampHistoryRequest);
    };
}

export default ChatStore;
