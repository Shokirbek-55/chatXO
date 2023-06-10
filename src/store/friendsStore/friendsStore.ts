import { makeAutoObservable, runInAction, toJS } from "mobx";
import APIs from "../../api/api";
import { User } from "../../types/user";
import { Operation } from "../../utils/Operation";
import { AppRootStore } from "../store";

export default class FriendsStore {

    rootStore: AppRootStore

    constructor(rootStore: AppRootStore) {
        makeAutoObservable(this)
        this.rootStore = rootStore
    }

    getFriendsOperation = new Operation<User[]>([] as User[])
    createFriendOperation = new Operation<{friendId: number}>({} as {friendId: number})
    deleteFriendOperation = new Operation<{friendId: number}>({} as {friendId: number})

    friends: User[] = []

    loading: boolean = false

    createdFriendId: Number = 0

    getFriends = async () => {
        await this.getFriendsOperation.run(() => APIs.Friends.getfriends())
        runInAction(() => {
            this.loading = true
        })
        if (this.getFriendsOperation.data) {
            runInAction(() => {
                this.friends = this.getFriendsOperation.data
            })
        }
        if (this.getFriendsOperation.isSuccess) {
            runInAction(() => {
                this.loading = false
            })
        }
    }

    createFriend = async (friendId:number) => {
        await this.createFriendOperation.run(() => APIs.Friends.createFriend(friendId))
        if (this.createFriendOperation.data) {
            runInAction(() => {
                this.friends = this.createFriendOperation.data as never
                this.rootStore.usersStore.nonFriends =
                    this.rootStore.usersStore.nonFriends.filter((e) => e.id !== friendId)  
                console.log("crearteeeee", toJS(this.createFriendOperation.data));
            })
        }
    }

    deleteFriend = async (friendId: number) => {
        await this.deleteFriendOperation.run(() => APIs.Friends.deleteFriend(friendId))
        runInAction(() => {
            if (this.deleteFriendOperation.isSuccess) {
                this.friends = this.friends.filter((e) => e.id !== friendId)
                this.createdFriendId = friendId
            }
        })
    }
}