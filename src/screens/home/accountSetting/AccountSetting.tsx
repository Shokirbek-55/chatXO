import { observer } from 'mobx-react-lite'
import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import AvatarView from '../../../components/AvatarUpload/AvatarUpload'
import ButtonView from '../../../components/Button'
import Header from '../../../components/Header/Header'
import Input from '../../../components/Input'
import Text from '../../../components/Text/Text'
import { TMP_URL } from '../../../env'
import useRootStore from '../../../hooks/useRootStore'
import { getRandomColor } from '../../../utils/randomColor'
import styles from "./AccountSetting.module.css"

const AccountSetting = () => {
    const { setMyData, updateUserAccount, setUserState, createMeAvatar } = useRootStore().usersStore
    const { logout, user } = useRootStore().authStore
    const { closeModal, toRouter } = useRootStore().routerStore
    const { t } = useTranslation()

    const randomUserColor = (Color: string) => {
        setUserState('color', Color)
        updateUserAccount({ color: Color })
    }

    const onImageSelect = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files?.length) {
            const formData = new FormData();
            formData.append("avatar", e.target.files[0]);
            createMeAvatar(formData)
        }
    };


    return (
        <div className={styles.container}>
            <Header
                text={t("edit_profile")}
                leftIcon="arrowLeft"
                rightIcon="logout"
                onRightIconPress={logout}
                onLeftIconPress={() => closeModal()}
            />
            <div className={styles.ImageBox}>
                <AvatarView
                    upload={true}
                    color={setMyData.color ? setMyData.color : "linear-gradient(#ddd, #666)"}
                    imageUrl={user?.avatar ? `${TMP_URL}/${user?.avatar}` : ""}
                    onChange={(e) => onImageSelect(e)}
                />
                <Text
                    color="yellowgreen"
                    children={t("random_color")}
                    handleLink={() => randomUserColor(getRandomColor())}
                />
                <Text
                    color="yellowgreen"
                    handleLink={() => toRouter("language")}
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
                    value={setMyData.username}
                    setUserName={(e) => {
                        setUserState('username', e)
                    }}
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
                    value={setMyData.email}
                    setUserName={(e) => {
                        setUserState('email', e)
                    }}
                />
            </div>
            <div className={styles.ContentBox}>
                <ButtonView
                    style={{
                        width: "100%",
                        marginTop: "25px",
                    }}
                    title={`${t("update_profile")}`}
                    onClickbutton={() => updateUserAccount(setMyData)}
                />
                <ButtonView
                    style={{
                        width: "100%",
                        marginTop: "10px",
                        backgroundColor: "red"
                    }}
                    title={`Delate account`}
                />
            </div>
        </div>
    )
}

export default observer(AccountSetting);
