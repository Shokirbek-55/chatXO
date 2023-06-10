import { makeAutoObservable } from "mobx";
import { MainRoutes, MainRoutesType, mainRoutes } from "./routers";


export default class RouterStore {
    constructor() {
        makeAutoObservable(this);
    }

    currentRoute: MainRoutesType = mainRoutes[0]

    setCurrentRoute = (route: keyof typeof MainRoutes) => {
        this.currentRoute = mainRoutes.find(item => item.key === route) as MainRoutesType;
    }
}