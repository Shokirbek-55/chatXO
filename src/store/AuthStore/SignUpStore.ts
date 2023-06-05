import { makeAutoObservable } from "mobx";


export default class SingUpStore {
    constructor() {
        makeAutoObservable(this);
    }
}