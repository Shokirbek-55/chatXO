import { motion } from "framer-motion";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import Header from "../../../components/Header/Header";
import MessageBox from "../../../components/MessageBox/MessageBox";
import RowItemView from "../../../components/RowItem";
import SearchInput from "../../../components/SearchInput/SearchInput";
import Text from "../../../components/Text/Text";
import { TMP_URL } from "../../../env";
import useRootStore from "../../../hooks/useRootStore";
import { InputComponent } from "../../../utils/inputComponent";
import styles from "./FriendsScreen.module.css";

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

const FriendsScreen = () => {
    const { friends, deleteFriend, loading, getFriendsFilter } =
        useRootStore().friendsStore;
    const { toRouter, closeModal } = useRootStore().routerStore;
    const { getFriendDetails } = useRootStore().usersStore;
    const { t } = useTranslation();
    const handleChangeText = (key: string) => {
        getFriendsFilter(key);
    };

    const FriendDetails = (friendId: number) => {
        getFriendDetails(friendId);
        toRouter("friendDetails");
    };

    return (
        <div className={styles.container}>
            <Header
                style={{ zIndex: 1 }}
                text={`${t("friends")}`}
                leftIcon={"arrowLeft"}
                onLeftIconPress={() => closeModal("left")}
            />
            <div className={styles.searchBox}>
                <SearchInput
                    onChange={handleChangeText}
                    placeholder={`${t("searchPlaceholder")}`}
                />
            </div>
            <div className={styles.main}>
                {!friends && (
                    <div className={styles.loadingError}>
                        <MessageBox title={`${t("No Internet Connection")}`} />
                    </div>
                )}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    className={styles.contentBox}
                >
                    {friends?.length > 0 ? (
                        friends?.map((e, index) => {
                            return (
                                <motion.div
                                    variants={item}
                                    key={index}
                                    id="map-dev"
                                    className={styles.channelRowBox}
                                >
                                    <RowItemView
                                        title={`${t("unfriend")}`}
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
                                        text={e.username}
                                        onButtonPress={() =>
                                            deleteFriend(e.id ? e.id : 0)
                                        }
                                        onNamePress={() =>
                                            FriendDetails(e.id ? e.id : 0)
                                        }
                                        // rightButton
                                        loading={false}
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

export default observer(FriendsScreen);
