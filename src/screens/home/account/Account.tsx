import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AvatarUpload from '../../../components/AvatarUpload/AvatarUpload';
import Header from '../../../components/Header/Header';
import MessageBox from '../../../components/MessageBox';
import RowItemView from '../../../components/RowItem';
import Text from '../../../components/Text/Text';
import { TMP_URL } from '../../../env';
import { channels, friend, myData } from '../../../store/dataBase';
import styles from "./Account.module.css"

const Account = () => {
    const navigation = useNavigate()
    const loading = true
    const { t } = useTranslation()
    return (
        <div className={styles.container}>
            <Header
                text={t("account")}
                leftIcon="arrowLeft"
                onLeftIconPress={() => navigation(-1)}
            />
            <div className={styles.container}>
                <div className={styles.avatarBox}>
                    <AvatarUpload
                        upload={false}
                        imageUrl={myData.avatar ? myData.avatar : ""}
                        color={myData?.color ? myData.color : "linear-gradient(#ddd, #666)"}
                        style={{ width: "140px", height: "140px" }}
                    />
                    <Text style={{ color: "#1e7335" }} value={myData?.username}></Text>
                    <Text
                        handleLink={() => navigation("")}
                        style={{ color: "#1e7335" }}
                    >
                        {t("settings")}
                    </Text>
                </div>
                <div className={styles.groupsBox}>
                    <div className={styles.loader}>
                        <Text center margin='0 0 10px 0'>
                            {t("My judgement")} {t("in groups")}
                        </Text>
                        {channels?.length !== 0 ?
                            channels?.map((e, index) => {
                                return (
                                    <div key={index}>
                                        <RowItemView
                                            // onGroupPress={(hashId) =>
                                            //     onGroupPress(e.hashId as string)
                                            // }
                                            imageUrl={e.avatar ? e.avatar : ""}
                                            color={e.color ? e.color : "linear-gradient(#ddd, #666)"}
                                            text={e.name}
                                            loading={false}
                                        />
                                    </div>
                                );
                            }) :
                            <MessageBox title={`${t("no_avalible_groups")}`} />
                        }

                    </div>
                    <div className={styles.getChannelsBox}></div>
                    <div className={styles.friendsBox}>
                        <Text center margin='0 0 10px 0'>
                            {t("relevance")} {t("per_user")}
                        </Text>
                        {friend?.length !== 0 ?
                            friend?.map((e, index) => {
                                return (
                                    <RowItemView
                                        // onNamePress={() => onNamePress(e.id as never)}
                                        key={index}
                                        text={e.username}
                                        color={e.color ? e.color : "linear-gradient(#ddd, #666)"}
                                        imageUrl={e.avatar ? e.avatar : ""}
                                        loading={false}
                                    />
                                );
                            }) :
                            <MessageBox title={`${t("no_avalible_friends")}`} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account
