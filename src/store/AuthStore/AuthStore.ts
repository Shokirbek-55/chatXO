import { makeAutoObservable, runInAction } from "mobx";
import APIs, { LoginEmailWithPasswordReqData } from "../../api/api";
import { Session } from "../../types/auth";
import { Operation } from "../../utils/Operation";
import { AppRootStore } from "../store";
import { User } from "../../types/user";
import { message } from "antd";

export type LoginOAuth2Payload = {
    authType: "googleToken" | "facebookToken";
    email: string | null;
    oAuth2token: string;
    userName: string | null;
};
export default class AuthStore {
    root: AppRootStore;
    user: User = {} as User;

    constructor(root: AppRootStore) {
        makeAutoObservable(this);
        this.root = root;
    }

    loginOperation = new Operation<Session>({} as Session);
    chekUserNameOperation = new Operation<boolean>(false);
    checkEmailOperation = new Operation<boolean>(false);
    registerOperation = new Operation<Session>({} as Session);
    refreshTokenOperation = new Operation<Session>({} as Session);
    logoutOperation = new Operation<any>({} as any);
    getMeOperation = new Operation<User>({} as User);
    loginOAuthOperation = new Operation<Session>({} as Session);

    isLoginLoading: boolean = false;
    isGetMeLoading: boolean = false;

    getMe = async () => {
        runInAction(() => {
            this.isGetMeLoading = true;
        });
        if (!this.root.localStore.session.accessToken) return;
        await this.getMeOperation.run(() => APIs.Account.getMyAccount());
        if (this.getMeOperation.data && this.getMeOperation.isSuccess) {
            this.root.socketStore.connect(this.getMeOperation.data);
            runInAction(() => {
                this.user = this.getMeOperation.data;
            });
            this.root.usersStore.myDataToSetData(this.user);
        }
        runInAction(() => {
            this.isGetMeLoading = false;
        });
    };

    loginEmailWithPassword = async (data: LoginEmailWithPasswordReqData) => {
        await this.loginOperation.run(() => APIs.login(data));
        if (this.loginOperation.data && this.loginOperation.isSuccess) {
            this.root.localStore.setToken(this.loginOperation.data);
            await this.getMeOperation.run(() => APIs.Account.getMyAccount());
            if (this.getMeOperation.data && this.getMeOperation.isSuccess) {
                runInAction(() => {
                    this.user = this.getMeOperation.data;
                });
                this.root.runFunctionsWithLogin();
            }
        }
    };

    loginOAuth2 = async (data: LoginOAuth2Payload) => {
        runInAction(() => {
            this.isLoginLoading = true;
        });
        await this.loginOAuthOperation.run(() => APIs.loginOAuth(data));
        if (
            this.loginOAuthOperation.data &&
            this.loginOAuthOperation.isSuccess
        ) {
            console.log("loginOAuthOperation", this.loginOAuthOperation.data);
            this.root.localStore.setToken(this.loginOAuthOperation.data);
            runInAction(() => {
                this.isLoginLoading = false;
            });
            await this.getMeOperation.run(() => APIs.Account.getMyAccount());
            if (this.getMeOperation.data && this.getMeOperation.isSuccess) {
                runInAction(() => {
                    this.user = this.getMeOperation.data;
                });
                this.root.runFunctionsWithLogin();
            }
        }
    };

    registerOAuth2 = async (data: LoginOAuth2Payload) => {
        runInAction(() => {
            this.isLoginLoading = true;
        });
        await this.registerOperation.run(() => APIs.registerOAuth(data));
        if (this.registerOperation.data && this.registerOperation.isSuccess) {
            this.root.localStore.setToken(this.registerOperation.data);
            runInAction(() => {
                this.isLoginLoading = false;
            });
            await this.getMeOperation.run(() => APIs.Account.getMyAccount());
            if (this.getMeOperation.data && this.getMeOperation.isSuccess) {
                runInAction(() => {
                    this.user = this.getMeOperation.data;
                });
                this.root.runFunctionsWithLogin();
            }
        }
    };

    checkUserName = async (username: string) => {
        await this.chekUserNameOperation.run(() =>
            APIs.checkUserName(username)
        );
    };

    checkEmail = async (email: string) => {
        await this.checkEmailOperation.run(() => APIs.checkEmail(email));
    };

    register = async (data: any) => {
        await this.registerOperation.run(() => APIs.register(data));
        if (this.registerOperation.data) {
            this.root.localStore.setToken(this.registerOperation.data);
        }
    };

    refreshToken = async (refreshToken: string) => {
        await this.refreshTokenOperation.run(() =>
            APIs.refreshToken(refreshToken)
        );

        if (this.refreshTokenOperation.data) {
            this.root.localStore.setToken(this.refreshTokenOperation.data);
        }
    };

    logout = async () => {
        console.log(this.root.localStore.session.refreshToken);
        await this.logoutOperation.run(() =>
            APIs.logout(this.root.localStore.session.refreshToken)
        );
        if (this.logoutOperation.data) {
            this.root.localStore.removeToken()
            this.root.socketStore.disconnect()
            this.root.routerStore.routers = []
            this.root.channelStore.myChannels = []
            message.success("Logout")
        }
    };
}
