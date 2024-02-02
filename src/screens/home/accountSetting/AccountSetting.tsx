import { message, Popconfirm } from "antd";
import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFillShareFill } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import { IoIosSettings, IoMdNotifications, IoMdPerson } from "react-icons/io";
import { MdGroup, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import APIs from "../../../api/api";
import AvatarView from "../../../components/AvatarUpload/AvatarUpload";
import ButtonView from "../../../components/Button";
import Header from "../../../components/Header/Header";
import Input from "../../../components/Input";
import MenuItem from "../../../components/MenuItem/MenuItem";
import Text from "../../../components/Text/Text";
import { TMP_URL } from "../../../env";
import useRootStore from "../../../hooks/useRootStore";
import { ButtonComponent } from "../../../utils/button";
import Colors from "../../../utils/colors";
import { getRandomColor } from "../../../utils/randomColor";
import styles from "./AccountSetting.module.css";

const AccountSetting = () => {
    const { logout, user, deleteUser } = useRootStore().authStore;
    const { closeModal, toRouter } = useRootStore().routerStore;
    const { show, hide } = useRootStore().visibleStore;
    const { t } = useTranslation();
    const navigation = useNavigate();

    const onLogout = () => {
        logout(() => navigation("/auth/welcome"));
    };

    const onFriends = () => {
        toRouter("friends");
    };

    return (
        <div className={styles.container}>
            <Header
                text={t("settings")}
                leftIcon="arrowLeft"
                onLeftIconPress={() => closeModal("left")}
            />
            <div className={styles.content}>
                <MenuItem
                    title="Friends"
                    icon={<MdGroup size={22} />}
                    onClick={onFriends}
                />
                <MenuItem
                    title="Sign Out"
                    icon={<MdLogout size={20} />}
                    onClick={onLogout}
                />
                <MenuItem
                    title="Notifications"
                    icon={<IoMdNotifications size={22} />}
                />
                <a href="https://chatxo.app/impressum" target={"_blank"}>
                    <MenuItem
                        title="Terms and Conditions"
                        icon={<IoIosSettings size={22} />}
                    />
                </a>
                <a href="https://chatxo.app/privacy-policy" target={"_blank"}>
                    <MenuItem
                        title="Privacy Statement"
                        icon={<IoIosSettings size={22} />}
                    />
                </a>
            </div>
            <div className={styles.bottomBox}>
                <ButtonComponent
                    text="Logout"
                    color={Colors.Black}
                    backColor="transparent"
                    clickMe={onLogout}
                />
                <ButtonComponent
                    text="Delete account"
                    color={Colors.Red}
                    backColor="transparent"
                    clickMe={() => deleteUser(user.id as never)}
                />
            </div>
        </div>
    );
};

export default observer(AccountSetting);
