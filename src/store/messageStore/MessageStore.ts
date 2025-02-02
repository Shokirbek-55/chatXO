import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { Channel, ChannelsUsersType, MessageType, RawMessage, SearchResponse, SendMessage } from '../../types/channel';
import { AppRootStore } from '../store';
import _ from 'lodash';
import APIs from '../../api/api';
import { Operation } from '../../utils/Operation';
import { pollMessage, pollMessageInitial } from '../../types/messageType';

const initialMassegeText: SendMessage = {
    type: 'text',
    minRelevance: -1,
    isReply: false,
    hashtags: [],
    taggedUserId: 0,
    mediaTitle: undefined,
    mediaUrl: undefined,
    msgLocation: undefined,
};

type FileUploadOperationData = {
    filePath: string;
    fileTitle: string;
    thumbnailPath: string;
};

type MessageCacheType = {
    [key: string]: {
        messages: RawMessage[];
        pageState: string | null;
        end?: boolean;
        channelData: Channel;
        channelUsers: {
            [key: string]: ChannelsUsersType;
        };
    };
};

type MessagesInChannelType = {
    messages: RawMessage[];
    pageState: string | null;
    end?: boolean;
};

type CacheMessagesType = {
    messages: Map<string, RawMessage>;
    pageState: string | null;
    end?: boolean;
};

export default class MessageStore {
    app: AppRootStore;
    constructor(app: AppRootStore) {
        makeAutoObservable(this);
        this.app = app;
    }

    channelsMsgDataBySlug = new Map<string, CacheMessagesType>();
    slugQueue = new Set<string>();
    newMsgChannelsSlug = new Set<string>();

    FileUploadOperation = new Operation<FileUploadOperationData>({
        filePath: '',
        fileTitle: '',
        thumbnailPath: '',
    });

    getPollOperation = new Operation({});

    slug: string = '';
    messageCache: MessageCacheType = {};

    prevInnerDivHeight: {
        [key: string]: number;
    } = {};

    messagesInChannel: MessagesInChannelType = {
        messages: [],
        pageState: null,
        end: false,
    };
    dataInChannel: Channel | null = null;
    usersInChannel: {
        [key: string]: ChannelsUsersType;
    } = {};

    searchMessageState: string = '';

    searchMessages: SearchResponse = {
        messages: [],
        count: 0,
        isEnd: false,
    };

    messageTextState: string = '';

    isLoadMessages: boolean = false;

    setSendMessage: SendMessage = initialMassegeText;

    setReplyMessage: RawMessage | null = null;

    editMessage: RawMessage | null = null;

    progress: number = 0;
    isMessagesLength: boolean = false;

    setSendReplyMessageState = {};

    minRelevance: number = -1;
    goToBottom = false;
    messagesFilterValue: number = 0;
    pollMessageState: pollMessage = pollMessageInitial;
    pollMessageOptionState: string[] = ['', ''];
    pollMessageDetails: pollMessage = {} as never;

    upsertChannelsMsgs = (slug: string, data: MessagesInChannelType) => {
        const msgs = this.channelsMsgDataBySlug.get(slug);
        if (msgs) {
            data.messages.forEach(msg => {
                msgs.messages.set(msg.id, msg);
            });
            msgs.pageState = data.pageState;
            msgs.end = data.end;
        } else {
            const messageById = new Map<string, RawMessage>();
            data.messages.forEach(msg => {
                messageById.set(msg.id, msg);
            });
            this.channelsMsgDataBySlug.set(slug, {
                messages: messageById,
                pageState: data.pageState,
                end: data.end,
            });
        }
    };

    get getSelectedChannelMsgData() {
        return this.channelsMsgDataBySlug.get(this.app.channelStore.selectedChannelData.slug);
    }

    get getSelectedChannelMsgsMap() {
        return this.getSelectedChannelMsgData?.messages || new Map<string, RawMessage>();
    }

    get getSelectedChannelMsgsPageState() {
        return this.getSelectedChannelMsgData?.pageState || '';
    }

    get getSelectedChannelMsgsEnd() {
        return this.getSelectedChannelMsgData?.end || false;
    }

    get getSelectedChannelMsgs() {
        return Array.from(this.getSelectedChannelMsgsMap.values());
    }

    set setChannelMsgNewMessage(msg: RawMessage) {
        if (this.getSelectedChannelMsgData?.messages) {
            const messages = Array.from(this.getSelectedChannelMsgData?.messages);
            messages.unshift([msg.id, msg]);
            this.getSelectedChannelMsgData.messages = new Map(messages);
        }
    }

    set setChannelMessageByMessageId(msg: RawMessage) {
        this.getSelectedChannelMsgData?.messages.set(msg.id, msg);
    }

    getChannelMsgDataBySlug(slug: string) {
        return this.channelsMsgDataBySlug.get(slug);
    }

    getSelectedChannelMsgById = (id: string) => {
        return this.getSelectedChannelMsgsMap.get(id);
    };

    set setSelectedChannelMsgById(msg: RawMessage) {
        this.getSelectedChannelMsgsMap.set(msg.id, msg);
    }

    setIsMessagesLength = (is: boolean) => {
        runInAction(() => {
            this.isMessagesLength = is;
        });
    };

    setPollMessageState = (key: keyof pollMessage, value: any) => {
        runInAction(() => {
            this.pollMessageState[key] = value as never;
        });
    };

    setChangePollOption = (e: any, index: number) => {
        runInAction(() => {
            this.pollMessageOptionState[index] = e;
            this.pollMessageOptionState = [...this.pollMessageOptionState];
        });
    };

    addPollOption = () => {
        runInAction(() => {
            if (this.pollMessageOptionState.length < 10) {
                let item = '';
                this.pollMessageOptionState.push(item);
                this.setPollMessageState('options', this.pollMessageOptionState);
            }
        });
    };

    removePollOption = (v: string, index: number) => {
        runInAction(() => {
            if (this.pollMessageOptionState.length > 2)
                this.pollMessageOptionState = this.pollMessageOptionState.filter((e, i) => i !== index);
        });
    };

    clearPollMessageState = () => {
        runInAction(() => {
            this.pollMessageState = pollMessageInitial;
            this.pollMessageOptionState = ['', ''];
        });
    };

    votePollOption = (
        pollOption: number,
        channelSlug: string,
        pollId: number,
        messageId: string,
        // callback: () => void
    ) => {
        this.app.chatStore.vote(
            pollOption,
            channelSlug,
            pollId,
            messageId,
            // callback
        );
    };

    setMessageFilterValue = _.debounce(
        (value: number) => {
            runInAction(() => {
                this.messagesFilterValue = value;
            });
        },
        400,
        { leading: false, trailing: true },
    );

    setPrevInnerDivHeight = (slug: string, height: number) => {
        this.prevInnerDivHeight[slug] = height;
    };

    setSearch = (text: string) => {
        runInAction(() => {
            this.searchMessageState = text;
        });
    };

    clearSearch = () => {
        runInAction(() => {
            this.searchMessageState = '';
        });
    };

    setChannelSlug = (slug: string) => {
        runInAction(() => {
            this.app.hashtagStore.allChatHashTags = [];
            this.slug = slug;
        });
        if (this.slug === slug) {
            this.minRelevance = -1;
        }
    };

    getHistoryMessages = (slug: string) => {
        runInAction(() => {
            this.isLoadMessages = true;
        });

        this.app.chatStore.history({
            slug,
        });

        this.app.socketStore.socket?.on(
            'history',
            (data: { messages: RawMessage[]; pageState: string; end: boolean }) => {
                if (this.app.hashtagStore.isOpenHashTagScreen) {
                    this.app.hashtagStore.setAllHashTagsMessages(data);
                } else {
                    this.setHistoryMessages(
                        data.messages[0]?.channelSlug || slug,
                        data.messages,
                        data.pageState,
                        data.end,
                    );
                }
            },
        );
        runInAction(() => {
            this.isLoadMessages = false;
        });
    };

    getHistoryMessagesPageState = (setIsFetching, stop) => {
        if (this.messageCache[this.slug]?.end === false) {
            this.app.chatStore.history({
                slug: this.slug,
                pageState: this.getMessagesPageState(this.slug),
            });
            setIsFetching(false);
        } else {
            setIsFetching(false);
            stop.current = true;
        }
    };

    setHistoryMessages = (slug: string, messages: RawMessage[], pageState: string | null, end: boolean) => {
        this.upsertChannelsMsgs(slug, {
            messages,
            pageState,
            end,
        });
        if (!!this.messageCache[slug]) {
            if (this.messageCache[slug]?.pageState === pageState) {
                return;
            } else {
                this.messageCache[slug].messages = [
                    ...(this.messageCache[slug].messages.filter(item => item.id === messages[0]?.id).length === 1
                        ? []
                        : [...messages]),
                    ...this.messageCache[slug].messages,
                ];
                this.messageCache[slug].pageState = pageState;
                this.messageCache[slug].end = end;
            }
        } else {
            this.messageCache[slug] = {
                messages: messages,
                pageState: pageState,
                end: end,
                channelData: this.messageCache[slug]?.channelData,
                channelUsers: this.messageCache[slug]?.channelUsers,
            };
        }
    };

    addMessageToCache = (message: RawMessage) => {
        this.newMsgChannelsSlug.add(message.channelSlug);
        this.setChannelMsgNewMessage = message;
        if (this.messageCache[message.channelSlug]) {
            if (_.last(this.messageCache[message.channelSlug].messages)?.id === message.id) {
                runInAction(() => {
                    this.messageCache[message.channelSlug].messages[0] = message;
                });
            } else {
                runInAction(() => {
                    this.messageCache[message.channelSlug].messages.push(message);
                });
            }
        } else {
            runInAction(() => {
                this.messageCache[message.channelSlug] = {
                    messages: [message],
                    pageState: '',
                    channelData: this.messageCache[message.channelSlug]?.channelData,
                    channelUsers: this.messageCache[message.channelSlug]?.channelUsers,
                };
            });
        }
    };

    addMergeMessageToCache = (message: RawMessage) => {
        this.setChannelMessageByMessageId = message;
        runInAction(() => {
            this.messageCache[message.channelSlug].messages.pop();
            this.messageCache[message.channelSlug].messages = [
                ...this.messageCache[message.channelSlug].messages,
                message,
            ];
        });
    };

    setChannelDataCache = (slug: string, channelData: Channel) => {
        if (!this.messageCache[slug]) {
            this.messageCache[slug] = {
                messages: [],
                pageState: '',
                channelData: channelData,
                channelUsers: this.messageCache[slug]?.channelUsers,
            };
        } else {
            this.messageCache[slug] = {
                ...this.messageCache[slug],
                channelData: channelData,
            };
        }
    };

    setChannelUsersCache = (
        slug: string,
        channelUsers: {
            [key: string]: ChannelsUsersType;
        },
    ) => {
        if (!this.messageCache[slug]) {
            this.messageCache[slug] = {
                messages: [],
                pageState: '',
                channelData: this.messageCache[slug]?.channelData,
                channelUsers: channelUsers,
            };
        } else {
            this.messageCache[slug] = {
                ...this.messageCache[slug],
                channelUsers: channelUsers,
            };
        }
    };

    getMessagesPageState = (slug: string) => {
        if (this.messageCache[slug]) {
            return this.messageCache[slug].pageState;
        } else {
            return '';
        }
    };

    setMessageText = (text: string) => {
        this.messageTextState = text;
    };

    setMinRelevance = (minRelevance: number) => {
        this.minRelevance = minRelevance;
        this.setSendMessage = {
            ...this.setSendMessage,
            minRelevance: minRelevance,
        };
    };

    setSendTextMessage = () => {
        this.setSendMessage = {
            ...this.setSendMessage,
            userId: this.app.authStore.user.id,
            channelSlug: this.slug,
            type: 'text',
            message: this.messageTextState,
        };
    };

    setSendReplyMessage = () => {
        this.setSendReplyMessageState = {
            isReply: true,
            originMessage: this.setReplyMessage,
            originMessageId: this.setReplyMessage?.id,
            originMessageTimestamp: this.setReplyMessage?.timestamp,
        };
        this.setSendMessage = {
            ...this.setSendMessage,
            ...this.setSendReplyMessageState,
        };
    };

    setSendPhotoMessage = () => {
        this.setSendMessage = {
            ...this.setSendMessage,
            type: 'image',
            userId: this.app.authStore.user.id,
            channelSlug: this.slug,
            mediaTitle: this.FileUploadOperation.data.fileTitle,
            mediaUrl: this.FileUploadOperation.data.filePath,
            videoThumbnail: this.FileUploadOperation.data.thumbnailPath,
        };
    };

    setSendVideoMessage = () => {
        this.setSendMessage = {
            ...this.setSendMessage,
            type: 'video',
            userId: this.app.authStore.user.id,
            channelSlug: this.slug,
            mediaTitle: this.FileUploadOperation.data.fileTitle,
            mediaUrl: this.FileUploadOperation.data.filePath,
            videoThumbnail: this.FileUploadOperation.data.thumbnailPath,
        };
    };

    setSendAudioMessage = () => {
        this.setSendMessage = {
            ...this.setSendMessage,
            type: 'audio',
            userId: this.app.authStore.user.id,
            channelSlug: this.slug,
            mediaTitle: this.FileUploadOperation.data.fileTitle,
            mediaUrl: this.FileUploadOperation.data.filePath,
            videoThumbnail: this.FileUploadOperation.data.thumbnailPath,
        };
    };

    setSendDocumentMessage = () => {
        this.setSendMessage = {
            ...this.setSendMessage,
            type: 'document',
            userId: this.app.authStore.user.id,
            channelSlug: this.slug,
            mediaTitle: this.FileUploadOperation.data.fileTitle,
            mediaUrl: this.FileUploadOperation.data.filePath,
            videoThumbnail: this.FileUploadOperation.data.thumbnailPath,
        };
    };

    setSendPollMessage = () => {
        this.setSendMessage = {
            // ...this.setSendMessage,
            channelSlug: this.slug,
            type: this.pollMessageState.type as never,
            pollType: this.pollMessageState.type as never,
            userId: this.app.authStore.user.id,
            topic: this.pollMessageState.topic,
            options: this.pollMessageOptionState as never,
        };
    };

    onSendPoll = (type?: MessageType) => {
        if (type) {
            this.setSendPollMessage();
        }
        this.app.socketStore.socket?.emit('poll', this.setSendMessage);
    };

    onSendMessage = (type?: MessageType) => {
        switch (type) {
            case 'text':
                this.setSendTextMessage();
                break;
            case 'image':
                this.setSendPhotoMessage();
                break;
            case 'audio':
                this.setSendAudioMessage();
                break;
            case 'video':
                this.setSendVideoMessage();
                break;
            case 'NORMAL':
                this.setSendPollMessage();
                break;
            case 'RELEVANCE':
                this.setSendPollMessage();
                break;
            default:
                break;
        }

        if (this.editMessage) {
            const editedMessage = {
                ...this.editMessage,
                message: this.messageTextState,
            };
            this.onEditMessage(editedMessage);
            this.app.socketStore.socket?.emit('editMessage', editedMessage);
            this.setSendMessage = initialMassegeText;
            this.clearReplyMessage();
            return;
        }

        this.setSendMessage = {
            ...this.setSendMessage,
            hashtags: this.app.hashtagStore.hashTags,
        };
        this.app.socketStore.socket?.emit('message', this.setSendMessage);
        this.setSendMessage = initialMassegeText;
        this.clearReplyMessage();
    };

    deleteMessage = (id: string, slug: string, timestamp: Date) => {
        this.app.chatStore.remove({
            id,
            slug,
            timestamp,
        });
        this.onDeleteMessage(id);
    };

    onDeleteMessage = (id: string) => {
        const selectedChannelData = this.getSelectedChannelMsgData;
        if (selectedChannelData) {
            selectedChannelData.messages.delete(id);
        }
    };

    clearReplyMessage = () => {
        this.setReplyMessage = null;
        this.editMessage = null;
    };

    onProgress = (percent: number) => {
        runInAction(() => {
            this.progress = percent;
        });
    };

    readFile = async (file: File, type: SendMessage['type']) => {
        const form = new FormData();
        form.append('file', file, file.name);

        const config = {
            onUploadProgress: (progressEvent: any) => {
                const { loaded, total } = progressEvent;
                var percent = Math.floor((loaded * 100) / total);
                if (percent < 100) {
                    this.onProgress(percent);
                }
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        await this.FileUploadOperation.run(() => APIs.upload(form, config));

        console.log(this.FileUploadOperation.data);

        if (this.FileUploadOperation.isSuccess) {
            switch (type) {
                case 'audio':
                    this.setSendAudioMessage();
                    break;
                case 'image':
                    this.setSendPhotoMessage();
                    break;
                case 'video':
                    this.setSendVideoMessage();
                    break;
                case 'document':
                    this.setSendDocumentMessage();
                    break;
            }

            this.onSendMessage(type);
        } else {
            console.log('Upload error');
        }
    };

    searchMessage = (messageSearch: string, channelSlug: string) => {
        this.app.chatStore.search(messageSearch, channelSlug);
    };

    getPollId = async (pollId: number, includeVotedUsers: boolean) => {
        await this.getPollOperation.run(() => APIs.channels.getPollDetails(pollId, includeVotedUsers));
        runInAction(() => {
            if (this.getPollOperation.isSuccess) {
                this.pollMessageDetails = {
                    ...this.getPollOperation.data,
                } as never;
            }
        });
    };

    setEditMessage = (message: RawMessage) => {
        this.showSetReplyMessage(message);
        this.setMessageText(message.message);
        this.editMessage = message;
    };

    onEditMessage = (editedMessage: RawMessage) => {
        this.setSelectedChannelMsgById = editedMessage;
    };

    replyMessage = (message: RawMessage) => {
        this.showSetReplyMessage(message);
        this.setSendReplyMessage();
    };

    showSetReplyMessage = (message: RawMessage) => {
        this.setReplyMessage = message;
    };
}
