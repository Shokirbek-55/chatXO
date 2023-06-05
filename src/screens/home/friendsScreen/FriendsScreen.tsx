import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import HeaderView from '../../../components/Header';
import MessageBox from '../../../components/MessageBox';
import RowItemView from '../../../components/RowItem';
import TextView from '../../../components/Text';
import { TMP_URL } from '../../../env';
import { friend } from '../../../store/dataBase';
import { InputComponent } from '../../../utils/inputComponent';
import styles from "./FriendsScreen.module.css"

const FriendsScreen = () => {
    const navigation = useNavigate()
    const { t } = useTranslation()
    const handleChangeText = () => { }
    return (
        <div>
            <div className={styles.container}>
                <HeaderView
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
                    <TextView
                        style={{
                            fontFamily: "Montserrat5",
                            fontSize: "18px",
                            padding: "5px",
                        }}
                        center
                        numbers={friend?.flat().length}
                        children={t("friends")}
                    />
                </div>
                <div className={styles.main}>
                    {friend?.length !== 0 ?
                        friend?.map((e, index) => {
                            return (
                                <div key={index}>
                                    <RowItemView
                                        title={`${t("unfriend")}`}
                                        imageUrl={e.avatar ? `${TMP_URL}/${e.avatar}` : ""}
                                        color={e.color ? e.color : "linear-gradient(#ddd, #666)"}
                                        text={e.username}
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
        </div>
    )
}

export default FriendsScreen
