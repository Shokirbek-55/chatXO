import { CheckOAuthData, RegisterData, Session } from "../types/auth";
import { User } from "../types/user";
import ApiService from "./services/ApiService";


export type LoginEmailWithPasswordReqData={
    email: string;
    password: string;
}

const url = "auth";
const checkUserNameUrl = `${url}/verify/username/`;
const checkUserEmailUrl = `${url}/verify/email/`;
const checOAuthUrl = `${url}/verify/oauth2`;

const accountUrl = "/users";
const authUrl = "/auth";

const apiService = new ApiService();

const APIs = {
    login: (data: LoginEmailWithPasswordReqData) => apiService.methods.post<Session>(`${url}/login`, data),
    checkUserName: (username: string) => apiService.methods.get<boolean>(`${checkUserNameUrl}${username}`),
    checkEmail: (email: string) => apiService.methods.get<boolean>(`${checkUserEmailUrl}${email}`),
    checkOauth: (data: CheckOAuthData) => apiService.methods.post<boolean>(`${checOAuthUrl}`, data),
    register: (data: RegisterData) => apiService.methods.post<Session>(`${url}/register`, data),
    logout: (refreshToken: string) => apiService.methods.post(`${url}/logout`, { refreshToken }),
    refreshToken: (refreshToken: string) => apiService.methods.post<{ accessToken: string }>(`/token/refresh`, { refreshToken }),
    
    acount: {
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
    }
}

export default APIs;
