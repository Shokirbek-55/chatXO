import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AvatarUpload from '../../../components/AvatarUpload/AvatarUpload';
import Header from '../../../components/Header/Header';
import MessageBox from '../../../components/MessageBox';
import RowItemView from '../../../components/RowItem';
import Text from '../../../components/Text/Text';
import { TMP_URL } from '../../../env';
import useRootStore from '../../../hooks/useRootStore';
import { channels, friend, myData } from '../../../store/dataBase';
import styles from "./Account.module.css"
import { motion } from "framer-motion";
import Loading from '../../../utils/loading';

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

const Account = () => {
    const navigation = useNavigate()
    const { myData, getUserData } = useRootStore().usersStore
    const { channelsData, getMyChannels, channelsLoading } = useRootStore().channelStore
    const { friends, getFriends, loading } = useRootStore().friendsStore

    useEffect(() => {
        getUserData()
        getFriends()
        getMyChannels()
    }, [])

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
                        imageUrl={myData.avatar ? `${TMP_URL}/${myData.avatar}` : ""}
                        color={myData?.color ? myData.color : "linear-gradient(#ddd, #666)"}
                        style={{ width: "140px", height: "140px" }}
                    />
                    <Text style={{ color: "#1e7335" }} value={myData?.username ? myData.username : "User"}></Text>
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
                        <Loading isLoad={channelsLoading} />
                        {false && (
                            <div className={styles.loadingBox}>
                                <Loading isLoad={channelsLoading} />
                            </div>
                        )}
                        {!channelsData && (
                            <div className={styles.loadingError}>
                                <MessageBox title={`${t("No Internet Connection")}`} />
                            </div>
                        )}
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="visible"
                            className={styles.contentBox}>
                            {channelsData?.length !== 0 ?
                                channelsData?.map((e, index) => {
                                    return (
                                        <motion.div
                                            variants={item}
                                            key={index}
                                            id="map-dev"
                                            className={styles.channelRowBox}>
                                            <RowItemView
                                                // onGroupPress={(hashId) =>
                                                //     onGroupPress(e.hashId as string)
                                                // }
                                                imageUrl={e.avatar ? `${TMP_URL}/${e.avatar}` : ""}
                                                color={e.color ? e.color : "linear-gradient(#ddd, #666)"}
                                                text={e.name}
                                                loading={false}
                                            />
                                        </motion.div>
                                    );
                                }) :
                                <MessageBox title={`${t("no_avalible_groups")}`} />
                            }
                        </motion.div>
                    </div>
                    <div className={styles.getChannelsBox}></div>
                    <div className={styles.friendsBox}>
                        <Text center margin='0 0 10px 0'>
                            {t("relevance")} {t("per_user")}
                        </Text>
                        <Loading isLoad={loading} />
                        {false && (
                            <div className={styles.loadingBox}>
                                <Loading isLoad={loading} />
                            </div>
                        )}
                        {!channelsData && (
                            <div className={styles.loadingError}>
                                <MessageBox title={`${t("No Internet Connection")}`} />
                            </div>
                        )}
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="visible"
                            className={styles.contentBox}>
                            {friends?.length !== 0 ?
                                friends?.map((e, index) => {
                                    return (
                                        <motion.div
                                            variants={item}
                                            key={index}
                                            id="map-dev"
                                            className={styles.channelRowBox}>
                                            <RowItemView
                                                // onNamePress={() => onNamePress(e.id as never)}
                                                key={index}
                                                text={e.username}
                                                color={e.color ? e.color : "linear-gradient(#ddd, #666)"}
                                                imageUrl={e.avatar ? `${TMP_URL}/${e.avatar}` : ""}
                                                loading={false}
                                            />
                                        </motion.div>
                                    );
                                }) :
                                <MessageBox title={`${t("no_avalible_friends")}`} />
                            }
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(Account)
