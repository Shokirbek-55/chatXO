import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { generatePath, useNavigate } from "react-router-dom";
import AvatarUpload from "../../../components/AvatarUpload/AvatarUpload";
import Header from "../../../components/Header/Header";
import MessageBox from "../../../components/MessageBox/MessageBox";
import RowItemView from "../../../components/RowItem";
import Text from "../../../components/Text/Text";
import { TMP_URL } from "../../../env";
import useRootStore from "../../../hooks/useRootStore";
import styles from "./Account.module.css";
import { motion } from "framer-motion";
import Loading from "../../../utils/loading";
import { toJS } from "mobx";

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2,
        },
    },
};

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

const Account = () => {
    const { getFriendDetails, getPreviewData } = useRootStore().usersStore;
    const { show } = useRootStore().visibleStore;
    const { user } = useRootStore().authStore;
    const { myChannels, getMyChannels, getChannelByHashId } =
        useRootStore().channelStore;
    const { friends } = useRootStore().friendsStore;
    const { toRouter, closeModal } = useRootStore().routerStore;
    const { setChannelSlug } = useRootStore().messageStore;
    const navigate = useNavigate();

    const FriendDetails = (friendId: number) => {
        getFriendDetails(friendId);
        toRouter("friendDetails");
    };
    const handleChanel = (e) => {
        setChannelSlug(e.slug);
        getChannelByHashId(e.hashId);
        const target = generatePath(`/:name`, { name: `@${e.hashId}` });
        navigate(target);
    };

    const { t } = useTranslation();

    const PreviewAvatar = (data: any) => {
        show("previewModal");
        getPreviewData(data);
    };

    return (
        <div className={styles.container}>
            <Header
                text={t("account")}
                leftIcon="arrowLeft"
                onLeftIconPress={() => closeModal()}
            />
            <div className={styles.container}>
                <div className={styles.avatarBox}>
                    <AvatarUpload
                        upload={false}
                        imageUrl={
                            user.avatar ? `${TMP_URL}/${user.avatar}` : ""
                        }
                        onPreview={() => PreviewAvatar(user)}
                        color={
                            user?.color
                                ? `linear-gradient(25deg, ${user.color} 30%, #ddd 100%)`
                                : "linear-gradient(#ddd, #666)"
                        }
                        style={{ width: "140px", height: "140px" }}
                    />
                    <Text
                        color="yellowgreen"
                        children={user?.username ? user.username : "User"}
                    ></Text>
                    <Text
                        handleLink={() => toRouter("settings")}
                        color="yellowgreen"
                    >
                        {t("settings")}
                    </Text>
                </div>
                <div className={styles.groupsBox}>
                    <div className={styles.loader}>
                        <div className={styles.judgementText}>
                            <Text margin="0 0 10px 0">{t("relevance")}</Text>
                            <Text color="yellowgreen" margin="0 0 10px 0">
                                {t("in_channels")}
                            </Text>
                        </div>
                        {!myChannels && (
                            <div className={styles.loadingError}>
                                <MessageBox
                                    title={`${t("No Internet Connection")}`}
                                />
                            </div>
                        )}
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="visible"
                            className={styles.contentBox}
                        >
                            {myChannels?.length !== 0 ? (
                                myChannels?.map((e, index) => {
                                    return (
                                        <motion.div
                                            variants={item}
                                            key={index}
                                            id="map-dev"
                                            className={styles.channelRowBox}
                                        >
                                            <RowItemView
                                                // onGroupPress={(hashId) =>
                                                //     onGroupPress(e.hashId as string)
                                                // }
                                                imageUrl={
                                                    e.avatar
                                                        ? `${TMP_URL}/${e.avatar}`
                                                        : ""
                                                }
                                                color={
                                                    e.color
                                                        ? `linear-gradient(25deg, ${e.color} 30%, #ddd 100%)`
                                                        : "linear-gradient(#ddd, #666)"
                                                }
                                                text={e.name}
                                                loading={false}
                                                onNamePress={() =>
                                                    handleChanel(e)
                                                }
                                                userType={e.userRelevance}
                                                upDownIcon={true}
                                            />
                                        </motion.div>
                                    );
                                })
                            ) : (
                                <MessageBox
                                    title={`${t("no_avalible_groups")}`}
                                />
                            )}
                        </motion.div>
                    </div>
                    <div className={styles.getChannelsBox}></div>
                    <div className={styles.friendsBox}>
                        <div className={styles.judgementText}>
                            <Text margin="0 0 10px 0">{t("relevance")}</Text>
                            <Text color="yellowgreen" margin="0 0 10px 0">
                                {t("per_user")}
                            </Text>
                        </div>
                        {!myChannels && (
                            <div className={styles.loadingError}>
                                <MessageBox
                                    title={`${t("No Internet Connection")}`}
                                />
                            </div>
                        )}
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="visible"
                            className={styles.contentBox}
                        >
                            {friends?.length !== 0 ? (
                                friends?.map((e, index) => {
                                    return (
                                        <motion.div
                                            variants={item}
                                            key={index}
                                            id="map-dev"
                                            className={styles.channelRowBox}
                                        >
                                            <RowItemView
                                                onNamePress={() =>
                                                    FriendDetails(e.id as never)
                                                }
                                                key={index}
                                                text={e.username}
                                                color={
                                                    e.color
                                                        ? `linear-gradient(25deg, ${e.color} 30%, #ddd 100%)`
                                                        : "linear-gradient(#ddd, #666)"
                                                }
                                                imageUrl={
                                                    e.avatar
                                                        ? `${TMP_URL}/${e.avatar}`
                                                        : ""
                                                }
                                                loading={false}
                                            />
                                        </motion.div>
                                    );
                                })
                            ) : (
                                <MessageBox
                                    title={`${t("no_avalible_friends")}`}
                                />
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(Account);
