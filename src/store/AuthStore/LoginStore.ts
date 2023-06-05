import { makeAutoObservable, runInAction } from "mobx";
import { AppRootStore } from "../store";

export default class LoginStore {

    root: AppRootStore

    constructor(root: AppRootStore) {
        makeAutoObservable(this);
        this.root = root
    }

    token: boolean = false

    setToken = (token: boolean) => {
        this.token = token
    }

    togleToken = () => {
        console.log('togleToken');
        runInAction(() => {
            this.token = !this.token
        })
    }


}