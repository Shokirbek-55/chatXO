import { observer } from "mobx-react-lite";
import React from "react";
import { BsFillShareFill } from "react-icons/bs";
import { GrUserManager } from "react-icons/gr";
import { IoIosSettings, IoMdPerson } from "react-icons/io";
import { MdGroup } from "react-icons/md";
import useRootStore from "../../hooks/useRootStore";
import { ButtonComponent } from "../../utils/button";
import { SearchIcon } from "../../utils/icons";
import MenuItem from "../MenuItem/MenuItem";
import styles from "./MenuChannelScreen.module.css";

interface Props {}

const MenuChannelScreen = () => {
    const { visible, hide } = useRootStore().visibleStore;
    const { toRouter, closeChannelInUser } = useRootStore().routerStore;

    const EditProfile = () => {
        toRouter("account");
        hide("menuChannel");
        closeChannelInUser();
    };

    const onFriends = () => {
        toRouter("friends");
        hide("menuChannel");
        closeChannelInUser();
    };

    const createNewGroup = () => {
        toRouter("createChannel");
        hide("menuChannel");
        closeChannelInUser();
    };

    const accountSetting = () => {
        toRouter("settings");
        hide("menuChannel");
        closeChannelInUser();
    };

    return (
        <div
            className={styles.container}
            style={{ display: visible.menuChannel ? "block" : "none" }}
            onClick={() => hide("menuChannel")}
        >
            <div
                className={styles.content}
                style={{ bottom: visible.menuChannel ? "60px" : "-500px" }}
            >
                <MenuItem
                    title="Edit Profile"
                    icon={<IoMdPerson size={22} />}
                    onClick={EditProfile}
                />
                <MenuItem
                    title="Create new group"
                    icon={<BsFillShareFill size={20} />}
                    onClick={createNewGroup}
                />
                <MenuItem
                    title="Friends"
                    icon={<MdGroup size={22} />}
                    onClick={onFriends}
                />
                <MenuItem
                    title="Setting"
                    icon={<IoIosSettings size={22} />}
                    onClick={accountSetting}
                />
            </div>
            <div className={styles.cancelBtn}>
                <ButtonComponent
                    clickMe={() => hide("menuChannel")}
                    width="100%"
                    text="Cancel"
                />
            </div>
        </div>
    );
};

export default observer(MenuChannelScreen);
