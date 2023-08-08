import { observer } from 'mobx-react-lite'
import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import AvatarUpload from '../../../components/AvatarUpload/AvatarUpload'
import Header from '../../../components/Header/Header'
import Input from '../../../components/Input'
import SimpleSwitch from '../../../components/SimpleSwitch/switch'
import Text from '../../../components/Text/Text'
import { TMP_URL } from '../../../env'
import useRootStore from '../../../hooks/useRootStore'
import { ButtonComponent } from '../../../utils/button'
import { getRandomColor } from '../../../utils/randomColor'
import styles from "./EditChannel.module.css"

const EditChannel = () => {
    const { t } = useTranslation()
    const { closeModal, toRouter, toRouterManageCh } = useRootStore().routerStore
    const { getFriends } = useRootStore().friendsStore
    const {
        channelData,
        setUpdateChannelState,
        updateChannel,
        generateNewInvitationCode,
        delateChannel,
        createChannelAvatar,

    } = useRootStore().channelStore

    const updateChannelEvent = () => {
        updateChannel()
        toRouter("channels")
    }

    const delateChannelEvent = (hashId: string) => {
        delateChannel(hashId)
        toRouter("channels")
    }

    const addUserToChannel = () => {
        toRouter("addUserToChannel")
        getFriends()
    }

    return (
        <div className={styles.editChannel}>
            <Header
                leftIcon="close"
                text={t("editGroup")}
                onLeftIconPress={() => closeModal()}
            />
            <div className={styles.container}>
                <div className={styles.topBox}>
                    <div className={styles.leftBox}>
                        <Text text={`${t("groupsNumber")}`} />
                        <Text
                            text={channelData.groupNumber}
                            style={{
                                fontSize: "15px",
                                fontFamily: "Montserrat5",
                                color: "#03053F"
                            }}
                        />
                        <Text margin='10px 0 0 0' text={`${t("groupsInvite")}`} />
                        <Text
                            text={channelData.invitationCodes[0]?.code || ""}
                            style={{
                                fontSize: "15px",
                                fontFamily: "Montserrat5",
                                color: "#03053F"
                            }}
                        />
                    </div>
                    <div className={styles.rightBox}>
                        <AvatarUpload
                            imageUrl={
                                channelData.avatar ? `${TMP_URL}/${channelData.avatar}` : ""
                            }
                            color={
                                channelData.color
                                    ? `linear-gradient(25deg, ${channelData.color} 30%, #ddd 100%)`
                                    : "linear-gradient(#ddd, #666)"
                            }
                            upload={true}
                            onChange={(e) => createChannelAvatar(channelData.hashId, e)}
                        />
                        <Text margin='6px 0 10px 0'
                            color="yellowgreen"
                            text="Random color"
                            handleLink={() => setUpdateChannelState("color", getRandomColor())}
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
                            clickMe={() => generateNewInvitationCode(channelData.groupNumber as string)}
                        />
                        <ButtonComponent
                            text={`${t("newAdmin")}`}
                            backColor="red"
                            icon="newAdmin"
                            clickMe={() => toRouter("newAdmin")}
                        />
                    </div>
                </div>
                <div className={styles.bottomBox}>
                    <SimpleSwitch
                        switchValue={channelData.isPrivate}
                        offOpen="Public"
                        onOpen='Private'
                        onText={`${t("group_is_private")}`}
                        offText={`${t("group_is_open")}`}
                        isPrivate={(e) => setUpdateChannelState("isPrivate", e as never)}
                    />
                </div>
            </div>
            <div className={styles.addUsersBox}>
                <Text style={{ paddingLeft: "10px" }} text={`${t("groupsName")}`} />
                <Input
                    borderred
                    name={channelData.name}
                    value={channelData.name}
                    setUserName={(e) => setUpdateChannelState("name", e)}
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
                        clickMe={addUserToChannel}
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
                        clickMe={() => delateChannelEvent(channelData.hashId)}
                    />
                    <ButtonComponent
                        text={`${t("update")}`}
                        backColor="yellowGreen"
                        icon=""
                        textSize={14}
                        clickMe={updateChannelEvent}
                    />
                </div>
            </div>
        </div>
    )
}

export default observer(EditChannel)
