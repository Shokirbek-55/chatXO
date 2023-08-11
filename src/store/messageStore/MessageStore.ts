import { message } from 'antd';
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { Channel, ChannelsUsersType, MessageType, RawMessage, SendMessage } from "../../types/channel";
import { AppRootStore } from "../store";
import _ from 'lodash';
import APIs from "../../api/api";
import { Operation } from '../../utils/Operation';


type MessagesState = {
    slug: string;
    pageState: string | null;
    messages: RawMessage[];
};

const initialMassegeText: SendMessage = {
    type: 'text',
}

export default class MessageStore {

    app: AppRootStore
    constructor(app: AppRootStore) {
        makeAutoObservable(this);
        this.app = app;
    }

    FileUploadOperation = new Operation<{
        filePath: string;
        fileTitle: string;
        thumbnailPath: string;
    }>({} as {
        filePath: string;
        fileTitle: string;
        thumbnailPath: string;
    })

    messageCache: {
        [key: string]: {
            messages: RawMessage[];
            pageState: string | null;
            end?: boolean;
            channelData: Channel;
            channelUsers: {
                [key: string]: ChannelsUsersType
            }
        }
    } = {};

    slug: string = '';

    messageData: MessagesState = {
        slug: '',
        pageState: '',
        messages: [],
    }

    messageTextState: string = ''

    isLoadMessages: boolean = false;

    setSendMessage: SendMessage = initialMassegeText

    setReplyMessage: RawMessage = {
        id: "",
        type: "",
        userId: 0,
        message: "",
        timestamp: new Date(),
        username: "",
        mediaUrl: "",
        channelSlug: "",
        hashtags: [],
        pimps: [],
        isReply: false,
        originMessageId: "",
        originMessageTimestamp: new Date(),
        messageId: "",
        taggedUserId: 0
    }

    progress: number = 0

    getHistoryMessages = (slug: string) => {
        runInAction(() => {
            this.isLoadMessages = true;
            this.slug = slug;
        });

        this.app.socketStore.socket?.emit('history', {
            channelSlug: slug,
        });

        this.app.socketStore.socket?.once('history', (data: {
            messages: RawMessage[];
            pageState: string;
            end: boolean
        }) => {
            data.messages = _.reverse(toJS(data.messages));
            this.setHistoryMessages(data.messages[0]?.channelSlug || slug, data.messages, data.pageState, data.end);
        });

        runInAction(() => {
            this.isLoadMessages = false;
        });
    }

    getHistoryMessagesPageState = () => {
        this.app.chatStore.history({
            slug: this.slug,
            pageState: this.getMessagesPageState(this.slug)
        });

        this.app.socketStore.socket?.once('history', (data: {
            messages: RawMessage[];
            pageState: string;
            end: boolean
        }) => {
            console.log(data.end);
            data.messages = _.reverse(toJS(data.messages));
            runInAction(() => {
            this.messageCache[data.messages[0]?.channelSlug || this.slug].messages = [
                ...(this.messageCache[data.messages[0]?.channelSlug || this.slug].messages.filter(
                    (item) => item.id === data.messages[0].id
                ).length === 1
                    ? []
                    : [...data.messages]),
                ...this.messageCache[data.messages[0]?.channelSlug || this.slug].messages
            ]
                this.messageCache[data.messages[0]?.channelSlug || this.slug].pageState = data.pageState;
                this.messageCache[data.messages[0]?.channelSlug || this.slug].end = data.end;
            });
        });
    }

    setHistoryMessages = (slug: string, messages: RawMessage[], pageState: string | null, end: boolean) => {
        if (!!this.messageCache[slug]) {
            if (this.messageCache[slug]?.pageState === pageState) {
                return
            } else {
                this.messageCache[slug].messages = [
                    ...this.messageCache[slug].messages,
                    ...(this.messageCache[slug].messages.filter(
                        (item) => item.id === messages[0].id
                    ).length === 1
                        ? []
                        : [...messages])
                ]
                this.messageCache[slug].pageState = pageState;
                this.messageCache[slug].end = end;
            }
        } else {
            this.messageCache[slug] = {
                messages: messages,
                pageState: pageState,
                end: end,
                channelData: this.messageCache[slug]?.channelData,
                channelUsers: this.messageCache[slug]?.channelUsers
            }
        }
    }

    addMessageToCache = (message: RawMessage) => {
        if (this.messageCache[message.channelSlug]) {
            this.messageCache[message.channelSlug].messages.push(message);
        } else {
            this.messageCache[message.channelSlug] = {
                messages: [message],
                pageState: '',
                channelData: this.messageCache[message.channelSlug]?.channelData,
                channelUsers: this.messageCache[message.channelSlug]?.channelUsers
            };
        }
    }

    setChannelDataCache = (slug: string, channelData: Channel) => {
        if (!this.messageCache[slug]) {
            this.messageCache[slug] = {
                messages: [],
                pageState: '',
                channelData: channelData,
                channelUsers: this.messageCache[slug]?.channelUsers
            }
        } else {
            this.messageCache[slug] = {
                ...this.messageCache[slug],
                channelData: channelData,
            }
        }
    }

    setChannelUsersCache = (slug: string, channelUsers: {
        [key: string]: ChannelsUsersType
    }) => {
        if (!this.messageCache[slug]) {
            this.messageCache[slug] = {
                messages: [],
                pageState: '',
                channelData: this.messageCache[slug]?.channelData,
                channelUsers: channelUsers
            }
        } else {
            this.messageCache[slug] = {
                ...this.messageCache[slug],
                channelUsers: channelUsers,
            }
        }
    }

    getMessages = (slug: string) => {
        if (this.messageCache[slug]) {
            return this.messageCache[slug].messages;
        } else {
            return [];
        }
    }

    getMessagesPageState = (slug: string) => {
        if (this.messageCache[slug]) {
            return this.messageCache[slug].pageState;
        } else {
            return '';
        }
    }

    setMessageText = (text: string) => {
        this.messageTextState = text;
    }

    setSendTextMessage = () => {
        this.setSendMessage = {
            userId: this.app.authStore.user.id,
            channelSlug: this.slug,
            type: 'text',
            message: this.messageTextState,
        }
    }

    setSendPhotoMessage = () => {
        this.setSendMessage = {
            type: 'image',
            userId: this.app.authStore.user.id,
            channelSlug: this.slug,
            mediaTitle: this.FileUploadOperation.data.fileTitle,
            mediaUrl: this.FileUploadOperation.data.filePath,
            videoThumbnail: this.FileUploadOperation.data.thumbnailPath,
        }
    }

    setSendVideoMessage = () => {
        this.setSendMessage = {
            type: 'video',
            userId: this.app.authStore.user.id,
            channelSlug: this.slug,
            mediaTitle: this.FileUploadOperation.data.fileTitle,
            mediaUrl: this.FileUploadOperation.data.filePath,
            videoThumbnail: this.FileUploadOperation.data.thumbnailPath,
        }
    }

    setSendAudioMessage = () => {
        this.setSendMessage = {
            type: 'audio',
            userId: this.app.authStore.user.id,
            channelSlug: this.slug,
            mediaTitle: this.FileUploadOperation.data.fileTitle,
            mediaUrl: this.FileUploadOperation.data.filePath,
            videoThumbnail: this.FileUploadOperation.data.thumbnailPath,
        }
    }

    onSendMessage = (type?: MessageType) => {
        switch (type) {
            case 'text':
                this.setSendTextMessage()
                break;
            case 'image':
                this.setSendPhotoMessage()
                break;
            case 'audio':
                this.setSendAudioMessage()
                break;
            case 'video':
                this.setSendVideoMessage()
                break;
            default:
                break;
        }
        this.app.socketStore.socket?.emit("message", this.setSendMessage)
    }

    deleteMessage = (id: string, slug: string, timestamp: Date) => {
        this.app.chatStore.remove({
            id,
            slug,
            timestamp
        })
        this.messageCache[this.slug].messages = this.messageCache[this.slug].messages.filter((e) => e.id != id)
    }

    replyMessage = (message: RawMessage) => {
        this.setReplyMessage = message
    }

    onProgress = (percent: number) => {
        runInAction(() => {
            this.progress = percent
        })
    }

    readFile = async (file: File, type: SendMessage["type"]) => {
        const form = new FormData();
        form.append("file", file, file.name)

        const config = {
            onUploadProgress: (progressEvent: any) => {
                const { loaded, total } = progressEvent;
                var percent = Math.floor((loaded * 100) / total);
                if (percent < 100) {
                    this.onProgress(percent);
                }
            },
            headers: {
                "Content-Type": "multipart/form-data"
            },
        };

        await this.FileUploadOperation.run(() => APIs.upload(form, config))

        if (this.FileUploadOperation.isSuccess) {
            switch (type) {
                case 'audio':
                    this.setSendAudioMessage()
                    break;
                case 'image':
                    this.setSendPhotoMessage()
                    break;
            }

            this.onSendMessage(type)
        } else {
            console.log('Upload error')
        }
    }
}