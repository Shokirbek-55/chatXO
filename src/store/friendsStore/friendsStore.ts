import { makeAutoObservable, runInAction, toJS } from "mobx";
import APIs from "../../api/api";
import { User } from "../../types/user";
import { Operation } from "../../utils/Operation";
import { AppRootStore } from "../store";
import { message } from "antd";

export default class FriendsStore {
    rootStore: AppRootStore;

    constructor(rootStore: AppRootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    getFriendsOperation = new Operation<User[]>([] as User[]);
    createFriendOperation = new Operation<{ friendId: number }>(
        {} as { friendId: number }
    );
    deleteFriendOperation = new Operation<{ friendId: number }>(
        {} as { friendId: number }
    );

    friends: User[] = [];

    usersListForAdd: User[] = [];
    collectUserList: User[] = [];

    loading: boolean = false;

    createUsername: User = {
        id: 0
    };

    getFriends = async () => {
        runInAction(() => {
            this.loading = true;
        });
        await this.getFriendsOperation.run(() => APIs.Friends.getfriends());
        if (this.getFriendsOperation.data) {
            runInAction(() => {
                this.friends = this.getFriendsOperation.data;
                this.usersListForAdd = this.friends.map((users) => ({
                    ...users,
                    isAdded: this.rootStore.channelStore.channelUsers.some(
                        (e) => e.id === users.id
                    ),
                }));

                this.loading = false;
            });
        }
    };

    setCollectUser = (id: number) => {
        if (!this.collectUserList.find((e) => e.id == id)) {
            this.collectUserList.push(
                this.friends.find((e) => e.id == id) as never
            );
            this.usersListForAdd = this.friends.map((users) => ({
                ...users,
                isAdded: this.collectUserList.some((e) => e.id === users.id),
            }));
        }
        this.rootStore.channelStore.setCreateChannelState(
            "users",
            this.collectUserList
        );
    };

    getFriendsFilter = (key: string) => {
        runInAction(() => {
            this.friends = this.getFriendsOperation.data.filter((i) =>
                i.username
                    ?.trim()
                    .toLowerCase()
                    .includes(key.toLowerCase().trim())
            );
        });
        if (!this.friends) {
            message.warning("No such username exists");
        }
    };

    setSearchUsersForAdd = (key: string) => {
        runInAction(() => {
            this.usersListForAdd = this.getFriendsOperation.data.filter(
                (user) =>
                    user.username?.toLowerCase().includes(key.toLowerCase())
            );
            this.usersListForAdd = this.usersListForAdd.map((users) => ({
                ...users,
                isAdded: this.rootStore.channelStore.channelUsers.some(
                    (e) => e.id === users.id
                ),
            }));
        });
    };

    createFriend = async (friendId: number) => {
        await this.createFriendOperation.run(() =>
            APIs.Friends.createFriend(friendId)
        );
        if (this.createFriendOperation.data) {
            this.getFriends();
            runInAction(() => {
                this.rootStore.usersStore.nonFriends =
                    this.rootStore.usersStore.nonFriends.filter(
                        (e) => e.id !== friendId
                    );
                this.getFriends();
                message.success(`added friends`);
                this.rootStore.channelStore.getChannelUsers(
                    this.rootStore.channelStore.channelData.hashId
                );
            });
        }
    };

    deleteFriend = async (friendId: number) => {
        await this.deleteFriendOperation.run(() =>
            APIs.Friends.deleteFriend(friendId)
        );
        if (this.deleteFriendOperation.isSuccess) {
            runInAction(() => {
                this.friends = this.friends.filter((e) => e.id !== friendId);
                this.rootStore.usersStore.getNonFriends();
                message.success(`delated friend`);
            });
            this.rootStore.channelStore.getChannelUsers(
                this.rootStore.channelStore.channelData.hashId
            );
        }
    };
}
