import { makeAutoObservable, runInAction } from 'mobx';
import { createContext } from 'react';

import MessageStore from './messageStore/MessageStore';
import ChannelStore from './channelStore/channelStore';
import AuthStore from './AuthStore/AuthStore';
import LocalStore from './loacalStore/loacalStore';
import SocketStore from './socketStore/socketStore';
import FriendsStore from './friendsStore/friendsStore';
import UsersStore from './usersStore/usersStore';
import RouterStore from './RouterStore/routerStore';
import ChatStore from './chatStore/chatStore';
import VisibleStore from './visibleStore/visibleStore';
import HelperStore from './helperStore/helperStore';
import AudioStore from './AudioStore/AudioStore';
import HashtagStore from './hashtagStore/hashtagStore';

export class AppRootStore {
    messageStore: MessageStore;
    channelStore: ChannelStore;
    socketStore: SocketStore;
    authStore: AuthStore;
    localStore: LocalStore;
    friendsStore: FriendsStore;
    usersStore: UsersStore;
    routerStore: RouterStore;
    chatStore: ChatStore;
    visibleStore: VisibleStore;
    helperStore: HelperStore;
    audioStore: AudioStore;
    hashtagStore: HashtagStore;

    constructor() {
        makeAutoObservable(this);
        this.localStore = new LocalStore();
        this.authStore = new AuthStore(this);
        this.messageStore = new MessageStore(this);
        this.channelStore = new ChannelStore(this);
        this.socketStore = new SocketStore(this);
        this.friendsStore = new FriendsStore(this);
        this.usersStore = new UsersStore(this);
        this.routerStore = new RouterStore(this);
        this.chatStore = new ChatStore(this);
        this.visibleStore = new VisibleStore();
        this.helperStore = new HelperStore();
        this.audioStore = new AudioStore(this);
        this.hashtagStore = new HashtagStore(this);
        this.run();
    }

    runFunctionsWithLogin = () => {
        this.authStore.getMe();
        this.channelStore.getMyChannels();
    };

    runHasToken = () => {
        if (!this.localStore.session.accessToken) return;
        this.authStore.getMe();
        this.channelStore.getMyChannels();
        this.friendsStore.getFriends();
        this.usersStore.getNonFriends();
        console.log('All requests are done!');
    };

    private run = () => {
        runInAction(() => {
            const list = [this.localStore.getToken()];

            Promise.all(list)
                .then(() => this.runHasToken())
                .catch(() => console.log('Requests failed!'));
        });
    };
}

const rootStore = new AppRootStore();
export default createContext(rootStore);
