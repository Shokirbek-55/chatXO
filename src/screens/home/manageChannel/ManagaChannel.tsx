import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AvatarUpload from '../../../components/AvatarUpload/AvatarUpload';
import ChannelItems from '../../../components/ChannelItems/channelItems';
import Header from '../../../components/Header/Header';
import RowItemView from '../../../components/RowItem';
import Text from '../../../components/Text/Text';
import { TMP_URL } from '../../../env';
import useRootStore from '../../../hooks/useRootStore';
import { data } from '../../../store/dataBase';
import styles from "./ManagaChannel.module.css"

const ManagaChannel = () => {
    const { t } = useTranslation()
    const { channelData, getChannelBlockedUsers } = useRootStore().channelStore
    const { toRouterManageCh, closeModal, closeRightSideBar } = useRootStore().routerStore
    const { userChannelLeave } = useRootStore().usersStore
    const { messageCache, slug } = useRootStore().messageStore
    const { user } = useRootStore().authStore
    

    const leaveChannel = (channelId: number) => {
        userChannelLeave(channelId)
        closeRightSideBar()
    }

    const OpenBlogUser = () => {
        toRouterManageCh("blockUser")
        getChannelBlockedUsers(channelData.hashId)
    }

    return (
        <div className={styles.container}>
            <Header
                leftIcon="arrowRight"
                text="Profile"
                rightIcon={user.id === channelData.adminId ? "setting" : "logout"}
                onLeftIconPress={() => closeModal()}
                onRightIconPress={() => user.id === channelData.adminId ? toRouterManageCh("channelSetting") : leaveChannel(channelData.id)}
            />
            {messageCache[slug]?.channelData?.avatar ? (
                <div className={styles.avatarBox}>
                    <img
                        style={{ cursor: "pointer" }}
                        src={messageCache[slug]?.channelData?.avatar ? `${TMP_URL}/${messageCache[slug]?.channelData.avatar}` : ""}
                        alt=""
                    />
                </div>
            ) : (
                <AvatarUpload
                    upload={false}
                    style={{ margin: "10px auto" }}
                        imageUrl={messageCache[slug]?.channelData?.avatar ? `${TMP_URL}/${messageCache[slug]?.channelData.avatar}` : ""}
                        color={messageCache[slug]?.channelData?.color ? messageCache[slug]?.channelData.color : "linear-gradient(#ddd, #666)"}
                />
            )}
            <Text children={messageCache[slug]?.channelData?.name} center style={{ fontSize: "25px" }} />
            <Text
                children={`${Object.keys(messageCache[slug]?.channelUsers || {}).length} members`}
                center
                style={{ fontSize: "13px" }}
            />
            {user.id === channelData.adminId ?
                <div className={styles.itemsRow}>
                    <ChannelItems
                        textSize={13}
                        icon="edit"
                        text={`${t("editGroup")}`}
                        onClickItem={() => toRouterManageCh("editChannel")}
                    />
                    <ChannelItems
                        textSize={14}
                        icon="block"
                        text={t("blockedUsers")}
                        onClickItem={OpenBlogUser}
                    />
                </div> :
                null
            }
            <div className={styles.items}>
                <ChannelItems
                    textSize={13}
                    icon="copy"
                    text={`${t("copyLink")}`}
                />
            </div>
            <div className={styles.channalUsers}>
                {Object.keys(messageCache[slug]?.channelUsers || {}).map((e, index) => {
                    return (
                        <div key={index} style={{ width: "100%" }}>
                            <RowItemView
                                text={messageCache[slug]?.channelUsers[e].username}
                                color={messageCache[slug]?.channelUsers[e].color ? `linear-gradient(25deg, ${messageCache[slug]?.channelUsers[e].color} 30%, #ddd 100%)` : "linear-gradient(#ddd, #666)"}
                                imageUrl={messageCache[slug]?.channelUsers[e].avatar ? `${TMP_URL}/${messageCache[slug]?.channelUsers[e].avatar}` : ""}
                                loading={false}
                                userType={
                                    channelData.adminId === user.id && messageCache[slug]?.channelUsers[e].id ===
                                        user.id ? "You admin" : user.id ===
                                            messageCache[slug]?.channelUsers[e].id ? "You" : channelData.adminId === messageCache[slug]?.channelUsers[e].id ? "Admin" : ""
                                }
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default observer(ManagaChannel)
