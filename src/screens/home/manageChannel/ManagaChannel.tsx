import { message } from "antd";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AvatarUpload from "../../../components/AvatarUpload/AvatarUpload";
import ChannelItems from "../../../components/ChannelItems/channelItems";
import Header from "../../../components/Header/Header";
import RowItemView from "../../../components/RowItem";
import Text from "../../../components/Text/Text";
import { TMP_URL } from "../../../env";
import useRootStore from "../../../hooks/useRootStore";
import { data } from "../../../store/dataBase";
import styles from "./ManagaChannel.module.css";

const ManagaChannel = () => {
    const { t } = useTranslation();
    const {
        channelData,
        getChannelBlockedUsers,
        channelUsers,
        getChannelUsers,
        adminId,
    } = useRootStore().channelStore;
    const { toRouterManageCh, closeModal, closeRightSideBar } =
        useRootStore().routerStore;
    const { userChannelLeave, getPreviewData } = useRootStore().usersStore;
    const { messageCache, slug } = useRootStore().messageStore;
    const { user } = useRootStore().authStore;
    const { show } = useRootStore().visibleStore;
    const navigation = useNavigate();

    const PreviewChannelAvatar = (data: any) => {
        getPreviewData(data);
        show("previewModal");
    };

    const leaveChannel = (channelId: number) => {
        userChannelLeave(channelId, () => navigation("", { replace: true }));
        closeRightSideBar();
    };

    const OpenBlogUser = () => {
        toRouterManageCh("blockUser");
        getChannelBlockedUsers(channelData.hashId);
    };

    const EditGroup = () => {
        toRouterManageCh("editChannel");
        getChannelUsers(channelData.hashId);
    };

    const copyChatLink = () => {
        navigator.clipboard.writeText(window.location.href);
        message.success("Copy chat link");
    };

    return (
        <div className={styles.container}>
            <Header
                leftIcon="arrowRight"
                text="Profile"
                rightIcon={user.id === adminId ? "setting" : "logout"}
                onLeftIconPress={() => closeModal()}
                onRightIconPress={() =>
                    user.id === channelData.adminId
                        ? toRouterManageCh("channelSetting")
                        : leaveChannel(channelData.id)
                }
            />
            {channelData?.avatar ? (
                <div className={styles.avatarBox}>
                    <img
                        style={{ cursor: "pointer" }}
                        src={
                            channelData?.avatar
                                ? `${TMP_URL}/${channelData.avatar}`
                                : ""
                        }
                        alt=""
                        onClick={() => PreviewChannelAvatar(channelData)}
                    />
                </div>
            ) : (
                <AvatarUpload
                    upload={false}
                    style={{ margin: "10px auto" }}
                    imageUrl={
                        channelData?.avatar
                            ? `${TMP_URL}/${channelData.avatar}`
                            : ""
                    }
                    color={
                        channelData?.color
                            ? channelData.color
                            : "linear-gradient(#ddd, #666)"
                    }
                />
            )}
            <Text
                children={channelData?.name}
                center
                style={{ fontSize: "25px" }}
            />
            <Text
                children={`${channelUsers.length} members`}
                center
                style={{ fontSize: "13px" }}
            />
            {adminId === user.id ? (
                <div className={styles.itemsRow}>
                    <ChannelItems
                        textSize={13}
                        icon="edit"
                        text={`${t("editGroup")}`}
                        onClickItem={EditGroup}
                    />
                    <ChannelItems
                        textSize={14}
                        icon="block"
                        text={t("blockedUsers")}
                        onClickItem={OpenBlogUser}
                    />
                </div>
            ) : null}
            <div className={styles.items}>
                <ChannelItems
                    textSize={13}
                    icon="copy"
                    text={`${t("copyLink")}`}
                    onClickItem={copyChatLink}
                />
            </div>
            <div className={styles.channalUsers}>
                {channelUsers
                    .slice()
                    .sort((a) => (a.id === user.id ? -1 : 1))
                    .map((e, index) => {
                        return (
                            <div key={index} style={{ width: "100%" }}>
                                <RowItemView
                                    text={e.username}
                                    color={
                                        e.color
                                            ? `linear-gradient(25deg, ${e.color} 30%, #ddd 100%)`
                                            : "linear-gradient(#ddd, #666)"
                                    }
                                    imageUrl={
                                        e.avatar ? `${TMP_URL}/${e.avatar}` : ""
                                    }
                                    loading={false}
                                    userType={
                                        adminId === user.id && e.id === user.id
                                            ? "You admin"
                                            : user.id === e.id
                                            ? "You"
                                            : adminId === e.id
                                            ? "Admin"
                                            : ""
                                    }
                                />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default observer(ManagaChannel);
