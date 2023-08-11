import { data } from './../dataBase';
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { message} from "antd";
import {
    Channel,
    CreateChannelType,
    generateInviteCodeInitialState,
    generateInviteCodeType,
    ChannelInitialState,
    SetUpdataChanelType,
    ChannelsUsersType
} from "../../types/channel";
import { Operation } from '../../utils/Operation';
import APIs from "../../api/api";
import { AppRootStore } from "../store";
import { Friend } from "../../types/friend";
import { User } from "../../types/user";
import { ChangeEvent } from "react";

export default class ChannelStore {

    rootStore: AppRootStore

    constructor(rootStore: AppRootStore) {
        makeAutoObservable(this)
        this.rootStore = rootStore
    }

    getChannelOperation = new Operation<Channel[]>([] as Channel[]);
    createChannelOperation = new Operation<Channel>({} as Channel);
    updateChannelOperation = new Operation<Channel>({} as Channel);
    getChannelByHashIdOperation = new Operation<Channel>({} as Channel);
    generateNewInvitationCodeOperation = new Operation<generateInviteCodeType>({} as generateInviteCodeType)
    delateChannelOperation = new Operation<{ hashId: string }>({} as { hashId: string })
    createChannelAvatarOperation = new Operation<{hashId: string, formData: FormData}>({} as {hashId: string, formData: FormData})
    addUserToChannelOperation = new Operation<{ friendId: number }>({} as { friendId: number })
    delateUserFromChannelOperation = new Operation<Channel>({} as Channel)
    getChannelBlockedUsersOperation = new Operation<User[]>([] as User[])
    blockUserOperation = new Operation<User>({} as User)
    getChannelUsersOperation = new Operation<any>({} as any)

    myChannels: Channel[] = []

    channelData: Channel = ChannelInitialState

    setUpdataChannel: SetUpdataChanelType = {}

    setCreateChannelData: CreateChannelType = {} as CreateChannelType

    getChannelUsersData: ChannelsUsersType[] = []

    channelUsers: {
        [key: string]: ChannelsUsersType
    } = {}

    getBlockedUser: User[] = []

    channelsLoading: boolean = false

    isLoad: boolean = false

    getMyChannels = async () => {
        runInAction(() => {
            this.channelsLoading = true
        })
        await this.getChannelOperation.run(() => APIs.channels.getMyChannels());
        if (this.getChannelOperation.isSuccess) {
                runInAction(() => {
                    this.myChannels = this.getChannelOperation.data;
                    this.channelsLoading = false
                });
            this.getChannelDataCache();
            }
    };

    getChannelByHashId = async (hashId: string) => {
        runInAction(() => {
            this.isLoad = true
        })
        await this.getChannelByHashIdOperation.run(() => APIs.channels.getChannelByHashId(hashId))
        await this.getChannelUsers(hashId)
        if (this.getChannelByHashIdOperation.isSuccess) {
            runInAction(() => {
                this.channelData = this.getChannelByHashIdOperation.data
                this.getChannelUsersData = this.getChannelByHashIdOperation.data.users as never
            })
            this.setUpdataChannel = {
                name: this.channelData.name,
                isPrivate: this.channelData.isPrivate,
                color: this.channelData.color || '',
            }
            runInAction(() => {
                this.isLoad = false
            })
        }
    }

    getChannelDataCache = async () => {
        try {
            const promises = this.myChannels.map(async (channel) => {
                const channelUsersData = await this.getChannelUsersOperation.run(() => APIs.channels.getChannelUsers(channel.hashId));
                const channelData = await this.getChannelByHashIdOperation.run(() => APIs.channels.getChannelByHashId(channel.hashId));
                if (this.getChannelByHashIdOperation.isSuccess) {
                    this.rootStore.messageStore.setChannelDataCache(channel.slug, channelData.data);
                }
                if (this.getChannelUsersOperation.isSuccess) {
                    this.rootStore.messageStore.setChannelUsersCache(channel.slug, channelUsersData.data);
                }
            });

            await Promise.all(promises);
        } catch (error) {
            console.log('Error:', error);
        }
    }


    getChannelUsers = async (hashId: string) => {
        await this.getChannelUsersOperation.run(() => APIs.channels.getChannelUsers(hashId))
        if (this.getChannelUsersOperation.isSuccess) {
            runInAction(() => {
                this.channelUsers = this.getChannelUsersOperation.data
            })
        }
    }

    setSearchChannels = (text:string) => {
        runInAction(() => {
            this.myChannels = this.getChannelOperation.data.filter(channel => channel.name?.toLowerCase().includes(text.toLowerCase()));
        })
    }

    createChannelDataToSetData = () => this.setCreateChannelData = {
        name: "",
        description: "",
        color: ""
    }

    setCreateChannelState = (key:keyof CreateChannelType, value:string) => {
        this.setCreateChannelData[key] = value
    }

    createChannel = async(data: CreateChannelType) => {
        await this.createChannelOperation.run(() => APIs.channels.createChannel(data.name, data.description, data.color))
        if (this.createChannelOperation.isSuccess) {
            runInAction(() => {
                this.channelData = this.createChannelOperation.data
                this.myChannels.push(this.channelData)
            })
        }
    }

    setUpdateChannelState = (key:keyof SetUpdataChanelType, value:any) => {
        this.channelData[key] = value as never
        this.setUpdataChannel[key] = value
    }

    updateChannel = async () => {
        await this.updateChannelOperation.run(() => APIs.channels.updateChannel(this.channelData.hashId,this.setUpdataChannel))
        if (this.updateChannelOperation.isSuccess) {
            this.getMyChannels()
            this.setUpdataChannel = {}
            runInAction(() => {
                message.success("Updated channel")
            })
        }
    }

    generateNewInvitationCode = async (groupNumber: string) => {
        await this.generateNewInvitationCodeOperation.run(() => APIs.channels.generateNewInviteCode(groupNumber))
        if (this.generateNewInvitationCodeOperation.isSuccess) {
            this.channelData.invitationCodes[0].code = this.generateNewInvitationCodeOperation.data.inviteCode
            this.getMyChannels()
        }
    }

    noInvitationCode = async () => {
    }

    createChannelAvatar = async (hashId: string, e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log("file", e.target.files);
        if (e.target.files?.length) {     
            
            let formData = new FormData();
            formData.append("avatar", e.target.files[0]);
            await this.createChannelAvatarOperation.run(() => APIs.channels.createChannelAvatar(hashId, formData))
        }
        if (this.createChannelAvatarOperation.isSuccess) {
            console.log("avatar", toJS(this.createChannelAvatarOperation.data));
            message.success("created avatar successfully")
            
        }
    }

    delateChannel = async (hashId: string) => {
        await this.delateChannelOperation.run(() => APIs.channels.deleteChannel(hashId))
        if (this.delateChannelOperation.isSuccess) {
            message.success("The channel  test  is deleted succefully!")
            this.getMyChannels()
        }
    }

    addUserToChannel = async (hashId: string, friendId:number) => {
        await this.addUserToChannelOperation.run(() => APIs.channels.addUsersToChannel(hashId, [friendId]))
        if (this.addUserToChannelOperation.isSuccess) {
            this.getChannelUsersData.push(this.rootStore.friendsStore.usersListForAdd.find((e) => e.id === friendId) as never)
            this.rootStore.friendsStore.usersListForAdd = this.rootStore.friendsStore.friends.map((users) => ({
                ...users,
                isAdded: this.getChannelUsersData.some((e) => e.id === users.id)
            }))
            console.log("usersListForAdd", toJS(this.getChannelUsersData))
        }
    }

    delateUserFromChannel =async (hashId:string, userId: number) => {
        await this.delateUserFromChannelOperation.run(() => APIs.channels.deleteUsersFromChannel(hashId, userId))
        if (this.delateUserFromChannelOperation.isSuccess) {
            this.getChannelUsersData =  this.getChannelUsersData.filter((u) => u.id !== userId)
            message.success("delated user form channel")
        }
    }

    getChannelBlockedUsers = async (hashId: string) => {
        await this.getChannelBlockedUsersOperation.run(() => APIs.channels.getBlockedUsers(hashId))
        if (this.getChannelBlockedUsersOperation.isSuccess) {
            this.getBlockedUser = this.getChannelBlockedUsersOperation.data
        }
    }

    blockUser = async (hashId: string, userId: number) => {
        await this.blockUserOperation.run(() => APIs.channels.blockUser(hashId, userId))
        if (this.blockUserOperation.isSuccess) {
            this.getChannelBlockedUsers(hashId)
            message.success("this user blocked")
        }
    }
}

