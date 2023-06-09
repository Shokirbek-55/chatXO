import { makeAutoObservable, runInAction, toJS } from "mobx";
import APIs from "../../api/api";
import { User } from '../../types/user';
import { Operation } from "../../utils/Operation";
import { AppRootStore } from "../store";

export default class UsersStore {
    rootStore: AppRootStore
    constructor(rootStore: AppRootStore) {
        makeAutoObservable(this)
        this.rootStore = rootStore
    }
    
    loading: boolean = false

    getNonFriendsOperation = new Operation<User[]>([] as User[])

    nonFriends: User[] = []

    getNonFriends = async () => {
        await this.getNonFriendsOperation.run(() => APIs.Users.getAllUsers())
        if (this.getNonFriendsOperation.isInProgress) {
            runInAction(() => {
                this.loading = true
            })
        }
        if (this.getNonFriendsOperation.isSuccess) {
            runInAction(() => {
                this.nonFriends = this.getNonFriendsOperation.data
                this.loading = false
            })
        }
    }
}