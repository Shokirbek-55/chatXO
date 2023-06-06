import { CheckOAuthData, RegisterData, Session } from "../types/auth";
import ApiService from "./services/ApiService";


export type LoginEmailWithPasswordReqData={
    email: string;
    password: string;
}

const url = "auth";
const checkUserNameUrl = `${url}/verify/username/`;
const checkUserEmailUrl = `${url}/verify/email/`;
const checOAuthUrl = `${url}/verify/oauth2`;

const APIs = {
    login: (data: LoginEmailWithPasswordReqData) => ApiService.post<Session>(`${url}/login`, data),
    checkUserName: (username: string) => ApiService.get<boolean>(`${checkUserNameUrl}${username}`),
    checkEmail: (email: string) => ApiService.get<boolean>(`${checkUserEmailUrl}${email}`),
    checkOauth: (data: CheckOAuthData) => ApiService.post<boolean>(`${checOAuthUrl}`, data),
    register: (data: RegisterData) => ApiService.post<Session>(`${url}/register`, data),
    logout: (refreshToken: string) => ApiService.post(`${url}/logout`, { refreshToken }),
    refreshToken: (refreshToken: string) => ApiService.post<{ accessToken: string }>(`/token/refresh`, { refreshToken }),
}

export default APIs;
