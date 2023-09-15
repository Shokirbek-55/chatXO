import { data } from "./../dataBase";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { message } from "antd";
import {
    Channel,
    CreateChannelType,
    generateInviteCodeInitialState,
    generateInviteCodeType,
    ChannelInitialState,
    SetUpdataChanelType,
    ChannelsUsersType,
    ChannelsUsersInitial,
    relevanceDataType,
    relevanceDataInitial,
} from "../../types/channel";
import { Operation } from "../../utils/Operation";
import APIs from "../../api/api";
import { AppRootStore } from "../store";
import { Friend } from "../../types/friend";
import { User } from "../../types/user";
import { ChangeEvent } from "react";
import { generatePath } from "react-router-dom";

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
    getChannelUsersOperation = new Operation<any>({} as any);
    updateMemberRelevanceOperation = new Operation<ChannelsUsersType>(
        {} as ChannelsUsersType
    );

    myChannels: Channel[] = [];

    channelData: Channel = ChannelInitialState;

    channelAvatar: string = "";
    channelAvatarLoading: boolean = false;

    setUpdataChannel: SetUpdataChanelType = {} as SetUpdataChanelType;

    setCreateChannelData: CreateChannelType = {} as CreateChannelType;

    getChannelUsersData: ChannelsUsersType[] = [];

    channelUsers: {
        [key: string]: ChannelsUsersType;
    } = {};

    adminId: number = 0;

    hashId: string = "";

    getBlockedUser: User = {};

    channelsLoading: boolean = false;

    isLoad: boolean = false;

    memberRelevence: ChannelsUsersType = ChannelsUsersInitial as never;

    relevanceData: relevanceDataType = relevanceDataInitial;

    chFormData = new FormData();

    setRelevanceChange = (value: number) => {
        this.relevanceData.relevance = value;
    };

    getOneMember = (id: number) => {
        runInAction(() => {
            if (id === this.adminId) {
                this.rootStore.visibleStore.show("RelevenceModal");
                this.memberRelevence = this.getChannelUsersData.find(
                    (item) => item.id === id
                ) as never;
                this.relevanceData = {
                    channelSlug: this.channelData.slug,
                    fromUserId: this.rootStore.authStore.user.id as never,
                    toUserId: id,
                    relevance: this.memberRelevence.relevance,
                };
            } else {
                message.warning("You are not admin");
            }
        });
    };

    updateMemberRelevance = async (data: any) => {
        await this.updateMemberRelevanceOperation.run(() =>
            APIs.channels.updateRelevance(data)
        );
        if (this.updateMemberRelevanceOperation.isSuccess) {
            this.memberRelevence.relevance = data.relevance;
            message.success(
                `update ${this.memberRelevence.username} relevance successfully`
            );
        }
        if (this.updateMemberRelevanceOperation.isError) {
            message.error(
                `update ${this.memberRelevence.username} relevance Error`
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
            this.getChannelDataCache();
        }
    };

    getChannelByHashId = async (hashId: string) => {
        runInAction(() => {
            this.isLoad = true;
        });
        await this.getChannelByHashIdOperation.run(() =>
            APIs.channels.getChannelByHashId(hashId)
        );
        await this.getChannelUsers(hashId);
        if (this.getChannelByHashIdOperation.isSuccess) {
            runInAction(() => {
                const target = generatePath(`/:name`, {
                    name: `@${this.getChannelByHashIdOperation.data.hashId}`,
                });
                this.channelData = this.getChannelByHashIdOperation.data;
                this.getChannelUsersData = this.getChannelByHashIdOperation.data
                    .users as never;
                this.adminId = this.getChannelByHashIdOperation.data.adminId;
                console.log("admin Id", toJS(this.adminId));

                this.rootStore.messageStore.getHistoryMessages(
                    this.getChannelByHashIdOperation.data.slug
                );
                this.setUpdataChannel = {
                    name: this.channelData.name,
                    isPrivate: this.channelData.isPrivate,
                    color: this.channelData.color || "",
                    avatar: this.channelData.avatar || "",
                };
                this.isLoad = false;
                console.log("channelData", toJS(this.channelData));
            });
        }
    };

    getHashId = async (hashId: string) => {
        this.hashId = hashId;
        if (this.hashId && this.rootStore.localStore.session.accessToken) {
            await this.getChannelByHashId(hashId);
            runInAction(() => {
                if (
                    Object.values(this.channelUsers).some(
                        (e) => e.id === this.rootStore.authStore.user.id
                    )
                ) {
                    this.getMyChannels();
                    return;
                } else {
                    this.rootStore.usersStore.joinUserToChannelOperation
                        .run(() => {
                            APIs.channels.joinChannel(this.channelData.id);
                        })
                        .then(() => {
                            this.getMyChannels();
                        });
                }
            });
        }
    };

    getChannelDataCache = async () => {
        try {
            const promises = this.myChannels.map(async (channel) => {
                await this.getChannelUsersOperation.run(() =>
                    APIs.channels.getChannelUsers(this.hashId)
                );
                await this.getChannelByHashIdOperation.run(() =>
                    APIs.channels.getChannelByHashId(this.hashId)
                );
                runInAction(() => {
                    if (this.getChannelByHashIdOperation.isSuccess) {
                        this.rootStore.messageStore.setChannelDataCache(
                            channel.slug,
                            this.getChannelByHashIdOperation.data
                        );
                    }
                    if (this.getChannelUsersOperation.isSuccess) {
                        this.rootStore.messageStore.setChannelUsersCache(
                            channel.slug,
                            this.getChannelUsersOperation.data
                        );
                    }
                });
            });

            await Promise.all(promises);
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
                this.channelUsers = this.getChannelUsersOperation.data;
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

    createChannelDataToSetData = () =>
        (this.setCreateChannelData = {
            name: "",
            description: "",
            color: "",
        });

    setCreateChannelState = (key: keyof CreateChannelType, value: string) => {
        this.setCreateChannelData[key] = value;
    };

    createChannel = async (data: CreateChannelType) => {
        await this.createChannelOperation.run(() =>
            APIs.channels.createChannel(data.name, data.description, data.color)
        );
        if (this.createChannelOperation.isSuccess) {
            runInAction(() => {
                this.channelData = this.createChannelOperation.data;
                this.myChannels.push(this.channelData);
            });
        }
    };

    channelDataToSetData = (channel: Channel) =>
        (this.setUpdataChannel = {
            name: channel.name as string,
            isPrivate: channel.isPrivate as boolean,
            color: channel.color as string,
            avatar: channel.avatar as string,
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
        if (this.updateChannelOperation.isSuccess) {
            runInAction(() => {
                this.getMyChannels();
            });
        }
    };

    generateNewInvitationCode = async (groupNumber: string) => {
        await this.generateNewInvitationCodeOperation.run(() =>
            APIs.channels.generateNewInviteCode(groupNumber)
        );
        if (this.generateNewInvitationCodeOperation.isSuccess) {
            this.channelData.invitationCodes[0].code =
                this.generateNewInvitationCodeOperation.data.inviteCode;
            this.getMyChannels();
        }
    };

    noInvitationCode = async () => {};

    onSelectChannelImage = (file: File) => {
        this.chFormData.append("avatar", file, file.name);
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            this.channelAvatar = imageUrl;
        }
    };

    createChannelAvatar = async () => {
        const config = {
            headers: {
                "Content-Type": "image/png",
            },
        };
        runInAction(() => {
            this.channelAvatarLoading = true;
        });
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

    delateChannel = async (hashId: string) => {
        await this.delateChannelOperation.run(() =>
            APIs.channels.deleteChannel(hashId)
        );
        if (this.delateChannelOperation.isSuccess) {
            message.success("The channel is deleted succefully!");
            this.getMyChannels();
        }
    };

    addUserToChannel = async (hashId: string, friendId: number) => {
        await this.addUserToChannelOperation.run(() =>
            APIs.channels.addUsersToChannel(hashId, [friendId])
        );
        if (this.addUserToChannelOperation.isSuccess) {
            this.getChannelUsersData.push(
                this.rootStore.friendsStore.usersListForAdd.find(
                    (e) => e.id === friendId
                ) as never
            );
            this.rootStore.friendsStore.usersListForAdd =
                this.rootStore.friendsStore.friends.map((users) => ({
                    ...users,
                    isAdded: this.getChannelUsersData.some(
                        (e) => e.id === users.id
                    ),
                }));
        }
    };

    delateUserFromChannel = async (hashId: string, userId: number) => {
        await this.delateUserFromChannelOperation.run(() =>
            APIs.channels.deleteUsersFromChannel(hashId, userId)
        );
        if (this.delateUserFromChannelOperation.isSuccess) {
            this.getChannelUsersData = this.getChannelUsersData.filter(
                (u) => u.id !== userId
            ) as never;
            message.success("delated user form channel");
        }
    };

    getChannelBlockedUsers = async (hashId: string) => {
        await this.getChannelBlockedUsersOperation.run(() =>
            APIs.channels.getBlockedUsers(hashId)
        );
        if (this.getChannelBlockedUsersOperation.isSuccess) {
            this.getBlockedUser = this.getChannelBlockedUsersOperation.data;
        }
    };

    blockUser = async (hashId: string, userId: number) => {
        await this.blockUserOperation.run(() =>
            APIs.channels.blockUser(hashId, userId)
        );
        if (this.blockUserOperation.isSuccess) {
            this.getChannelBlockedUsers(hashId);
            message.success("this user blocked");
        }
    };

    unblockUser = async (hashId: string, userId: number) => {
        await this.unblockUserOperation.run(() =>
            APIs.channels.unblockUser(hashId, userId)
        );
        if (this.unblockUserOperation.isSuccess) {
            this.getBlockedUser = Object.values(this.getBlockedUser)?.filter(
                (e) => e.id !== userId
            ) as never;
            message.success("this user unblocked");
        }
    };

    newAdmin = async (hashId: string, userId: number) => {
        await this.newAdminOperation.run(() =>
            APIs.channels.setNewAdmin(hashId, userId)
        );
        if (this.newAdminOperation.isSuccess) {
            this.adminId = userId;
            this.getChannelUsers(hashId);
            message.success("new admin");
        }
    };
}
