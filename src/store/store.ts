import { makeAutoObservable, runInAction } from 'mobx';
import { createContext } from 'react';


import MessageStore  from './messageStore.ts/MessageStore';
import ChannelStore  from './channelStore/channelStore';
import SocketStore from './socketStore/socketStore';
import LoginStore from './AuthStore/LoginStore';
import SingUpStore from './AuthStore/SignUpStore';
import LocalStore from './loacalStore/loacalStore';


export class AppRootStore {

    messageStore :  MessageStore
    channelStoore :  ChannelStore
    socketStore: SocketStore
    loginStore: LoginStore
    singUpStore: SingUpStore
    localStore: LocalStore

    constructor() {
        makeAutoObservable(this);
        this.run();

        this.messageStore = new MessageStore(this);
        this.channelStoore = new ChannelStore();
        this.socketStore = new SocketStore();
        this.loginStore = new LoginStore(this);
        this.singUpStore = new SingUpStore();
        this.localStore = new LocalStore();
    }

    private run = () => {
        runInAction(() => {

            const list: any[] = [];

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