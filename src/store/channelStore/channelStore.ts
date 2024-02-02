import { message } from "antd";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { generatePath } from "react-router-dom";
import APIs from "../../api/api";
import {
    Channel,
    ChannelInitialState,
    ChannelsUsersInitial,
    ChannelsUsersType,
    CreateChannelType,
    SetUpdataChanelType,
    generateInviteCodeType,
    relevanceDataInitial,
    relevanceDataType,
} from "../../types/channel";
import { User } from "../../types/user";
import { Operation } from "../../utils/Operation";
import { AppRootStore } from "../store";

export default class ChannelStore {
    rootStore: AppRootStore;

    constructor(rootStore: AppRootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    getChannelOperation = new Operation<Channel[]>([] as Channel[]);
    createChannelOperation = new Operation<Channel>({} as Channel);
    updateChannelOperation = new Operation<Channel>({} as Channel);
    getChannelByHashIdOperation = new Operation<Channel>({} as Channel);
    generateNewInvitationCodeOperation = new Operation<generateInviteCodeType>(
        {} as generateInviteCodeType
    );
    delateChannelOperation = new Operation<{ hashId: string }>(
        {} as { hashId: string }
    );
    createChannelAvatarOperation = new Operation<{
        hashId: string;
        formData: FormData;
    }>({} as { hashId: string; formData: FormData });
    deleteChannelAvatarOperation = new Operation<{
        hashId: string;
    }>({} as { hashId: string });
    addUserToChannelOperation = new Operation<{ friendId: number }>(
        {} as { friendId: number }
    );
    delateUserFromChannelOperation = new Operation<Channel>({} as Channel);
    getChannelBlockedUsersOperation = new Operation<User>({} as User);
    blockUserOperation = new Operation<User>({} as User);
    newAdminOperation = new Operation<User>({} as User);
    unblockUserOperation = new Operation<User>({} as User);
    getChannelUsersOperation = new Operation<User>([] as unknown as User);
    updateMemberRelevanceOperation = new Operation<ChannelsUsersType>(
        {} as ChannelsUsersType
    );

    myChannels: Channel[] = [];

    channelData: Channel = ChannelInitialState;

    channelAvatar: string = "";
    createAvatar: string = "";
    channelAvatarLoading: boolean = false;

    setUpdataChannel: SetUpdataChanelType = {} as SetUpdataChanelType;

    setCreateChannelData: CreateChannelType = {} as CreateChannelType;

    getChannelUsersData: ChannelsUsersType[] = [];

    channelUsers: ChannelsUsersType[] = [];

    adminId: number = 0;

    hashId: string = "";
    navigateChannel: () => void = () => {};
    generateNavigateChannel: () => void = () => {};

    getBlockedUser: User = {
        id: 0,
    };

    channelsLoading: boolean = false;

    isLoad: boolean = false;

    memberRelevence: ChannelsUsersType = ChannelsUsersInitial as never;

    relevanceData: relevanceDataType = relevanceDataInitial;

    chFormData = new FormData();
    createFormData = new FormData();

    setRelevanceChange = (value: number) => {
        this.relevanceData.relevance = value;
    };

    getOneMember = (id: number) => {
        runInAction(() => {
            this.rootStore.visibleStore.show("RelevenceModal");
            this.memberRelevence = this.channelUsers.find(
                (item) => item.id === id
            ) as never;
            this.relevanceData = {
                channelSlug: this.channelData?.slug,
                fromUserId: this.rootStore.authStore.user.id as never,
                toUserId: id,
                relevance: this.memberRelevence?.relevance,
            };
            return;
        });
    };

    updateMemberRelevance = async (data: any) => {
        await this.updateMemberRelevanceOperation.run(() =>
            APIs.channels.updateRelevance(data)
        );
        if (this.updateMemberRelevanceOperation.isSuccess) {
            this.memberRelevence.relevance = data?.relevance;
            message.success(
                `update ${this.memberRelevence?.username} relevance successfully`
            );
        }
        if (this.updateMemberRelevanceOperation.isError) {
            message.error(
                `update ${this.memberRelevence?.username} relevance Error`
            );
            return;
        }
    };

    getMyChannels = async () => {
        runInAction(() => {
            this.channelsLoading = true;
        });
        await this.getChannelOperation.run(() => APIs.channels.getMyChannels());
        if (this.getChannelOperation.isSuccess) {
            runInAction(() => {
                this.myChannels = this.getChannelOperation.data;
                this.channelsLoading = false;
            });
            console.log("mychannels", toJS(this.getChannelOperation.data));

            this.getChannelDataCache();
        }
    };

    getChannelByHashId = async (hashId: string) => {
        this.rootStore.hashtagStore.setHashId(hashId);
        runInAction(() => {
            this.isLoad = true;
        });
        await this.getChannelByHashIdOperation.run(() =>
            APIs.channels.getChannelByHashId(hashId)
        );
        await this.getChannelUsers(hashId);
        if (this.getChannelByHashIdOperation.isSuccess) {
            runInAction(() => {
                this.channelData = this.getChannelByHashIdOperation.data;
                this.getChannelUsersData = this.getChannelByHashIdOperation.data
                    .users as never;
                this.adminId = this.getChannelByHashIdOperation.data.adminId;

                this.rootStore.messageStore.getHistoryMessages(
                    this.getChannelByHashIdOperation.data.slug
                );
                this.rootStore.chatStore.openChannel(
                    this.rootStore.messageStore.slug
                );
                this.setUpdataChannel = {
                    name: this.channelData.name,
                    isPrivate: this.channelData.isPrivate,
                    color: this.channelData.color || "",
                    avatar: this.channelData.avatar || "",
                };
                this.isLoad = false;
            });
        }
    };

    setChannelHashId = (hashId: string, callback: () => void) => {
        runInAction(() => {
            this.hashId = hashId;
            this.navigateChannel = callback;
        });
    };

    getHashId = async (callback?: () => void) => {
        if (this.hashId && this.rootStore.localStore.session.accessToken) {
            const isHas = this.myChannels.some((channel) => {
                if (channel.hashId === this.hashId) {
                    this.rootStore.messageStore.getHistoryMessages(
                        channel.slug
                    );
                    this.getChannelByHashId(this.hashId);
                    this.rootStore.messageStore.setChannelSlug(channel.slug);
                    this.navigateChannel();
                    return true;
                }
                return false;
            });
            if (!isHas) {
                await this.getChannelByHashId(this.hashId);
                await this.rootStore.usersStore.joinUserToChannel(
                    this.channelData.id,
                    this.rootStore.usersStore.connectChannelData
                        .channelInviteCode as never,
                    () => callback
                );
            }
        }
    };

    getChannelDataCache = async () => {
        try {
            const promises = this.myChannels.map(async (channel) => {
                const channelUsersData =
                    await this.getChannelUsersOperation.run(() =>
                        APIs.channels.getChannelUsers(channel.hashId)
                    );
                const channelData = await this.getChannelByHashIdOperation.run(
                    () => APIs.channels.getChannelByHashId(channel.hashId)
                );
                if (this.getChannelByHashIdOperation.isSuccess) {
                    this.rootStore.messageStore.setChannelDataCache(
                        channel.slug,
                        channelData.data
                    );
                    this.rootStore.messageStore.getHistoryMessages(
                        this.getChannelByHashIdOperation.data.slug
                    );
                }
                if (this.getChannelUsersOperation.isSuccess) {
                    this.rootStore.messageStore.setChannelUsersCache(
                        channel.slug,
                        channelUsersData.data
                    );
                }
            });

            await Promise.all(promises)
                .then(() => {
                    this.getHashId();
                })
                .catch((error) => {
                    console.log("error getChannelDataCache", error);
                });
        } catch (error) {
            console.log("Error:", error);
        }
    };

    getChannelUsers = async (hashId: string) => {
        await this.getChannelUsersOperation.run(() =>
            APIs.channels.getChannelUsers(hashId)
        );
        runInAction(() => {
            if (this.getChannelUsersOperation.isSuccess) {
                this.channelUsers = Object.values(
                    this.getChannelUsersOperation.data
                );
                this.channelUsers = this.channelUsers.map((users) => ({
                    ...users,
                    isFriend: this.rootStore.friendsStore.friends.some(
                        (e) => e.id === users.id
                    ),
                }));
            }
        });
    };

    setSearchChannels = (text: string) => {
        runInAction(() => {
            this.myChannels = this.getChannelOperation.data.filter((channel) =>
                channel.name?.toLowerCase().includes(text.toLowerCase())
            );
        });
    };
    setSearchChannelUsers = (text: string) => {
        runInAction(() => {
            this.channelUsers = Object.values(
                this.getChannelUsersOperation.data
            ).filter((user) =>
                user.username?.toLowerCase().includes(text.toLowerCase())
            );
            this.channelUsers = this.channelUsers.map((users) => ({
                ...users,
                isFriend: this.rootStore.friendsStore.friends.some(
                    (e) => e.id === users.id
                ),
            }));
        });
    };

    createChannelDataToSetData = () =>
        (this.setCreateChannelData = {
            name: "",
            description: "",
            avatar: "",
            color: "",
            isPrivate: false,
            defaultRelevance: 0,
            users: [],
        });

    setCreateChannelState = (key: keyof CreateChannelType, value: any) => {
        this.setCreateChannelData[key] = value;
    };

    createChannel = async (
        data: CreateChannelType,
        callback: (e: string) => void
    ) => {
        await this.createChannelOperation.run(() =>
            APIs.channels.createChannel(data)
        );
        if (this.createChannelOperation.isSuccess) {
            runInAction(() => {
                console.log(
                    "this.createChannelOperation.data",
                    toJS(this.createChannelOperation.data)
                );
                this.myChannels.push(this.createChannelOperation.data);
                this.rootStore.messageStore.setChannelSlug(
                    this.createChannelOperation.data.slug
                );
                this.getChannelByHashId(
                    this.createChannelOperation.data.hashId
                );
                this.rootStore.routerStore.setCurrentRoute("channels");
                callback(this.createChannelOperation.data.slug);
            });
        } else {
            message.error(this.createChannelOperation.error);
        }
    };

    channelDataToSetData = (channel: Channel) =>
        (this.setUpdataChannel = {
            name: channel.name as string,
            isPrivate: channel.isPrivate as boolean,
            color: channel.color as string,
            avatar: channel.avatar as string,
            defaultRelevance: channel.relevance as never,
            description: channel.description as string,
        });

    setUpdateChannelState = (key: keyof SetUpdataChanelType, value: any) => {
        runInAction(() => {
            this.channelData[key] = value as never;
            this.setUpdataChannel[key] = value;
        });
    };

    updateChannel = async (channel: Partial<Channel>) => {
        await this.updateChannelOperation.run(() =>
            APIs.channels.updateChannel(this.channelData.hashId, channel)
        );
        runInAction(() => {
            if (this.updateChannelOperation.isSuccess) {
                runInAction(() => {
                    this.getMyChannels();
                });
            }
        });
    };

    generateNewInvitationCode = async (
        groupNumber: string,
        callBack: (e: string) => void
    ) => {
        await this.generateNewInvitationCodeOperation.run(() =>
            APIs.channels.generateNewInviteCode(groupNumber)
        );
        runInAction(() => {
            if (this.generateNewInvitationCodeOperation.isSuccess) {
                this.channelData.invitationCodes[0].code =
                    this.generateNewInvitationCodeOperation.data.inviteCode;
                this.hashId =
                    this.generateNewInvitationCodeOperation.data.hashId;
                this.getChannelByHashId(
                    this.generateNewInvitationCodeOperation.data.hashId
                );
                callBack(this.generateNewInvitationCodeOperation.data.hashId);
            }
        });
    };

    noInvitationCode = async () => {};

    onSelectChannelImage = async (file: File) => {
        runInAction(() => {
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                this.channelAvatar = imageUrl;
            }
        });
    };

    onCreateChannelImage = async (file: File) => {
        runInAction(() => {
            this.createFormData.append("avatar", file, file.name);
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                this.createAvatar = imageUrl;
            }
        });
    };

    closeSelectImage = () => {
        runInAction(() => {
            this.channelAvatar = "";
            this.createAvatar = "";
            this.rootStore.visibleStore.hide("chUploadFile");
        });
    };

    createChannelAvatar = async (file: File) => {
        const config = {
            headers: {
                "Content-Type": "image/png",
            },
        };
        runInAction(() => {
            this.channelAvatarLoading = true;
        });
        this.chFormData.append("avatar", file, file.name);
        await this.createChannelAvatarOperation.run(() =>
            APIs.channels.createChannelAvatar(
                this.channelData.hashId,
                this.chFormData,
                config
            )
        );
        runInAction(() => {
            if (this.createChannelAvatarOperation.isSuccess) {
                this.setUpdateChannelState(
                    "avatar",
                    Object.values(
                        this.createChannelAvatarOperation.data
                    ).toString()
                );
                this.channelAvatar = "";
                this.chFormData = new FormData();
                this.channelAvatarLoading = false;
                message.success("created avatar successfully");
                this.updateChannel(this.setUpdataChannel);
            }
            if (this.createChannelAvatarOperation.isError) {
                this.channelAvatarLoading = false;
            }
        });
    };

    deleteChannelAvatar = async (hashId: string) => {
        await this.deleteChannelAvatarOperation.run(() => {
            APIs.channels.delateChannelAvatar(hashId);
        });
        if (this.deleteChannelAvatarOperation.isSuccess) {
            runInAction(() => {
                this.setUpdateChannelState("avatar", "");
            });
        }
    };

    delateChannel = async (hashId: string, callback: () => void) => {
        await this.delateChannelOperation.run(() =>
            APIs.channels.deleteChannel(hashId)
        );
        runInAction(() => {
            if (this.delateChannelOperation.isSuccess) {
                message.success("The channel is deleted succefully!");
                this.myChannels = this.myChannels.filter(
                    (ch) => ch.hashId !== hashId
                );
                this.hashId = "";
                callback();
            }
        });
    };

    addUserToChannel = async (hashId: string, friendId: number) => {
        await this.addUserToChannelOperation.run(() =>
            APIs.channels.addUsersToChannel(hashId, [friendId])
        );
        if (this.addUserToChannelOperation.isSuccess) {
            runInAction(() => {
                this.rootStore.chatStore.join(this.rootStore.messageStore.slug);
                this.channelUsers.push(
                    this.rootStore.friendsStore.usersListForAdd.find(
                        (e) => e.id === friendId
                    ) as never
                );
                this.rootStore.friendsStore.usersListForAdd =
                    this.rootStore.friendsStore.friends.map((users) => ({
                        ...users,
                        isAdded: this.channelUsers.some(
                            (e) => e.id === users.id
                        ),
                    }));
            });
        }
    };

    filterAddUser = (id: any) => {
        runInAction(() => {
            this.channelUsers.push(
                this.rootStore.friendsStore.usersListForAdd.find(
                    (e) => e.id === id
                ) as never
            );
        });
    };

    delateUserFromChannel = async (hashId: string, userId: number) => {
        await this.delateUserFromChannelOperation.run(() =>
            APIs.channels.deleteUsersFromChannel(hashId, userId)
        );
        runInAction(() => {
            if (this.delateUserFromChannelOperation.isSuccess) {
                this.channelUsers = this.channelUsers.filter(
                    (u) => u.id !== userId
                ) as never;
                message.success("delated user form channel");
            }
        });
    };

    filterLeftUser = (userId: any) => {
        runInAction(() => {
            this.channelUsers = this.channelUsers.filter(
                (u) => u.id !== userId
            ) as never;
            console.log("channelUsers", toJS(this.channelUsers));
        });
    };

    getChannelBlockedUsers = async (hashId: string) => {
        await this.getChannelBlockedUsersOperation.run(() =>
            APIs.channels.getBlockedUsers(hashId)
        );
        runInAction(() => {
            if (this.getChannelBlockedUsersOperation.isSuccess) {
                this.getBlockedUser = this.getChannelBlockedUsersOperation.data;
            }
        });
    };

    blockUser = async (hashId: string, userId: number) => {
        await this.blockUserOperation.run(() =>
            APIs.channels.blockUser(hashId, userId)
        );
        runInAction(() => {
            if (this.blockUserOperation.isSuccess) {
                this.getChannelBlockedUsers(hashId);
                message.success("this user blocked");
            }
        });
    };

    unblockUser = async (hashId: string, userId: number) => {
        await this.unblockUserOperation.run(() =>
            APIs.channels.unblockUser(hashId, userId)
        );
        runInAction(() => {
            if (this.unblockUserOperation.isSuccess) {
                this.getBlockedUser = Object.values(
                    this.getBlockedUser
                )?.filter((e) => e.id !== userId) as never;
                message.success("this user unblocked");
            }
        });
    };

    newAdmin = async (hashId: string, userId: number) => {
        await this.newAdminOperation.run(() =>
            APIs.channels.setNewAdmin(hashId, userId)
        );
        runInAction(() => {
            if (this.newAdminOperation.isSuccess) {
                this.adminId = userId;
                this.getChannelUsers(hashId);
                message.success("new admin");
            }
        });
    };
}
