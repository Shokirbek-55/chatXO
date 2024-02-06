import { message } from "antd";
import { makeAutoObservable, runInAction } from "mobx";
import APIs, { LoginEmailWithPasswordReqData } from "../../api/api";
import { Session } from "../../types/auth";
import { User } from "../../types/user";
import { Operation } from "../../utils/Operation";
import { AppRootStore } from "../store";

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
    loginOAuthOperation = new Operation<Session['data']>({} as Session['data']);
    deleteUserOperation = new Operation<{ userId: number }>(
        {} as { userId: number }
    );
    resetPassOperation = new Operation<{ email: string }>(
        {} as { email: string }
    );

    navigateAuth: () => void = () => { };

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
            this.root.localStore.setToken(this.loginOperation.data.data);
            await this.getMeOperation.run(() => APIs.Account.getMyAccount());
            if (this.getMeOperation.data && this.getMeOperation.isSuccess) {
                runInAction(() => {
                    this.user = this.getMeOperation.data;
                });
                this.root.runFunctionsWithLogin();
            }
        }
        if (this.loginOperation.isError) {
            message.error(`${this.loginOperation.error}`);
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
            this.root.localStore.setToken(this.registerOperation.data.data);
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
            this.root.localStore.setToken(this.registerOperation.data.data);
        }
    };

    refreshToken = async (refreshToken: string) => {
        await this.refreshTokenOperation.run(() =>
            APIs.refreshToken(refreshToken)
        );

        if (this.refreshTokenOperation.data) {
            this.root.localStore.setToken(this.refreshTokenOperation.data.data);
        }
    };

    logout = async (callabck: () => void) => {
        console.log(this.root.localStore.session.refreshToken);
        runInAction(() => {
            this.navigateAuth = callabck;
        });
        await this.logoutOperation.run(() =>
            APIs.logout(this.root.localStore.session.refreshToken)
        );
        if (this.logoutOperation.data) {
            runInAction(() => {
                this.root.localStore.removeToken();
                this.root.socketStore.disconnect();
                this.root.routerStore.routers = [];
                this.root.channelStore.myChannels = [];
                this.navigateAuth();
                message.success("Logout");
            });
        }
    };

    resetPass = async (email: string, callback: () => void) => {
        runInAction(() => {
            this.navigateAuth = callback;
        });
        await this.resetPassOperation.run(() => {
            APIs.resetPass(email);
        });
        runInAction(() => {
            if (this.resetPassOperation.isSuccess) {
                message.success(`The new password has been sent to ${email}`);
            } else {
                message.success(`${this.resetPassOperation.isError}`);
            }
            this.navigateAuth();
            if (this.resetPassOperation.isError) {
                message.error(`${this.resetPassOperation.error}`);
            }
        });
    };

    deleteUser = async (userId: number) => {
        await this.deleteUserOperation.run(() => {
            APIs.Account.delateAccount(userId);
        });
        if (this.deleteUserOperation.isSuccess) {
            console.log("delete user success");
        }
    };
}
