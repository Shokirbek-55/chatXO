import { makeAutoObservable, runInAction, toJS } from "mobx";
import APIs from "../../api/api";
import { User } from "../../types/user";
import { Operation } from "../../utils/Operation";
import { AppRootStore } from "../store";
import { message } from "antd";
import { t } from "i18next";
import { Channel } from "../../types/channel";

type UserStateType = {
    username: string;
    email: string;
    color: string;
};

export default class UsersStore {
    rootStore: AppRootStore;

    constructor(rootStore: AppRootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    loading: boolean = false;

    avatarLoading: boolean = false;

    getNonFriendsOperation = new Operation<User[]>([] as User[]);
    getUserDataOperation = new Operation<User>({} as User);
    updateUserAccountOperation = new Operation<User>({} as User);
    userMeAvatarOperation = new Operation<User>({} as User);
    getFriendDetailsOperation = new Operation<User>({} as User);
    returnGroupByNumberOperation = new Operation<Channel>({} as Channel);
    userChannelLeaveOperation = new Operation<{ channelId: number }>(
        {} as { channelId: number }
    );
    joinUserToChannelOperation = new Operation<{ channelId: number }>(
        {} as { channelId: number }
    );

    setMyData: UserStateType = {} as UserStateType;

    nonFriends: User[] = [];

    weChannels: Channel[] = [];

    friendDetails: User = {};

    forJoinChannelId: number = 0;

    myDataToSetData = (myData: User) =>
        (this.setMyData = {
            username: myData.username as string,
            email: myData.email as string,
            color: myData.color as string,
        });

    setUserState = (key: keyof UserStateType, value: string) => {
        this.setMyData[key] = value;
    };

    updateUserAccount = async (user: Partial<User>) => {
        await this.updateUserAccountOperation.run(() =>
            APIs.Account.updateAccount(user)
        );
        if (this.updateUserAccountOperation.isSuccess) {
            message.success(`${t("update_profile")}`);
            this.rootStore.authStore.getMe();
        }
    };

    createMeAvatar = async (formData: FormData) => {
        runInAction(() => {
            this.avatarLoading = true;
        });
        await this.userMeAvatarOperation.run(() =>
            APIs.Account.usersMeAvatar(formData)
        );
        if (this.userMeAvatarOperation.isSuccess) {
            runInAction(() => {
                this.avatarLoading = false;
            });
        }
    };

    getNonFriends = async () => {
        runInAction(() => {
            this.loading = true;
        });
        await this.getNonFriendsOperation.run(() => APIs.Users.getAllUsers());
        if (this.getNonFriendsOperation.isSuccess) {
            runInAction(() => {
                this.nonFriends = this.getNonFriendsOperation.data;
                this.loading = false;
            });
        }
    };

    getUsersFilter = (key: string) => {
        runInAction(() => {
            this.nonFriends = this.getNonFriendsOperation.data.filter((i) =>
                i.username
                    ?.trim()
                    .toLowerCase()
                    .includes(key.toLowerCase().trim())
            );
        });
        if (!this.nonFriends) {
            message.warning("No such username exists");
        }
    };

    getFriendDetails = async (friendId: number) => {
        await this.getFriendDetailsOperation.run(() =>
            APIs.Users.getFriendDetails(friendId)
        );
        if (this.getFriendDetailsOperation.isSuccess) {
            runInAction(() => {
                this.friendDetails = this.getFriendDetailsOperation.data;
                if (
                    !!this.rootStore.channelStore.myChannels.length &&
                    !!this.friendDetails.channels?.length
                ) {
                    const sortedData =
                        this.rootStore.channelStore.myChannels.reduce(
                            (total: Channel[] = [], myChanel) => {
                                const slug = myChanel.slug;
                                const currentChanel =
                                    this.friendDetails?.channels?.filter(
                                        (ch: any) => ch.slug === slug
                                    ) ?? [];

                                return [...total, ...currentChanel];
                            },
                            []
                        );

                    this.weChannels = sortedData as any;
                }
            });
        }
    };

    returnGroupByNumber = async (channelNumber: string) => {
        await this.returnGroupByNumberOperation.run(() =>
            APIs.channels.connectToChannel(channelNumber)
        );
        runInAction(() => {
            if (this.returnGroupByNumberOperation.isSuccess) {
                this.forJoinChannelId =
                    this.returnGroupByNumberOperation.data.id;
                this.joinUserToChannel(this.forJoinChannelId);
            }
        });
    };

    joinUserToChannel = async (channleId: number) => {
        await this.joinUserToChannelOperation.run(() =>
            APIs.channels.joinChannel(channleId)
        );
        if (this.joinUserToChannelOperation.isSuccess) {
            this.rootStore.channelStore.getMyChannels();
            this.rootStore.routerStore.toRouter("channels");
            message.success("You have joined the group");
        }
    };

    userChannelLeave = async (channelId: number) => {
        await this.userChannelLeaveOperation.run(() =>
            APIs.Users.leaveFromChannel(channelId)
        );
        if (this.userChannelLeaveOperation.isSuccess) {
            this.rootStore.channelStore.myChannels =
                this.rootStore.channelStore.myChannels.filter(
                    (i) => i.id !== channelId
                );
            message.success("Exited the channel");
        }
    };
}
