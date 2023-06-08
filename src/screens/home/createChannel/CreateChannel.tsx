import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import AvatarUpload from '../../../components/AvatarUpload/AvatarUpload'
import ButtonView from '../../../components/Button'
import Header from '../../../components/Header/Header'
import Input from '../../../components/Input'
import SimpleSwitch from '../../../components/SimpleSwitch/switch'
import Text from '../../../components/Text/Text'
import { getRandomColor } from '../../../utils/randomColor'
import styles from "./CreateChannel.module.css"

const CreateChannel = () => {
    const { t } = useTranslation()
    const navigation = useNavigate()
    const [state, setState] = useState()
    return (
        <div className={styles.container}>
            <Header
                text={t("createGroup")}
                leftIcon={"arrowLeft"}
                onLeftIconPress={() => navigation("")}
            />
            <div className={styles.contentBox}>
                <div className={styles.contentTop}>
                    <AvatarUpload
                        style={{ width: "140px", height: "140px", borderRadius: "50%" }}
                        color={"linear-gradient(#ddd, #666)"}
                        upload={false}
                    />
                    <Text text="Random color" handleLink={() => getRandomColor()} />
                </div>
                <div className={styles.contentBottom}>
                    <Text
                        children={t("groupsName")}
                        style={{
                            paddingLeft: "15px",
                            paddingBottom: "5px",
                            fontFamily: "Montserrat4",
                        }}
                    />
                    <Input
                        borderred
                    />

                    <Text
                        children={t("type_group")}
                        style={{
                            fontSize: "15px",
                            padding: "10px",
                            fontFamily: "Montserrat4",
                        }}
                    />
                    <div className={styles.switchBox}>
                        <SimpleSwitch
                            style={{
                                padding: "10px",
                                fontFamily: "Montserrat3",
                            }}

                            onText={`${t("group_is_private")}`}
                            offText={`${t("group_is_open")}`}
                            isPrivate={(e) => setState(e as never)}
                        />
                    </div>
                    <ButtonView title={`${t("create")}`} />
                </div>
            </div>
        </div>
    )
}

export default CreateChannel
