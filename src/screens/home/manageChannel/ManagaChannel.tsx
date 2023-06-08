import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AvatarUpload from '../../../components/AvatarUpload/AvatarUpload';
import ChannelItems from '../../../components/ChannelItems/channelItems';
import Header from '../../../components/Header/Header';
import RowItemView from '../../../components/RowItem';
import Text from '../../../components/Text/Text';
import { data } from '../../../store/dataBase';
import styles from "./ManagaChannel.module.css"

const ManagaChannel = () => {
    const { t } = useTranslation()
    return (
        <div className={styles.container}>
            <Header
                leftIcon="arrowRight"
                text="Profile"
                rightIcon={"setting"}
            />
            {data?.avatar ? (
                <div className={styles.avatarBox}>
                    <img
                        style={{ cursor: "pointer" }}
                        src={data?.avatar ? data.avatar : ""}
                        alt=""
                    />
                </div>
            ) : (
                <AvatarUpload
                    upload={false}
                    style={{ margin: "10px auto" }}
                    imageUrl={data?.avatar ? data.avatar : ""}
                    color={data?.color ? data.color : "linear-gradient(#ddd, #666)"}
                />
            )}
            {data?.name ? (
                <>
                    <Text children={data?.name} center style={{ fontSize: "25px" }} />
                    <Text
                        children={`${data?.users?.length} members`}
                        center
                        style={{ fontSize: "13px" }}
                    />
                </>
            ) : null}

            <div className={styles.itemsRow}>
                <ChannelItems
                    textSize={13}
                    icon="edit"
                    text={`${t("editGroup")}`}
                />
                <ChannelItems
                    textSize={13}
                    icon="copy"
                    text={`${t("copyLink")}`}
                />
            </div>
            <div className={styles.items}>
                <ChannelItems
                    textSize={14}
                    icon="block"
                    text={t("blockedUsers")}
                />
            </div>
            {data ? (
                <div className={styles.channalUsers}>
                    {data?.users?.map((e: any) => {
                        return (
                            <div key={e.id} style={{ width: "100%" }}>
                                <RowItemView
                                    text={e.username}
                                    color={e.color ? e.color : "linear-gradient(#ddd, #666)"}
                                    imageUrl={e.avatar ? e.avatar : ""}
                                    loading={false}
                                />
                            </div>
                        );
                    })}
                </div>
            ) : null}
        </div>
    )
}

export default ManagaChannel
