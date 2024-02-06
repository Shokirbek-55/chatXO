import { message } from "antd";
import { t } from "i18next";
import { makeAutoObservable, runInAction } from "mobx";
import APIs from "../../api/api";
import { Channel } from "../../types/channel";
import { User } from "../../types/user";
import { Operation } from "../../utils/Operation";
import { AppRootStore } from "../store";

type UserStateType = {
    username: string;
    email: string;
    color: string;
    avatar: string;
    name?: string;
    birth?: any;
    city?: string;
    description?: string;
    occupacy?: string;
};

type PreviewDataType = {
    dataTypes: string;
    avatar: string;
    id?: number;
    username?: string;
    color: string;
    name?: string;
    hashId?: string;
    adminId?: number;
    mediaUrl?: string;
    userId?: number;
    timestamp?: string;
};

type ConnectChannelaDataType = {
    channelNumber: string;
    channelInviteCode?: string;
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
    deleteUserMeAvatarOperation = new Operation<User>({} as User);
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

    friendDetails: User = {
        id: 0,
    };

    formData = new FormData();

    connectChannelData: ConnectChannelaDataType = {
        channelNumber: "",
        channelInviteCode: "",
    };

    forJoinChannelId: number = 0;
    userAvatar: string = "";

    previewData: PreviewDataType = {
        dataTypes: "",
        avatar: "",
        id: 0,
        username: "",
        color: "",
        name: "",
        hashId: "",
        adminId: 0,
        mediaUrl: "",
        timestamp: "",
    };

    getPreviewData = (data: PreviewDataType) => {
        this.previewData = data;
    };

    clearPreviewData = () => {
        runInAction(() => {
            this.previewData = {
                dataTypes: "",
                avatar: "",
                id: 0,
                username: "",
                color: "",
                name: "",
                hashId: "",
                adminId: 0,
                mediaUrl: "",
                timestamp: "",
            };
        });
    };

    deletePreviewAvatar = async () => {
        if (this.previewData.id === this.rootStore.authStore.user.id) {
            await this.deleteUserMeAvatarOperation.run(() => {
                APIs.Account.delateMyAvatar();
            });
            if (this.deleteUserMeAvatarOperation.isSuccess) {
                this.updateUserAccount({ avatar: "" });
                this.clearPreviewData();
                this.rootStore.visibleStore.hide("previewModal");
            }
            return;
        }
        if (
            this.previewData.hashId &&
            this.previewData.adminId === this.rootStore.authStore.user.id
        ) {
            await this.rootStore.channelStore.deleteChannelAvatar(
                this.previewData.hashId
            );
            if (
                this.rootStore.channelStore.deleteChannelAvatarOperation
                    .isSuccess
            ) {
                this.clearPreviewData();
                this.rootStore.visibleStore.hide("previewModal");
                this.rootStore.channelStore.channelAvatar = "";
            }
            return;
        }
    };

    myDataToSetData = (myData: User) =>
    (this.setMyData = {
        username: myData.username || "",
        email: myData.email || "",
        color: myData.color || "",
        avatar: myData.avatar || "",
        name: myData.name || "",
        city: myData.city || "",
        birth: myData.birth || "",
        occupacy: myData.occupacy || "",
        description: myData.description || "",
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

    createMeAvatar = async (file: File) => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        runInAction(() => {
            this.avatarLoading = true;
        });
        this.formData.append("avatar", file);
        await this.userMeAvatarOperation.run(() =>
            APIs.Account.usersMeAvatar(this.formData, config)
        );
        if (this.userMeAvatarOperation.isSuccess) {
            runInAction(() => {
                this.updateUserAccount({
                    avatar: this.userMeAvatarOperation.data.avatar,
                });
                this.userAvatar = "";
                this.formData = new FormData();
                this.setUserState(
                    "avatar",
                    this.userMeAvatarOperation.data.avatar as never
                );
                this.avatarLoading = false;
            });
        }
        if (this.userMeAvatarOperation.isError) {
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
            });
        }
    };

    clearFriendDetails = () => {
        runInAction(() => {
            this.friendDetails = {
                id: 0,
            };
        });
    };

    setConnectChannelData = (
        key: keyof ConnectChannelaDataType,
        value: string
    ) => {
        this.connectChannelData[key] = value;
    };

    returnGroupByNumber = async (
        channelNumber: string,
        callback: (e) => void
    ) => {
        await this.returnGroupByNumberOperation.run(() =>
            APIs.channels.connectToChannel(channelNumber)
        );
        runInAction(() => {
            if (this.returnGroupByNumberOperation.isSuccess) {
                if (
                    !this.returnGroupByNumberOperation.data.isPrivate ||
                    (this.connectChannelData.channelInviteCode
                        ?.length as never) > 1
                ) {
                    this.forJoinChannelId =
                        this.returnGroupByNumberOperation.data.id;
                    this.joinUserToChannel(
                        this.forJoinChannelId,
                        this.connectChannelData.channelInviteCode as never,
                        () =>
                            callback(
                                this.returnGroupByNumberOperation.data.hashId
                            )
                    );
                    this.rootStore.channelStore.getChannelByHashId(
                        this.returnGroupByNumberOperation.data.hashId
                    );
                    this.connectChannelData = {
                        channelNumber: "",
                        channelInviteCode: "",
                    };
                } else {
                    this.rootStore.visibleStore.show("passwordInput");
                    message.warning(
                        "Channel is private please enter group's invitation code"
                    );
                }
            }
        });
    };

    joinUserToChannel = async (
        channleId: number,
        invitationCode: string,
        callback: () => void
    ) => {
        await this.joinUserToChannelOperation.run(() =>
            APIs.channels.joinChannel(channleId, invitationCode)
        );
        if (this.joinUserToChannelOperation.isSuccess) {
            runInAction(() => {
                this.rootStore.channelStore.getMyChannels();
                this.rootStore.routerStore.setCurrentRoute("channels");
                callback();
                message.success("You have joined the group");
                localStorage.removeItem("hashId");
            });
        }
    };

    userChannelLeave = async (channelId: number, callback: () => void) => {
        await this.userChannelLeaveOperation.run(() =>
            APIs.Users.leaveFromChannel(channelId)
        );
        if (this.userChannelLeaveOperation.isSuccess) {
            runInAction(() => {
                this.rootStore.channelStore.myChannels =
                    this.rootStore.channelStore.myChannels.filter(
                        (i) => i?.id !== channelId
                    );
                this.rootStore.channelStore.hashId = "";
                callback();
                message.success("Exited the channel");
            });
        }
    };
}
