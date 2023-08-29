import { channels } from "./../dataBase";
import { makeAutoObservable, runInAction, set } from "mobx";
import {
    MainRoutes,
    MainRoutesType,
    SideBarHelperRoutes,
    SideBarHelperRoutesType,
    mainRoutes,
    ManageHelperRoutes,
} from "./routers";
import _ from "lodash";

export default class RouterStore {
    constructor() {
        makeAutoObservable(this);
    }

    currentRoute: MainRoutesType = mainRoutes[0];
    routers: SideBarHelperRoutesType[] = [];
    manageRouters: SideBarHelperRoutesType[] = [
        ManageHelperRoutes["manageChannel"],
    ];

    isOpenRigthSideBar = "-340px";

    setCurrentRoute = (route: keyof typeof MainRoutes) => {
        this.currentRoute = mainRoutes.find(
            (item) => item.key === route
        ) as MainRoutesType;
    };

    toRouter = (route: keyof typeof SideBarHelperRoutes) => {
        runInAction(() => {
            this.routers.push(SideBarHelperRoutes[route]);
        });
        setTimeout(() => {
            runInAction(() => {
                _.last(this.routers)!.isOpen = true;
            });
        }, 100);
    };
    toRouterManageCh = (route: keyof typeof ManageHelperRoutes) => {
        runInAction(() => {
            this.manageRouters.push(ManageHelperRoutes[route]);
        });
        setTimeout(() => {
            runInAction(() => {
                _.last(this.manageRouters)!.isOpen = true;
            });
        }, 100);
    };

    closeModal = () => {
        runInAction(() => {
            if (this.routers.length) _.last(this.routers)!.isOpen = false;
            if (this.manageRouters.length > 1)
                _.last(this.manageRouters)!.isOpen = false;
            else if (this.manageRouters.length === 1) this.closeRightSideBar();
        });
        setTimeout(() => {
            runInAction(() => {
                this.routers.pop();
                if (this.manageRouters.length > 1) this.manageRouters.pop();
            });
        }, 300);
    };

    openRightSideBar = () => {
        this.isOpenRigthSideBar = "0px";
    };

    closeRightSideBar = () => {
        this.isOpenRigthSideBar = "-340px";
    };
}
