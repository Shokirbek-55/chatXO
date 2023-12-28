import React, { useMemo } from "react";
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
import Colors from "../../../utils/colors";
import Button from "../../../components/Button";
import { ButtonComponent } from "../../../utils/button";

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
    const { friendDetails } = useRootStore().usersStore;
    const { friends, deleteFriend, createFriend } = useRootStore().friendsStore;
    const { closeModal } = useRootStore().routerStore;
    const { t } = useTranslation();
    const { setChannelSlug } = useRootStore().messageStore;
    const { getChannelByHashId, myChannels } = useRootStore().channelStore;
    const navigate = useNavigate();
    const { show } = useRootStore().visibleStore;
    const { getPreviewData } = useRootStore().usersStore;
    console.log("friendDetails", toJS(friendDetails));

    const isFriend = useMemo(
        () => friends.some((e) => e.id === friendDetails.id),
        [friends, friendDetails]
    );

    const handleChanel = (e) => {
        setChannelSlug(e.slug);
        getChannelByHashId(
            myChannels.find((item) => item?.id === e?.id)?.hashId as never
        );
        const target = generatePath(`/:name`, {
            name: `@${
                myChannels.find((item) => item?.id === e?.id)?.hashId as never
            }`,
        });
        navigate(target);
    };

    const handeCreateOrDelete = () => {
        isFriend
            ? deleteFriend(friendDetails?.id as never)
            : createFriend(friendDetails?.id as never);
    };

    const PreviewAvatar = (data: any) => {
        show("previewModal");
        getPreviewData(data);
    };

    return (
        <div className={styles.container}>
            <Header
                text={`${t("Profile")}`}
                leftIcon="arrowLeft"
                colorText="black"
                onLeftIconPress={() => closeModal("right")}
            />
            <div className={styles.contentBox}>
                <AvatarUpload
                    imageUrl={
                        friendDetails?.avatar
                            ? `${TMP_URL}/${friendDetails.avatar}`
                            : ""
                    }
                    onPreview={() => PreviewAvatar(friendDetails)}
                    upload={false}
                    color={
                        friendDetails?.color
                            ? `linear-gradient(25deg, ${friendDetails.color} 30%, #ddd 100%)`
                            : "linear-gradient(#ddd, #666)"
                    }
                />
                <Text
                    children={
                        friendDetails?.username
                            ? friendDetails.username
                            : "User"
                    }
                    margin="10px 0 0 0"
                    fontWeight={700}
                    center
                    color={Colors.Black}
                />
            </div>
            <div className={styles.formBox}>
                <div className={styles.formItem}>
                    <Text
                        children="Username"
                        color={Colors.Black}
                        fontWeight={600}
                        fontSize="14px"
                        style={{ width: "50%" }}
                    />
                    <Text
                        children={friendDetails?.username}
                        color={Colors.Gray}
                        fontWeight={500}
                        fontSize="13px"
                        style={{ width: "50%" }}
                        moreDot
                    />
                </div>
                <div className={styles.formItem}>
                    <Text
                        children="Name"
                        color={Colors.Black}
                        fontWeight={600}
                        fontSize="14px"
                        style={{ width: "50%" }}
                    />
                    <Text
                        children={friendDetails?.name}
                        color={Colors.Gray}
                        fontWeight={600}
                        fontSize="13px"
                        style={{ width: "50%" }}
                        moreDot
                    />
                </div>
                <div className={styles.formItem}>
                    <Text
                        children="Email"
                        color={Colors.Black}
                        fontWeight={600}
                        fontSize="14px"
                        style={{ width: "50%" }}
                    />
                    <Text
                        children={friendDetails?.email}
                        color={Colors.Gray}
                        fontWeight={500}
                        fontSize="13px"
                        style={{ width: "50%" }}
                        moreDot
                    />
                </div>
                <div className={styles.formItem}>
                    <Text
                        children="City"
                        color={Colors.Black}
                        fontWeight={500}
                        fontSize="14px"
                        style={{ width: "50%" }}
                    />
                    <Text
                        children={friendDetails?.city}
                        color={Colors.Gray}
                        fontWeight={500}
                        fontSize="13px"
                        style={{ width: "50%" }}
                    />
                </div>
                <div className={styles.formItem}>
                    <Text
                        children="Age"
                        color={Colors.Black}
                        fontWeight={600}
                        fontSize="14px"
                        style={{ width: "50%" }}
                    />
                    <Text
                        children={friendDetails?.birth}
                        color={Colors.Gray}
                        fontWeight={500}
                        fontSize="13px"
                        style={{ width: "50%" }}
                    />
                </div>
                <div className={styles.formItem}>
                    <Text
                        children="Interests"
                        color={Colors.Black}
                        fontWeight={600}
                        fontSize="14px"
                        style={{ width: "50%" }}
                    />
                    <Text
                        children={friendDetails?.occupacy}
                        color={Colors.Gray}
                        fontWeight={500}
                        fontSize="13px"
                        style={{ width: "50%" }}
                    />
                </div>
            </div>
            <Text
                margin="15px 0 10px 7%"
                children={"Joint groups"}
                fontWeight={600}
                color={Colors.Black}
            />
            <motion.div variants={container} initial="hidden" animate="visible">
                {friendDetails?.channels?.length !== 0 ? (
                    friendDetails?.channels?.map((e, index) => {
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
            <ButtonComponent
                margin="20px 7% 15px 7%"
                width="86%"
                color={isFriend ? Colors.Red : Colors.White}
                text={isFriend ? "unfriend" : "+ add as friend"}
                clickMe={handeCreateOrDelete}
            />
        </div>
    );
};

export default observer(ChannelInUser);
