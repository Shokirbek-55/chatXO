import { makeAutoObservable, runInAction, toJS } from "mobx";
import { Session } from "../../types/auth";
import { User } from "../../types/user";


export const TOKENS = 'tokens';
const USER = 'user';

export default class LocalStore {
    constructor() {
        makeAutoObservable(this);
    }

    session: Session = {
        accessToken: '',
        refreshToken: '',
    };

    user: User | null = null;

    value: any = null;

    getToken = async () => {
        console.log(toJS(this.session));
        try {
            const value = window.localStorage.getItem(TOKENS);
            if (value) {
                runInAction(() => {
                    this.session = JSON.parse(value);
                })
                return value
            }
        } catch (error) {
            console.log('Token not found localStore');
        }
    }

    setToken = async (data: Session) => {
        runInAction(() => {
            this.session = data;
        })
        try {
            window.localStorage.setItem(TOKENS, JSON.stringify(data));
        } catch (error) {
            console.log('Can not set token localStore');
        }
    }

    removeToken = async () => {
        try {
            window.localStorage.removeItem(TOKENS);
            runInAction(() => {
                this.session = {
                    accessToken: '',
                    refreshToken: '',
                };
            })
        } catch (error) {
            console.log('Can not remove token localStore');
        }
    }

    getUser = async () => {
        try {
            const value = window.localStorage.getItem(USER);
            if (value) {
                runInAction(() => {
                    this.user = JSON.parse(value);
                })
                return value
            }
        } catch (error) {
            console.log('User not found localStore');
        }
    }

    setUser = async (data: User) => {
        runInAction(() => {
            this.user = data;
        })
        try {
            window.localStorage.setItem(USER, JSON.stringify(data));
        } catch (error) {
            console.log('Can not set user localStore');
        }
    }

    removeUser = async () => {
        try {
            window.localStorage.removeItem(USER);
            runInAction(() => {
                this.user = null;
            })
        } catch (error) {
            console.log('Can not remove user localStore');
        }
    }


    getLocalStore = async(key: string) => {
        this.value = null;
        try {
            const value = window.localStorage.getItem(key);
            if (value) {
                this.value = JSON.parse(value);
                return value
            }
        } catch (error) {
            console.log('Not found localStore');
        }
    }

    setLocalStore = async(key: string, value: any) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
            this.value = value
        } catch (error) {
            console.log('Can not set localStore');
        }
    }

    removeLocalStore = async(key: string) => {
        try {
            window.localStorage.removeItem(key);
            this.value = null;
        } catch (error) {
            console.log('Can not remove localStore');
        }
    }

    clearLocalStore = async() => {
        try {
            window.localStorage.clear();
            this.value = null;
        } catch (error) {
            console.log('Can not clear localStore');
        }
    }
}