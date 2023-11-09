import React from "react";
import { useTranslation } from "react-i18next";
import { generatePath, useNavigate } from "react-router-dom";
import AvatarUpload from "../../../components/AvatarUpload/AvatarUpload";
import Header from "../../../components/Header/Header";
import MessageBox from "../../../components/MessageBox/MessageBox";
import RowItemView from "../../../components/RowItem";
import Text from "../../../components/Text/Text";
import { TMP_URL } from "../../../env";
import useRootStore from "../../../hooks/useRootStore";
import styles from "./channelInUser.module.css";
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
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

const ChannelInUser = () => {
    const navigation = useNavigate();
    const { friendDetails, weChannels } = useRootStore().usersStore;
    const { closeModal, closeInUser } = useRootStore().routerStore;
    const { t } = useTranslation();
    const { setChannelSlug } = useRootStore().messageStore;
    const { getChannelByHashId, myChannels } = useRootStore().channelStore;
    const navigate = useNavigate();
    const { show } = useRootStore().visibleStore;
    const { getPreviewData } = useRootStore().usersStore;

    const handleChanel = (e) => {
        setChannelSlug(e.slug);
        getChannelByHashId(
            myChannels.find((item) => item.id === e.id)?.hashId as never
        );
        const target = generatePath(`/:name`, {
            name: `@${
                myChannels.find((item) => item.id === e.id)?.hashId as never
            }`,
        });
        navigate(target);
    };

    const PreviewAvatar = (data: any) => {
        show("previewModal");
        getPreviewData(data);
    };

    return (
        <div className={styles.container}>
            <Header
                text={`${t("update_relevance")}`}
                leftIcon="arrowLeft"
                onLeftIconPress={closeInUser}
            />
            <div className={styles.contentBox}>
                <AvatarUpload
                    imageUrl={
                        friendDetails.avatar
                            ? `${TMP_URL}/${friendDetails.avatar}`
                            : ""
                    }
                    onPreview={() => PreviewAvatar(friendDetails)}
                    upload={false}
                    color={
                        friendDetails.color
                            ? `linear-gradient(25deg, ${friendDetails.color} 30%, #ddd 100%)`
                            : "linear-gradient(#ddd, #666)"
                    }
                />
                <Text
                    children={
                        friendDetails.username ? friendDetails.username : "User"
                    }
                />
                <div className={styles.judgementText}>
                    <Text children="My Judgement" />
                    <Text color="yellowgreen" children="in groups" />
                </div>
            </div>
            <motion.div variants={container} initial="hidden" animate="visible">
                {weChannels?.length !== 0 ? (
                    weChannels?.map((e, index) => {
                        return (
                            <motion.div
                                variants={item}
                                key={index}
                                id="map-dev"
                                className={styles.channelRowBox}
                            >
                                <RowItemView
                                    color={
                                        e.color
                                            ? `linear-gradient(25deg, ${e.color} 30%, #ddd 100%)`
                                            : "linear-gradient(#ddd, #666)"
                                    }
                                    imageUrl={
                                        e.avatar ? `${TMP_URL}/${e.avatar}` : ""
                                    }
                                    text={e.name}
                                    loading={false}
                                    onNamePress={() => handleChanel(e)}
                                />
                            </motion.div>
                        );
                    })
                ) : (
                    <MessageBox
                        size="12px"
                        title={`${t("no_avalible_groups")}`}
                    />
                )}
            </motion.div>
        </div>
    );
};

export default observer(ChannelInUser);
