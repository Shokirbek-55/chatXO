import { makeAutoObservable, runInAction, set } from "mobx";
import { MainRoutes, MainRoutesType, SideBarHelperRoutes, SideBarHelperRoutesType, mainRoutes } from "./routers";
import _ from 'lodash';


export default class RouterStore {
    constructor() {
        makeAutoObservable(this);
    }

    currentRoute: MainRoutesType = mainRoutes[0];
    // modalRoute: MainRoutesType | null = null;
    routers: SideBarHelperRoutesType[] = []

    setCurrentRoute = (route: keyof typeof MainRoutes) => {
        this.currentRoute = mainRoutes.find(item => item.key === route) as MainRoutesType;
    }

    toRouter = (route: keyof typeof SideBarHelperRoutes) => {
        runInAction(() => {
            this.routers.push(SideBarHelperRoutes[route]);
        })
        setTimeout(() => {
            runInAction(() => {
                _.last(this.routers)!.isOpen = true;
            })
        }, 100)
    }

    closeModal = () => {
        runInAction(() => {
            _.last(this.routers)!.isOpen = false;
        })
        setTimeout(() => {
            runInAction(() => {
                this.routers.pop();
            })
        }, 300)
    }

}