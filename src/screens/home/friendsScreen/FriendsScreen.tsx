import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import MessageBox from '../../../components/MessageBox';
import RowItemView from '../../../components/RowItem';
import { TMP_URL } from '../../../env';
import { InputComponent } from '../../../utils/inputComponent';
import styles from "./FriendsScreen.module.css"
import Header from '../../../components/Header/Header';
import Text from '../../../components/Text/Text';
import useRootStore from '../../../hooks/useRootStore';
import { observer } from 'mobx-react-lite';
import Loading from '../../../utils/loading';
import { motion } from "framer-motion";

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

const FriendsScreen = () => {
    const navigation = useNavigate()
    const { getFriends, friends, deleteFriend, loading, getFriendsFilter } = useRootStore().friendsStore
    const { toRouter } = useRootStore().routerStore
    const { t } = useTranslation()

    const handleChangeText = (key: string) => {
        getFriendsFilter(key)
    }

    useEffect(() => {
        getFriends()
    }, [])

    return (
        <div className={styles.container}>
            <Header
                style={{zIndex:1}}
                text={`${t("friends")}`}
                leftIcon={"addUser"}
                onLeftIconPress={() => toRouter('addFriends')}
                rightIcon={"account"}
                onRightIconPress={() => navigation("/account/friends")}
            />
            <div className={styles.searchBox}>
                <InputComponent
                    onChangeText={handleChangeText}
                    placeholder={`${t("searchPlaceholder")}`}
                />
                <Text
                    style={{
                        fontFamily: "Montserrat5",
                        fontSize: "18px",
                        padding: "5px",
                    }}
                    center
                    numbers={friends?.flat().length}
                    children={t("friends")}
                />
            </div>
            <div className={styles.main}>
                <Loading isLoad={loading} />
                {false && (
                    <div className={styles.loadingBox}>
                        <Loading isLoad={loading} />
                    </div>
                )}
                {!friends && (
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
                                    className={styles.channelRowBox}
                                >
                                    <RowItemView
                                        title={`${t("unfriend")}`}
                                        imageUrl={e.avatar ? `${TMP_URL}/${e.avatar}` : ""}
                                        color={e.color ? e.color : "linear-gradient(#ddd, #666)"}
                                        text={e.username}
                                        onButtonPress={() => deleteFriend(e.id ? e.id : 0)}
                                        rightButton
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
    )
}

export default observer(FriendsScreen)
