import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { IoIosSettings, IoMdNotifications } from "react-icons/io";
import { MdGroup, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import MenuItem from "../../../components/MenuItem/MenuItem";
import useRootStore from "../../../hooks/useRootStore";
import { ButtonComponent } from "../../../utils/button";
import Colors from "../../../utils/colors";
import styles from "./AccountSetting.module.css";

const AccountSetting = () => {
    const { t } = useTranslation();
    const { logout, user, deleteUser } = useRootStore().authStore;
    const { closeModal, toRouter } = useRootStore().routerStore;
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
                <a href="https://chatxo.app/impressum" target={"_blank"} rel="noreferrer">
                    <MenuItem
                        title="Terms and Conditions"
                        icon={<IoIosSettings size={22} />}
                    />
                </a>
                <a href="https://chatxo.app/privacy-policy" target={"_blank"} rel="noreferrer">
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
