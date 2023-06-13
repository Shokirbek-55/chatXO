import { makeAutoObservable, runInAction, set } from "mobx";
import { MainRoutes, MainRoutesType, SideBarHelperRoutes, mainRoutes } from "./routers";


export default class RouterStore {
    constructor() {
        makeAutoObservable(this);
    }

    currentRoute: MainRoutesType = mainRoutes[0];
    modalRoute: MainRoutesType | null = null;
    isOpen : boolean = false;


    setCurrentRoute = (route: keyof typeof MainRoutes) => {
        this.currentRoute = mainRoutes.find(item => item.key === route) as MainRoutesType;
    }

    toRouter = (route: keyof typeof SideBarHelperRoutes) => {
        runInAction(() => {
            this.modalRoute = SideBarHelperRoutes[route];
            this.isOpen = true;
        })
    }

    backToRouter = () => {
        
    }

    closeModal = () => {
        runInAction(() => {
            this.isOpen = false;
        })
        setTimeout(() => {
            runInAction(() => {
                this.modalRoute = null;
            })
        } , 300)
    }

}