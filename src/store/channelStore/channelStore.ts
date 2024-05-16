import { message } from 'antd';
import { action, makeAutoObservable, runInAction, toJS } from 'mobx';
import APIs from '../../api/api';
import {
    Channel,
    ChannelInitialState,
    ChannelsUsersInitial,
    ChannelsUsersType,
    CreateChannelType,
    RawMessage,
    SetUpdataChanelType,
    generateInviteCodeType,
    relevanceDataInitial,
    relevanceDataType,
} from '../../types/channel';
import { User } from '../../types/user';
import { Operation } from '../../utils/Operation';
import { AppRootStore } from '../store';
import { throttle } from 'lodash';

export type CropAvatarStateType = {
    img: string;
    type: 'crateChannel' | 'updataChannel' | 'profile';
};

const CropAvatarStateInitial: CropAvatarStateType = {
    img: '',
    type: 'crateChannel',
};

const CreateChannelInitialState: CreateChannelType = {
    name: '',
    description: '',
    color: '',
    avatar: '',
    isPrivate: false,
};

type createChannelResponseType = {
    success: boolean;
    data: Channel;
};

  type selectedChannelType = {
    id: number;
    hashId: string;
    slug: string;
};

export default class ChannelStore {
    rootStore: AppRootStore;

    constructor(rootStore: AppRootStore) {
        makeAutoObservable(this, {
            upsert: action,
        });
        this.rootStore = rootStore;
    }

    channelByHashId = new Map<string, Channel>();
    channelUsersByHashId = new Map<string, User[]>();
    hashIdQueue = new Set<string>();

    getChannelOperation = new Operation<Channel[]>([]);
    createChannelOperation = new Operation<createChannelResponseType>({} as createChannelResponseType);
    updateChannelOperation = new Operation<Channel>({} as Channel);
    getChannelByHashIdOperation = new Operation<Channel>({} as Channel);
    generateNewInvitationCodeOperation = new Operation<generateInviteCodeType>({} as generateInviteCodeType);
    delateChannelOperation = new Operation<{ hashId: string }>({} as { hashId: string });
    createChannelAvatarOperation = new Operation<{
        hashId: string;
        formData: FormData;
    }>({} as { hashId: string; formData: FormData });
    deleteChannelAvatarOperation = new Operation<{
        hashId: string;
    }>({} as { hashId: string });
    addUserToChannelOperation = new Operation<{ friendId: number }>({} as { friendId: number });
    delateUserFromChannelOperation = new Operation<Channel>({} as Channel);
    getChannelBlockedUsersOperation = new Operation<User>({} as User);
    blockUserOperation = new Operation<User>({} as User);
    newAdminOperation = new Operation<User>({} as User);
    unblockUserOperation = new Operation<User>({} as User);
    getChannelUsersOperation = new Operation<User>([] as unknown as User);
    updateMemberRelevanceOperation = new Operation<ChannelsUsersType>({} as ChannelsUsersType);

    myChannels: Channel[] = [];

    channelData: Channel = ChannelInitialState;
    selectedChannelData: selectedChannelType = {
        id: 0,
        hashId: '',
        slug: '',
    };

    channelAvatar: string = '';
    createAvatar: string = '';
    cropAvatarState: CropAvatarStateType = CropAvatarStateInitial;
    channelAvatarLoading: boolean = false;

    setUpdataChannel: SetUpdataChanelType = {} as SetUpdataChanelType;

    setCreateChannelData: CreateChannelType = CreateChannelInitialState;

    getChannelUsersData: ChannelsUsersType[] = [];

    channelUsers: ChannelsUsersType[] = [];

    adminId: number = 0;

    hashId: string = '';
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

    private processQueue = throttle(async () => {
        if (!this.hashIdQueue.size) {
            return;
        }
        const hashIds = Array.from(this.hashIdQueue);

        for (const hashId of hashIds) {
            const [channelInfo, channelUsers] = await Promise.all([
                APIs.channels.getChannelByHashId(hashId),
                APIs.channels.getChannelUsers(hashId),
            ]);
            this.rootStore.messageStore.getHistoryMessages(channelInfo.data.slug);
            this.upsert(hashId, channelInfo.data, channelUsers.data);
            this.hashIdQueue.delete(hashId);
        }

        if (this.hashIdQueue.size) {
            this.processQueue();
        }
    }, 500);

    private get(channelHashId: string) {
        this.hashIdQueue.add(channelHashId);
        this.processQueue();
    }

    upsert(channelHashId: string, ChannelInfo: Channel, channelUsers: User[]) {
        let channelBox = this.channelByHashId.get(channelHashId);

        this.channelUsersByHashId.set(channelHashId, channelUsers);
        if (channelBox) {
            const channel = Object.assign(channelBox, ChannelInfo);
            this.channelByHashId.set(channelHashId, channel);
            return;
        }
        this.channelByHashId.set(channelHashId, ChannelInitialState);
    }

    get getSelectedChannelData() {
        return this.channelByHashId.get(this.selectedChannelData.hashId) || ChannelInitialState;
    }

    handelSelectedChannel = (data: selectedChannelType) => {
        this.selectedChannelData = data;
        this.get(data.hashId);
    };

    channelsSort = () => {
        this.myChannels = this.myChannels.sort((a, b) => {
            return Number(new Date(b.lastMessageTimestamp)) - Number(new Date(a.lastMessageTimestamp));
        });
    };

    setRelevanceChange = (value: number) => {
        this.relevanceData.relevance = value;
    };

    getOneMember = (id: number) => {
        runInAction(() => {
            this.rootStore.visibleStore.show('RelevenceModal');
            this.memberRelevence = this.channelUsers.find(item => item.id === id) as never;
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
        await this.updateMemberRelevanceOperation.run(() => APIs.channels.updateRelevance(data));
        if (this.updateMemberRelevanceOperation.isSuccess) {
            this.memberRelevence.relevance = data?.relevance;
            message.success(`update ${this.memberRelevence?.username} relevance successfully`);
        }
        if (this.updateMemberRelevanceOperation.isError) {
            message.error(`update ${this.memberRelevence?.username} relevance Error`);
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
                this.channelsSort();
                this.channelsLoading = false;
            });
            this.getChannelDataCache();
            this.rootStore.chatStore.unreadMessages();
        }
    };

    getChannelByHashId = async (hashId: string) => {
        this.rootStore.hashtagStore.setHashId(hashId);
        runInAction(() => {
            this.isLoad = true;
        });
        await this.getChannelByHashIdOperation.run(() => APIs.channels.getChannelByHashId(hashId));
        await this.getChannelUsers(hashId);
        if (this.getChannelByHashIdOperation.isSuccess) {
            runInAction(() => {
                this.channelData = this.getChannelByHashIdOperation.data;
                this.getChannelUsersData = this.getChannelByHashIdOperation.data.users as never;
                this.adminId = this.getChannelByHashIdOperation.data.adminId;

                this.rootStore.messageStore.getHistoryMessages(this.getChannelByHashIdOperation.data.slug);
                this.rootStore.chatStore.openChannel(this.rootStore.messageStore.slug);
                this.setUpdataChannel = {
                    name: this.channelData.name,
                    isPrivate: this.channelData.isPrivate,
                    color: this.channelData.color || '',
                    avatar: this.channelData.avatar || '',
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
            const isHas = this.myChannels.some(channel => {
                if (channel.hashId === this.hashId) {
                    this.rootStore.messageStore.getHistoryMessages(channel.slug);
                    this.getChannelByHashId(this.hashId);
                    this.selectedChannelData = {
                        id: channel.id,
                        hashId: channel.hashId,
                        slug: channel.slug,
                    }
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
                    this.rootStore.usersStore.connectChannelData.channelInviteCode as never,
                    () => callback,
                );
            }
        }
    };

    getChannelDataCache = async () => {
        try {
            await Promise.all(
                this.myChannels.map(async channel => {
                    this.get(channel.hashId);
                    const [channelUsersData, channelData] = await Promise.all([
                        this.getChannelUsersOperation.run(() => APIs.channels.getChannelUsers(channel.hashId)),
                        this.getChannelByHashIdOperation.run(() => APIs.channels.getChannelByHashId(channel.hashId)),
                    ]);

                    if (this.getChannelByHashIdOperation.isSuccess) {
                        const channelSlug = this.getChannelByHashIdOperation.data.slug;
                        this.rootStore.messageStore.setChannelDataCache(channelSlug, channelData.data);
                        this.rootStore.messageStore.getHistoryMessages(channelSlug);
                    }

                    if (this.getChannelUsersOperation.isSuccess) {
                        this.rootStore.messageStore.setChannelUsersCache(channel.slug, channelUsersData.data);
                    }
                }),
            );

            this.getHashId();
        } catch (error) {
            console.log('Error:', error);
        }
    };

    getChannelUsers = async (hashId: string) => {
        await this.getChannelUsersOperation.run(() => APIs.channels.getChannelUsers(hashId));
        runInAction(() => {
            if (this.getChannelUsersOperation.isSuccess) {
                this.channelUsers = Object.values(this.getChannelUsersOperation.data);
                this.channelUsers = this.channelUsers.map(users => ({
                    ...users,
                    isFriend: this.rootStore.friendsStore.friends.some(e => e.id === users.id),
                }));
            }
        });
    };

    setSearchChannels = (text: string) => {
        runInAction(() => {
            this.myChannels = this.getChannelOperation.data.filter(channel =>
                channel.name?.toLowerCase().includes(text.toLowerCase()),
            );
        });
    };
    setSearchChannelUsers = (text: string) => {
        runInAction(() => {
            this.channelUsers = Object.values(this.getChannelUsersOperation.data).filter(user =>
                user.username?.toLowerCase().includes(text.toLowerCase()),
            );
            this.channelUsers = this.channelUsers.map(users => ({
                ...users,
                isFriend: this.rootStore.friendsStore.friends.some(e => e.id === users.id),
            }));
        });
    };

    setCreateChannelState = (key: keyof CreateChannelType, value: any) => {
        this.setCreateChannelData[key] = value;
    };

    createChannel = async (callback: (e: string) => void) => {
        let formData = new FormData();
        Object.keys(this.setCreateChannelData).forEach(key => {
            formData.append(key, this.setCreateChannelData[key]);
        });
        await this.createChannelOperation.run(() => APIs.channels.createChannel(formData));
        if (this.createChannelOperation.data.success) {
            runInAction(() => {
                this.myChannels.push(this.createChannelOperation.data.data);
                this.rootStore.messageStore.setChannelSlug(this.createChannelOperation.data.data.slug);
                this.getChannelByHashId(this.createChannelOperation.data.data.hashId);
                this.rootStore.routerStore.setCurrentRoute('channels');
                callback(this.createChannelOperation.data.data.slug);
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
        await this.updateChannelOperation.run(() => APIs.channels.updateChannel(this.channelData.hashId, channel));
        runInAction(() => {
            if (this.updateChannelOperation.isSuccess) {
                runInAction(() => {
                    this.getMyChannels();
                });
            }
        });
    };

    generateNewInvitationCode = async (groupNumber: string, callBack: (e: string) => void) => {
        await this.generateNewInvitationCodeOperation.run(() => APIs.channels.generateNewInviteCode(groupNumber));
        runInAction(() => {
            if (this.generateNewInvitationCodeOperation.isSuccess) {
                this.channelData.invitationCodes[0].code = this.generateNewInvitationCodeOperation.data.inviteCode;
                this.hashId = this.generateNewInvitationCodeOperation.data.hashId;
                this.getChannelByHashId(this.generateNewInvitationCodeOperation.data.hashId);
                callBack(this.generateNewInvitationCodeOperation.data.hashId);
            }
        });
    };

    setCropAvatarState = async (file: File, type: 'crateChannel' | 'updataChannel' | 'profile') => {
        const imageUrl = URL.createObjectURL(file);
        runInAction(() => {
            this.cropAvatarState = {
                img: imageUrl,
                type,
            };
        });
    };

    onSelectChannelImage = async (file: File) => {
        if (file) {
            runInAction(() => {
                const imageUrl = URL.createObjectURL(file);
                this.channelAvatar = imageUrl;
            });
        }
    };

    onCreateChannelImage = (file: File) => {
        this.setCreateChannelData['avatar'] = file;
        const imageUrl = URL.createObjectURL(file);
        runInAction(() => {
            this.createAvatar = imageUrl;
        });
    };

    closeSelectImage = () => {
        runInAction(() => {
            this.channelAvatar = '';
            this.createAvatar = '';
            this.chFormData = new FormData();
            this.rootStore.visibleStore.hide('chUploadFile');
        });
    };

    createChannelAvatar = async (file: File) => {
        const config = {
            headers: {
                'Content-Type': 'image/png',
            },
        };
        runInAction(() => {
            this.channelAvatarLoading = true;
        });
        this.chFormData.append('avatar', file);
        await this.createChannelAvatarOperation.run(() =>
            APIs.channels.createChannelAvatar(this.channelData.hashId, this.chFormData, config),
        );
        runInAction(() => {
            if (this.createChannelAvatarOperation.isSuccess) {
                this.setUpdateChannelState('avatar', Object.values(this.createChannelAvatarOperation.data).toString());
                this.channelAvatar = '';
                this.chFormData = new FormData();
                this.channelAvatarLoading = false;
                message.success('created avatar successfully');
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
                this.setUpdateChannelState('avatar', '');
            });
        }
    };

    delateChannel = async (hashId: string, callback: () => void) => {
        await this.delateChannelOperation.run(() => APIs.channels.deleteChannel(hashId));
        runInAction(() => {
            if (this.delateChannelOperation.isSuccess) {
                message.success('The channel is deleted succefully!');
                this.myChannels = this.myChannels.filter(ch => ch.hashId !== hashId);
                this.hashId = '';
                callback();
            }
        });
    };

    addUserToChannel = async (hashId: string, friendId: number) => {
        await this.addUserToChannelOperation.run(() => APIs.channels.addUsersToChannel(hashId, [friendId]));
        if (this.addUserToChannelOperation.isSuccess) {
            runInAction(() => {
                this.rootStore.chatStore.join(this.rootStore.messageStore.slug);
                this.channelUsers.push(
                    this.rootStore.friendsStore.usersListForAdd.find(e => e.id === friendId) as never,
                );
                this.rootStore.friendsStore.usersListForAdd = this.rootStore.friendsStore.friends.map(users => ({
                    ...users,
                    isAdded: this.channelUsers.some(e => e.id === users.id),
                }));
            });
        }
    };

    filterAddUser = (id: any) => {
        runInAction(() => {
            this.channelUsers.push(this.rootStore.friendsStore.usersListForAdd.find(e => e.id === id) as never);
        });
    };

    delateUserFromChannel = async (hashId: string, userId: number) => {
        await this.delateUserFromChannelOperation.run(() => APIs.channels.deleteUsersFromChannel(hashId, userId));
        runInAction(() => {
            if (this.delateUserFromChannelOperation.isSuccess) {
                this.channelUsers = this.channelUsers.filter(u => u.id !== userId) as never;
                message.success('delated user form channel');
            }
        });
    };

    filterLeftUser = (userId: any) => {
        runInAction(() => {
            this.channelUsers = this.channelUsers.filter(u => u.id !== userId) as never;
        });
    };

    getChannelBlockedUsers = async (hashId: string) => {
        await this.getChannelBlockedUsersOperation.run(() => APIs.channels.getBlockedUsers(hashId));
        runInAction(() => {
            if (this.getChannelBlockedUsersOperation.isSuccess) {
                this.getBlockedUser = this.getChannelBlockedUsersOperation.data;
            }
        });
    };

    blockUser = async (hashId: string, userId: number) => {
        await this.blockUserOperation.run(() => APIs.channels.blockUser(hashId, userId));
        runInAction(() => {
            if (this.blockUserOperation.isSuccess) {
                this.getChannelBlockedUsers(hashId);
                message.success('this user blocked');
            }
        });
    };

    unblockUser = async (hashId: string, userId: number) => {
        await this.unblockUserOperation.run(() => APIs.channels.unblockUser(hashId, userId));
        runInAction(() => {
            if (this.unblockUserOperation.isSuccess) {
                this.getBlockedUser = Object.values(this.getBlockedUser)?.filter(e => e.id !== userId) as never;
                message.success('this user unblocked');
            }
        });
    };

    newAdmin = async (hashId: string, userId: number) => {
        await this.newAdminOperation.run(() => APIs.channels.setNewAdmin(hashId, userId));
        runInAction(() => {
            if (this.newAdminOperation.isSuccess) {
                this.adminId = userId;
                this.getChannelUsers(hashId);
                message.success('new admin');
            }
        });
    };

    updateUnreadMessages = (slug: string, count: number) => {
        this.myChannels = this.myChannels.map(channel => {
            if (channel.slug === slug) {
                channel.unreadMessage = count;
            }
            return channel;
        });
    };
}
