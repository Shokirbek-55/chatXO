import React from 'react'
import { useTranslation } from 'react-i18next'
import AvatarUpload from '../../../components/AvatarUpload/AvatarUpload'
import Header from '../../../components/Header/Header'
import Input from '../../../components/Input'
import SimpleSwitch from '../../../components/SimpleSwitch/switch'
import Text from '../../../components/Text/Text'
import { data } from '../../../store/dataBase'
import { ButtonComponent } from '../../../utils/button'
import styles from "./EditChannel.module.css"

const EditChannel = () => {
    const { t } = useTranslation()
    const onChangeInput = (value: string, keyName: string) => {
        // setChannelData((d) => ({ ...d, [keyName]: value }));
    };
    return (
        <div className={styles.editChannel}>
            <Header
                leftIcon="close"
                text={t("editGroup")}
            />
            <div className={styles.container}>
                <div className={styles.topBox}>
                    <div className={styles.leftBox}>
                        <Text text={`${t("groupsNumber")}`} />
                        <h4>{data?.groupNumber}</h4>
                        <Text text={`${t("groupsInvite")}`} />
                        <h4>{data.inviteCode}</h4>
                    </div>
                    <div className={styles.rightBox}>
                        <AvatarUpload
                            imageUrl={
                                data?.avatar ? data.avatar : ""
                            }
                            color={
                                data?.color
                                    ? data?.color
                                    : "linear-gradient(#ddd, #666)"
                            }
                            upload={true}
                        />
                    </div>
                </div>
                <div className={styles.centerBox}>
                    <div className={styles.rowBtnBox}>
                        <ButtonComponent
                            text={`${t("generateNew")}`}
                            icon=""
                            iconColor="#fff"
                            textSize={14}
                            padding="5px 0"
                        />
                        <ButtonComponent
                            text={`${t("noPassword")}`}
                            backColor="#03053f"
                            textSize={14}
                            icon=""
                        />
                    </div>
                    <div className={styles.btnBox}>
                        <ButtonComponent
                            text={`${t("newAdmin")}`}
                            backColor="red"
                            icon="newAdmin"
                        />
                    </div>
                </div>
                <div className={styles.bottomBox}>
                    <Text children={t("type_group")} />
                    <div style={{ marginTop: "10px" }}>
                        <SimpleSwitch
                            switchValue={data?.isPrivate}
                            onText={`${t("group_is_private")}`}
                            offText={`${t("group_is_open")}`}
                            isPrivate={(e: any) => onChangeInput(e, "isPrivate")}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.addUsersBox}>
                <Text style={{ paddingLeft: "10px" }} text={`${t("groupsName")}`} />
                <Input
                    borderred
                    name={data?.name}
                    value={data?.name}
                    setUserName={(e) => onChangeInput(e, "name")}
                />
                <div
                    style={{
                        margin: "20px auto",
                        display: "flex",
                        justifyContent: "center",
                        width: "90%",
                    }}
                >
                    <ButtonComponent
                        text={`${t("addParticipant")}`}
                        backColor="yellowGreen"
                        icon=""
                        width="100%"
                    />
                </div>
                <div className={styles.rowBtnBox}>
                    <ButtonComponent
                        text={`${t("deleteGroup")}`}
                        backColor="red"
                        icon=""
                        textSize={14}
                        color="#fff"
                        iconColor="#fff"
                        iconSize={20}
                    />
                    <ButtonComponent
                        text={`${t("update")}`}
                        backColor="yellowGreen"
                        icon=""
                        textSize={14}
                    />
                </div>
            </div>
        </div>
    )
}

export default EditChannel
