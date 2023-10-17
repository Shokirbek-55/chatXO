import { message, Popconfirm } from "antd";
import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import APIs from "../../../api/api";
import AvatarView from "../../../components/AvatarUpload/AvatarUpload";
import ButtonView from "../../../components/Button";
import Header from "../../../components/Header/Header";
import Input from "../../../components/Input";
import Text from "../../../components/Text/Text";
import { TMP_URL } from "../../../env";
import useRootStore from "../../../hooks/useRootStore";
import { getRandomColor } from "../../../utils/randomColor";
import styles from "./AccountSetting.module.css";

const AccountSetting = () => {
    const {
        setMyData,
        updateUserAccount,
        setUserState,
        onSelectFile,
        avatarLoading,
        userAvatar,
    } = useRootStore().usersStore;
    const { logout, user, deleteUser } = useRootStore().authStore;
    const { closeModal, toRouter } = useRootStore().routerStore;
    const { show } = useRootStore().visibleStore;
    const { t } = useTranslation();
    const navigation = useNavigate();

    const onLogout = () => {
        logout(() => navigation("/auth/welcome"));
    };

    const randomUserColor = (Color: string) => {
        setUserState("color", Color);
        updateUserAccount({ color: Color });
    };

    const onImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            onSelectFile(e.target.files[0]);
            show("uploadFile");
        }
    };

    const confirm = () => {
        deleteUser(user.id as never);
    };

    const cancel = () => {};

    return (
        <div className={styles.container}>
            <Header
                text={t("edit_profile")}
                leftIcon="arrowLeft"
                rightIcon="logout"
                popConfirm={onLogout}
                popTitle="Logout"
                popQuest="Are you sure you want to log out?"
                onLeftIconPress={() => closeModal("left")}
            />
            <div className={styles.ImageBox}>
                <AvatarView
                    loading={avatarLoading}
                    upload={true}
                    color={
                        setMyData.color
                            ? setMyData.color
                            : "linear-gradient(#ddd, #666)"
                    }
                    imageUrl={
                        userAvatar
                            ? userAvatar
                            : setMyData.avatar
                            ? `${TMP_URL}/${setMyData.avatar}`
                            : ""
                    }
                    onChange={(e) => onImageSelect(e)}
                />
                <Text
                    color="yellowgreen"
                    children={t("random_color")}
                    handleLink={() => randomUserColor(getRandomColor())}
                />
                <Text
                    color="yellowgreen"
                    handleLink={() => toRouter("language")}
                    children={t("change_language")}
                />
            </div>
            <div className={styles.ContentBox}>
                <Text
                    style={{
                        paddingTop: "3px",
                    }}
                    children={t("username")}
                />
                <Input
                    value={setMyData.username}
                    setUserName={(e) => {
                        setUserState("username", e);
                    }}
                />
            </div>
            <div className={styles.ContentBox}>
                <Text
                    style={{
                        marginTop: "10px",
                    }}
                    children={t("your_email")}
                />
                <Input
                    value={setMyData.email}
                    setUserName={(e) => {
                        setUserState("email", e);
                    }}
                />
            </div>
            <div className={styles.ContentBox}>
                <ButtonView
                    style={{
                        width: "100%",
                        marginTop: "25px",
                    }}
                    title={`${t("update_profile")}`}
                    onClickbutton={() => updateUserAccount(setMyData)}
                />
                <Popconfirm
                    title="Delete your account"
                    description="Do you really want to delete your account?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <span>
                        <ButtonView
                            style={{
                                width: "100%",
                                marginTop: "10px",
                                backgroundColor: "red",
                            }}
                            title={`Delate account`}
                        />
                    </span>
                </Popconfirm>
            </div>
        </div>
    );
};

export default observer(AccountSetting);
