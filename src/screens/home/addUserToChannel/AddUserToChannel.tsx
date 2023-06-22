import { observer } from 'mobx-react-lite';
import React from 'react'
import { useTranslation } from 'react-i18next';
import Header from '../../../components/Header/Header';
import MessageBox from '../../../components/MessageBox/MessageBox';
import RowItemView from '../../../components/RowItem';
import useRootStore from '../../../hooks/useRootStore';
import { motion } from "framer-motion";
import styles from "./AddUserToChannel.module.css"
import { toJS } from 'mobx';
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

const AddUserToChannel = () => {
    const { t } = useTranslation()
    const { addUserToChannel, channelData } = useRootStore().channelStore
    const { usersListForAdd } = useRootStore().friendsStore
    console.log("usersForAdd", toJS(usersListForAdd));
    const { closeModal } = useRootStore().routerStore
    return (
        <div
            style={{
                backgroundColor: "#fff",
                width: "100%",
                height: "100vh",
                overflowY: "scroll",
            }}
        >
            <Header
                text={`${t("addParticipant")}`}
                leftIcon="close"
                onLeftIconPress={() => closeModal()}
            />
            <div style={{ marginTop: "5px" }}>
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="visible">
                    {usersListForAdd?.length !== 0 ?
                        usersListForAdd?.map((e, index) => {
                            return (
                                <motion.div
                                    variants={item}
                                    key={index}
                                    id="map-dev"
                                    className={styles.channelRowBox}>
                                    <RowItemView
                                        key={index}
                                        text={e.username}
                                        loading={false}
                                        imageUrl={e.avatar ? e.avatar : ""}
                                        color={e.color ? `linear-gradient(25deg, ${e.color} 30%, #ddd 100%)` : "linear-gradient(#ddd, #666)"}
                                        rightButton={true}
                                        onButtonPress={() => addUserToChannel(channelData.hashId, e.id as any)}
                                        title={`${e.isAdded ? t("added") : t("add")}`}
                                        className={e.isAdded ? styles.added : styles.add}
                                    />
                                </motion.div>
                            );
                        }) :
                        <MessageBox title={`${t("no_avalible_friends")}`} />
                    }
                </motion.div>
            </div>
        </div>
    )
}

export default observer(AddUserToChannel)
