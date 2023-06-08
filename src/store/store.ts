import { makeAutoObservable, runInAction } from 'mobx';
import { createContext } from 'react';


import MessageStore  from './messageStore.ts/MessageStore';
import ChannelStore  from './channelStore/channelStore';
import AuthStore from './AuthStore/AuthStore';
import LocalStore from './loacalStore/loacalStore';
import SocketStore from './socketStore/socketStore';


export class AppRootStore {

    messageStore :  MessageStore
    channelStoore :  ChannelStore
    socketStore: SocketStore
    authStore: AuthStore
    localStore: LocalStore

    constructor() {
        makeAutoObservable(this);
        this.localStore = new LocalStore();
        this.authStore = new AuthStore(this);
        this.messageStore = new MessageStore(this);
        this.channelStoore = new ChannelStore();
        this.socketStore = new SocketStore(this);
        this.run();
    }

    private run = () => {
        runInAction(() => {
            const list: any[] = [            ];

            Promise.all(list)
                .then(() => {
                    console.log("All requests are done!");
                })
                .catch(() => console.log('Requests failed!'));
        })
    };
}

const rootStore = new AppRootStore();
export default createContext(rootStore);