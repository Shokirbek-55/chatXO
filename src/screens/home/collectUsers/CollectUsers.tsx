import React from "react";
import { observer } from "mobx-react-lite";
import Header from "../../../components/Header/Header";
import MessageBox from "../../../components/MessageBox/MessageBox";
import RowItemView from "../../../components/RowItem";
import useRootStore from "../../../hooks/useRootStore";
import { motion } from "framer-motion";
import styles from "./CollectUsers.module.css";
import { toJS } from "mobx";
import { TMP_URL } from "../../../env";
import { useTranslation } from "react-i18next";
import SearchInput from "../../../components/SearchInput/SearchInput";

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.2,
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

const CollectUsers = () => {
    const { t } = useTranslation();
    const { channelData } = useRootStore().channelStore;
    const { collectUserList, setCollectUser, friends, usersListForAdd } =
        useRootStore().friendsStore;

    console.log("setCollectUser", toJS(collectUserList));

    const { closeModal } = useRootStore().routerStore;

    return (
        <div>
            <Header
                text={`${t("addParticipant")}`}
                leftIcon="arrowLeft"
                onLeftIconPress={() => closeModal("left")}
            />
            <div className={styles.searchBox}>
                <SearchInput
                    onChange={() => {}}
                    placeholder={`${t("searchPlaceholder")}`}
                />
            </div>
            <div style={{ marginTop: "5px" }}>
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="visible"
                >
                    {usersListForAdd?.length !== 0 ? (
                        usersListForAdd?.map((e, index) => {
                            return (
                                <motion.div
                                    variants={item}
                                    key={index}
                                    id="map-dev"
                                    className={styles.channelRowBox}
                                >
                                    <RowItemView
                                        key={index}
                                        text={e.username}
                                        loading={false}
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
                                        rightButton={true}
                                        onButtonPress={() =>
                                            setCollectUser(e.id as never)
                                        }
                                        title={`${
                                            e.isAdded ? t("added") : t("add")
                                        }`}
                                        className={
                                            e.isAdded
                                                ? styles.added
                                                : styles.add
                                        }
                                    />
                                </motion.div>
                            );
                        })
                    ) : (
                        <MessageBox title={`${t("no_avalible_friends")}`} />
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default observer(CollectUsers);
