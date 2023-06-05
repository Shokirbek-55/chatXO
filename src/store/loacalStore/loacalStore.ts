import { makeAutoObservable } from "mobx";


export default class LocalStore {
    constructor() {
        makeAutoObservable(this);
    }

    value: any = null;
    token: string = '';

    get getValue() {
        return this.value;
    }

    getToken = async () => {
        try {
            const value = window.localStorage.getItem(this.token);
            if (value) {
                this.token = JSON.parse(value);
                return value
            }
        } catch (error) {
            console.log('Token not found localStore');
        }
    }

    setToken = async (value: any) => {
        try {
            window.localStorage.setItem('token', JSON.stringify('token'));
            this.token = value
        } catch (error) {
            console.log('Can not set token localStore');
        }
    }

    removeToken = async () => {
        try {
            window.localStorage.removeItem('token');
            this.token = '';
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