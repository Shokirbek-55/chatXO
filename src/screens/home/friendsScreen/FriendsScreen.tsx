import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import MessageBox from '../../../components/MessageBox';
import RowItemView from '../../../components/RowItem';
import { TMP_URL } from '../../../env';
import { friend } from '../../../store/dataBase';
import { InputComponent } from '../../../utils/inputComponent';
import styles from "./FriendsScreen.module.css"
import Header from '../../../components/Header/Header';
import Text from '../../../components/Text/Text';
import useRootStore from '../../../hooks/useRootStore';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import Loading from '../../../utils/loading';

const FriendsScreen = () => {
    const navigation = useNavigate()
    const { getFriends, friends, deleteFriend, loading } = useRootStore().friendsStore
    const { t } = useTranslation()
    const handleChangeText = () => { }

    useEffect(() => {
        getFriends()
    }, [])

    return (
        <div className={styles.container}>
            <Header
                text={`${t("friends")}`}
                leftIcon={"addUser"}
                onLeftIconPress={() => navigation("/add-friends")}
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
            <Loading isLoad={loading} />
            <div className={styles.main}>
                {friends?.length !== 0 ?
                    friends?.map((e, index) => {
                        return (
                            <div key={index}>
                                <RowItemView
                                    title={`${t("unfriend")}`}
                                    imageUrl={e.avatar ? `${TMP_URL}/${e.avatar}` : ""}
                                    color={e.color ? e.color : "linear-gradient(#ddd, #666)"}
                                    text={e.username}
                                    onButtonPress={() => deleteFriend(e.id)}
                                    rightButton
                                    loading={false}
                                />
                            </div>
                        );
                    }) :
                    <MessageBox title={`${t("no_avalible_friends")}`} />
                }
            </div>
        </div>
    )
}

export default observer(FriendsScreen)
