import { channels } from './../store/dataBase';
import { CheckOAuthData, RegisterData, Session } from "../types/auth";
import { User } from "../types/user";
import ApiService from "./services/ApiService";
import { Channel, SetUpdataChanelType } from '../types/channel';


export type LoginEmailWithPasswordReqData={
    email: string;
    password: string;
}

const url = "auth";
const checkUserNameUrl = `${url}/verify/username/`;
const checkUserEmailUrl = `${url}/verify/email/`;
const checOAuthUrl = `${url}/verify/oauth2`;
const friends = "friends"
const users = "/users"

const accountUrl = "/users";
const authUrl = "/auth";

const channelUrl = "channel";
const channelsUrl = "channels";
const usersUrl = "users";

const apiService = new ApiService();

const APIs = {
    login: (data: LoginEmailWithPasswordReqData) => apiService.methods.post<Session>(`${url}/login`, data),
    checkUserName: (username: string) => apiService.methods.get<boolean>(`${checkUserNameUrl}${username}`),
    checkEmail: (email: string) => apiService.methods.get<boolean>(`${checkUserEmailUrl}${email}`),
    checkOauth: (data: CheckOAuthData) => apiService.methods.post<boolean>(`${checOAuthUrl}`, data),
    register: (data: RegisterData) => apiService.methods.post<Session>(`${url}/register`, data),
    logout: (refreshToken: string) => apiService.methods.post(`${url}/logout`, { refreshToken }),
    refreshToken: (refreshToken: string) => apiService.methods.post<{ accessToken: string }>(`/token/refresh`, { refreshToken }),
    
    Account: {
        getMyAccount: () => apiService.methods.get<User>(`${accountUrl}/me`),
        updateAccount: (user: Partial<User>) => {
            const data = new FormData();
            Object.keys(user).forEach((key) => {
                data.append(key, user[key as keyof User]);
            });
            return apiService.methods.put(`${accountUrl}/me`, data);
        },

        delateMyAvatar: () => apiService.methods.delete<User>(`${accountUrl}/me/avatar`),

        usersMeAvatar: (data: FormData) => {
            return apiService.methods.post(`${accountUrl}/me/avatar`, data, {
                headers: {
                    Accept: "application/json",
                    ContentType: "multipart/form-data",
                },
            });
        },

        resetPass: (email: string) => {
            return apiService.methods.patch(`${authUrl}/password/reset`, { email });
        },

        delateAccount: (userId: number) => {
            return apiService.methods.delete(`${accountUrl}/${userId}`);
        },
    },
    
    Friends: {
        getfriends: () => apiService.methods.get<User[]>(`${friends}/get`),

        deleteFriend: (friendId: number) => apiService.methods.delete(`${friends}/delete/${friendId}`),

        createFriend: (friendId: number) => apiService.methods.post(`${friends}/create`, {friendId})
    },

    Users: {
        getAllUsers: () => apiService.methods.get<User[]>(`${users}/nonfriends`),

        getFriendDetails: (friendId: number) => apiService.methods.get(`${users}/get/${friendId}`)
    },
    channels: {
        getChannel: (hashId: string) =>
            apiService.methods.get<Channel>(`${channelUrl}/hash/${hashId}`),

        getMyChannels: () => apiService.methods.get<Channel[]>(`${usersUrl}/${channelsUrl}`),

        getAllChannels: () =>
            apiService.methods.get<(Omit<Channel, "users"> & { users?: User[] })[]>(
                `${channelUrl}/all`
            ),
        createChannel: (name: string, description: string, color: string) =>
            apiService.methods.post<Channel>(`${channelUrl}`, {
                name,
                description,
                color,
            }),
        createChannelWithName: (name: string, isPrivate: boolean) =>
            apiService.methods.post<Channel>(`${channelUrl}`, { name, isPrivate }),

        createChannelAvatar: (hashId: string, data: any) => {
            return apiService.methods.post(`${channelUrl}/${hashId}/avatar`, data, {
                headers: {
                    Accept: "application/json",
                    ContentType: "multipart/form-data",
                },
            });
        },
        connectToChannel: (channelNumber: string) =>
            apiService.methods.get<Channel>(`${channelUrl}/${channelNumber}`),

        connectWithInviteCode: (channelNumber: string, inviteCode: string) =>
            apiService.methods.post<Channel>(`${channelUrl}/${channelNumber}`, { inviteCode }),

        joinChannel: (channelId: number) =>
            apiService.methods.post<{ user: User; channel: Channel }>(
                `${usersUrl}${channelUrl}/join`,
                {
                    channelId,
                }
            ),
        leaveChannel: (channelId: number) =>
            apiService.methods.post(`${usersUrl}${channelUrl}/leave`, { channelId }),

        getChannelByHashId: (hashId: string) =>
            apiService.methods.get<Channel>(`${channelUrl}/hash/${hashId}`),

        getChannelByUserHashId: (hashId: string) =>
            apiService.methods.get<Channel>(`${channelUrl}/${hashId}/users`),

        updateChannel: (channelhashId: string, data: SetUpdataChanelType) => {
            apiService.methods.patch(`${channelUrl}/hash/${channelhashId}`, data);
        },

        updateRelevance: (data: any) => {
            apiService.methods.post(`/relevance/channel/judgement`, data);
        },

        generateNewInviteCode: (channelNumber: string, onlyQr?: string) =>
            apiService.methods.get<{ inviteCode: string; qrCode: string }>(
                `${channelUrl}/${channelNumber}/generate-invite-code${onlyQr || ""}`
            ),

        addUsersToChannel: (channelHashId: string, users: number[]) =>
            apiService.methods.post(`${channelUrl}/${channelHashId}/users`, { users }),

        deleteUsersFromChannel: (channelHashId: string, userId: number) =>
            apiService.methods.delete(`${channelUrl}/${channelHashId}/users/${userId}`),

        delateChannelAvatar: (channelhashId: string) => {
            apiService.methods.delete(`${channelUrl}/${channelhashId}/avatar`);
        },

        deleteChannel: (channelHashId: string) =>
            apiService.methods.delete(`${channelUrl}/hash/${channelHashId}`),

        setNewAdmin: (hashId: string, userId: number) => {
            return apiService.methods.post(`/channel/${hashId}/change-admin`, {
                newAdminId: userId,
            });
        },

        getBlockedUsers: (hashId: string) =>
            apiService.methods.get(`${channelUrl}/${hashId}/blocked-users`),

        blockUser: (hashId: string, userId: number) =>
            apiService.methods.post(`${channelUrl}/${hashId}/block`, { userId }),

        unblockUser: (hashId: string, userId: number) =>
            apiService.methods.post(`${channelUrl}/${hashId}/unblock`, { userId }),

        getPollDetails: (pollId: number, includeVotedUsers?: boolean) =>
            apiService.methods.get(`/poll/${pollId}?includeVotedUsers=${includeVotedUsers}`),

        getPollOptionInfo: (pollOptionId: number) =>
            apiService.methods.get(`/poll/option/${pollOptionId}`),
    }
}

export default APIs;
