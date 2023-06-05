import { makeAutoObservable } from "mobx";
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
    pageState:string = ''

    get allMessages() {
        return this.messages;
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