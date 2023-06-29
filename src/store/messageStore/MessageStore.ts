import { makeAutoObservable, runInAction, toJS } from "mobx";
import { RawMessage } from "../../types/channel";
import { AppRootStore } from "../store";


type MessagesState = {
    slug: string;
    pageState: string;
    messages: RawMessage[];
};

export default class MessageStore {

    app: AppRootStore;

    constructor(app: AppRootStore) {
        makeAutoObservable(this);
        this.app = app;
    }

    messages: RawMessage[] = [];
    slug: string = '';
    pageState: string = ''
    
    messageData = {
        slug: '',
        pageState: '',
        messages: [],
    }

    isLoadMessages: boolean = false;

    get allMessages() {
        return this.messages;
    }

    getHistoryMessages = (slug: string) => {
        runInAction(() => {
            this.isLoadMessages = true;
        });
        
        this.app.socketStore.socket?.emit('history', {
            channelSlug: slug,
        });

        this.app.socketStore.socket?.once('history', (data: {
            messages: RawMessage[];
            pageState: string;
            slug: string;
        }) => { 
            this.getAllMessages(data);
        });

        runInAction(() => {
            this.isLoadMessages = false;
        });
    }

    getAllMessages = ({ slug, pageState, messages }: MessagesState) => {
        this.messages = [
            ...this.messages,
            ...(this.messages.filter(
                (item) => item.id === messages[0].id
            ).length === 1
                ? []
                : [...messages]),
        ];
        this.pageState = pageState;
        this.slug = slug;
    }

    addMessage = (message: RawMessage) => {
        this.messages = [...this.messages, message];
    }

    updateOneMessage = (id: string, data: any) => {
        this.messages = this.messages.map((message) => {
            if (message.id === id) {
                return { ...message, ...data };
            }
            return message;
        })
    }

    deleteMessage = (id: string) => {
        this.messages = this.messages.filter((message) => message.id !== id);
    }

    timestampHistoryMessages = (messages: RawMessage[]) => {
        this.messages = messages;
    }

    clearAllMessages = () => {
        this.messages = [];
    }

}