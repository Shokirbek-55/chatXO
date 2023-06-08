import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import AvatarView from '../../../components/AvatarUpload/AvatarUpload'
import ButtonView from '../../../components/Button'
import Header from '../../../components/Header/Header'
import Input from '../../../components/Input'
import Text from '../../../components/Text/Text'
import { TMP_URL } from '../../../env'
import { myData } from '../../../store/dataBase'
import Colors from '../../../utils/colors'
import { getRandomColor } from '../../../utils/randomColor'
import styles from "./AccountSetting.module.css"

const AccountSetting = () => {
    const navigation = useNavigate()
    const { t } = useTranslation()
    return (
        <div className={styles.container}>
            <Header
                text={t("edit_profile")}
                leftIcon="arrowLeft"
                rightIcon="logout"
                onLeftIconPress={() => navigation(-1)}
            />

            <div className={styles.ImageBox}>
                <AvatarView
                    upload={true}
                    color={myData.color ? myData.color : "linear-gradient(#ddd, #666)"}
                    imageUrl={myData.avatar ? myData.avatar : ""}
                />
                <Text
                    color={Colors.LightGreen}
                    children={t("random_color")}
                    handleLink={() => getRandomColor()}
                />
                <Text
                    handleLink={() => navigation("")}
                    children={t("change_language")}
                />
            </div>
            <div className={styles.ContentBox}>
                <Text
                    style={{
                        paddingTop: "3px",
                    }}
                    children={t("username")}
                />
                <Input
                    name={myData.username}
                    value={myData.username}
                />
            </div>
            <div className={styles.ContentBox}>
                <Text
                    style={{
                        marginTop: "10px",
                    }}
                    children={t("your_email")}
                />
                <Input
                    name={myData.email}
                    value={myData.email}
                />
            </div>
            <div className={styles.ContentBox}>
                <ButtonView
                    style={{
                        width: "100%",
                        marginTop: "25px",
                    }}
                    title={`${t("update_profile")}`}
                />
                <ButtonView
                    style={{
                        width: "100%",
                        marginTop: "10px",
                        backgroundColor: "red"
                    }}
                    title={`${t("Delate account")}`}
                />
            </div>
        </div>
    )
}

export default AccountSetting
