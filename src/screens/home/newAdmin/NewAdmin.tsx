import { useTranslation } from "react-i18next";
import Header from "../../../components/Header/Header";
import MessageBox from "../../../components/MessageBox/MessageBox";
import RowItemView from "../../../components/RowItem";
import useRootStore from "../../../hooks/useRootStore";
import { data } from "../../../store/dataBase";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import styles from "./NewAdmin.module.css";
import { TMP_URL } from "../../../env";

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

const NewAdmin = () => {
    const { t } = useTranslation();
    const { closeModal, toRouterManageCh } = useRootStore().routerStore;
    const { newAdmin, channelData, channelUsers } = useRootStore().channelStore;
    const { user } = useRootStore().authStore;

    const NewAdmin = async (id) => {
        newAdmin(channelData.hashId, id);
        toRouterManageCh("manageChannel");
    };

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
                leftIcon="close"
                text={t("newAdmin")}
                onLeftIconPress={() => closeModal('right')}
            />
            <div>
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="visible"
                >
                    {channelUsers.length > 0 ? (
                        channelUsers.map((e, index) => {
                            return (
                                <motion.div
                                    variants={item}
                                    key={index}
                                    id="map-dev"
                                >
                                    <RowItemView
                                        key={index}
                                        loading={false}
                                        color={
                                            e.color
                                                ? e.color
                                                : "linear-gradient(#ddd, #666)"
                                        }
                                        imageUrl={
                                            e.avatar
                                                ? `${TMP_URL}/${e.avatar}`
                                                : ""
                                        }
                                        rightButton={true}
                                        text={e.username}
                                        className={
                                            e.id === user.id
                                                ? styles.old
                                                : styles.new
                                        }
                                        title={`${
                                            e.id === user.id
                                                ? t("admin")
                                                : t("newAdmin")
                                        }`}
                                        onButtonPress={() => NewAdmin(e.id)}
                                    />
                                </motion.div>
                            );
                        })
                    ) : (
                        <MessageBox title={`${t("No available members")}`} />
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default observer(NewAdmin);
