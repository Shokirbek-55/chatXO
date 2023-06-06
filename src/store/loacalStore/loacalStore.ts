import { makeAutoObservable, runInAction } from "mobx";
import { Session } from "../../types/auth";


const TOKENS = 'tokens';

export default class LocalStore {
    constructor() {
        makeAutoObservable(this);
        this.getToken();
    }

    session: Session = {
        accessToken: '',
        refreshToken: '',
    };
    value: any = null;
    token: string = '';

    getToken = async () => {
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
        try {
            window.localStorage.setItem(TOKENS, JSON.stringify(data));
            runInAction(() => {
                this.session = data;
            })
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