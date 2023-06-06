import { makeAutoObservable } from "mobx";
import APIs, { LoginEmailWithPasswordReqData } from "../../api/api";
import { Session } from "../../types/auth";
import { Operation } from "../../utils/Operation";
import { AppRootStore } from "../store";

export default class LoginStore {

    root: AppRootStore

    constructor(root: AppRootStore) {
        makeAutoObservable(this);
        this.root = root
    }

    loginOperation = new Operation<Session>({} as Session)
    chekUserNameOperation = new Operation<boolean>(false)
    checkEmailOperation = new Operation<boolean>(false)
    registerOperation = new Operation<Session>({} as Session)
    refreshTokenOperation = new Operation<Session>({} as Session)
    logoutOperation = new Operation<any>({} as any)

    loginEmailWithPassword = async (data: LoginEmailWithPasswordReqData) => {
        await this.loginOperation.run(() => APIs.login(data))

        if (this.loginOperation.data) {
            this.root.localStore.setToken(this.loginOperation.data)
        }
    }

    checkUserName = async (username: string) => {
        await this.chekUserNameOperation.run(() => APIs.checkUserName(username))
    }

    checkEmail = async (email: string) => {
        await this.checkEmailOperation.run(() => APIs.checkEmail(email))
    }

    register = async (data: any) => {
        await this.registerOperation.run(() => APIs.register(data))

        if (this.registerOperation.data) {
            this.root.localStore.setToken(this.registerOperation.data)
        }
    }

    refreshToken = async (refreshToken: string) => {
        await this.refreshTokenOperation.run(() => APIs.refreshToken(refreshToken))

        if (this.refreshTokenOperation.data) {
            this.root.localStore.setToken(this.refreshTokenOperation.data)
        }
    }

    logout = async () => {
        console.log(this.root.localStore.session.refreshToken);        
        await this.logoutOperation.run(() => APIs.logout(this.root.localStore.session.refreshToken))
        this.root.localStore.removeToken()
    }

}