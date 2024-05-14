import { makeAutoObservable, runInAction } from "mobx";
import {
  MainRoutes,
  MainRoutesType,
  SideBarHelperRoutes,
  SideBarHelperRoutesType,
  mainRoutes,
  ManageHelperRoutes,
} from "./routers";
import _ from "lodash";
import { AppRootStore } from "../store";

export default class RouterStore {
  rootStore: AppRootStore;

  constructor(rootStore: AppRootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }
  currentRoute: MainRoutesType = mainRoutes[0];
  routers: SideBarHelperRoutesType[] = [];
  manageRouters: SideBarHelperRoutesType[] = [];

  isOpenRigthSideBar = "-340px";

  setCurrentRoute = (route: keyof typeof MainRoutes) => {
    this.currentRoute = mainRoutes.find(
      (item) => item.key === route,
    ) as MainRoutesType;
    this.closeChannelInUser();
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

  closeModal = (key: "left" | "right") => {
    console.log(key);
    if (key === "left") {
      runInAction(() => {
        if (this.routers.length) _.last(this.routers)!.isOpen = false;
      });
      setTimeout(() => {
        runInAction(() => {
          this.routers.pop();
        });
      }, 300);
    } else {
      runInAction(() => {
        if (this.manageRouters.length > 1)
          _.last(this.manageRouters)!.isOpen = false;
        else if (this.manageRouters.length === 1) this.closeRightSideBar();
      });
      setTimeout(() => {
        runInAction(() => {
          if (this.manageRouters.length > 1) this.manageRouters.pop();
        });
      }, 300);
    }
  };

  openRightSideBar = () => {
    this.rootStore.visibleStore.show("rightSidebar");
    this.manageRouters = [ManageHelperRoutes["manageChannel"]];
  };

  openInUser = () => {
    this.manageRouters = [ManageHelperRoutes["channelInUser"]];
    _.last(this.manageRouters)!.isOpen = true;
    this.rootStore.visibleStore.show("rightSidebar");
  };

  closeInUser = () => {
    this.manageRouters = [ManageHelperRoutes["manageChannel"]];
  };

  toggleRightSidebar = () => {
    this.rootStore.visibleStore.toglevisible("rightSidebar");
  };

  openManagaChannel = () => {
    if (this.manageRouters.length) {
      this.manageRouters = [ManageHelperRoutes["manageChannel"]];
    }
  };

  closeRightSideBar = () => {
    this.rootStore.visibleStore.hide("rightSidebar");
  };

  closeChannelInUser = () => {
    if (this.manageRouters.some((e) => e.key === "channelInUserM")) {
      this.rootStore.visibleStore.hide("rightSidebar");
      this.manageRouters = [];
    }
  };
}
