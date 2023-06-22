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
    const { getChannelsUsersData, channelData } = useRootStore().channelStore
    const { toRouter, closeModal } = useRootStore().routerStore
    const { user } = useRootStore().authStore

    return (
        <div className={styles.container}>
            <Header
                leftIcon="arrowRight"
                text="Profile"
                rightIcon={"setting"}
                onLeftIconPress={() => closeModal()}
                onRightIconPress={() => toRouter("channelSetting")}
            />
            {channelData?.avatar ? (
                <div className={styles.avatarBox}>
                    <img
                        style={{ cursor: "pointer" }}
                        src={channelData?.avatar ? `${TMP_URL}/${channelData.avatar}` : ""}
                        alt=""
                    />
                </div>
            ) : (
                <AvatarUpload
                    upload={false}
                    style={{ margin: "10px auto" }}
                    imageUrl={channelData?.avatar ? `${TMP_URL}/${channelData.avatar}` : ""}
                    color={channelData?.color ? channelData.color : "linear-gradient(#ddd, #666)"}
                />
            )}
            <Text children={channelData?.name} center style={{ fontSize: "25px" }} />
            <Text
                children={`${getChannelsUsersData?.length} members`}
                center
                style={{ fontSize: "13px" }}
            />
            <div className={styles.itemsRow}>
                <ChannelItems
                    textSize={13}
                    icon="edit"
                    text={`${t("editGroup")}`}
                    onClickItem={() => toRouter("editChannel")}
                />
                <ChannelItems
                    textSize={14}
                    icon="block"
                    text={t("blockedUsers")}
                    onClickItem={() => toRouter("blockUser")}
                />
            </div>
            <div className={styles.items}>
                <ChannelItems
                    textSize={13}
                    icon="copy"
                    text={`${t("copyLink")}`}
                />
            </div>
            <div className={styles.channalUsers}>
                {getChannelsUsersData?.map((e) => {
                    return (
                        <div key={e.id} style={{ width: "100%" }}>
                            <RowItemView
                                text={e.username}
                                color={e.color ? `linear-gradient(25deg, ${e.color} 30%, #ddd 100%)` : "linear-gradient(#ddd, #666)"}
                                imageUrl={e.avatar ? `${TMP_URL}/${e.avatar}` : ""}
                                loading={false}
                                userType={
                                    channelData.adminId === user.id && e.id ===
                                        user.id ? "You admin" : user.id ===
                                            e.id ? "You" : channelData.adminId === e.id ? "Admin" : ""
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
