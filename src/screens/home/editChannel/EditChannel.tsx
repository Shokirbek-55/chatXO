import { message } from "antd";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { generatePath, useNavigate } from "react-router-dom";
import APIs from "../../../api/api";
import AvatarUpload from "../../../components/AvatarUpload/AvatarUpload";
import Header from "../../../components/Header/Header";
import Input from "../../../components/Input";
import SimpleSwitch from "../../../components/SimpleSwitch/switch";
import Text from "../../../components/Text/Text";
import { TMP_URL } from "../../../env";
import useRootStore from "../../../hooks/useRootStore";
import { ButtonComponent } from "../../../utils/button";
import { CoppyIcon } from "../../../utils/icons";
import { getRandomColor } from "../../../utils/randomColor";
import styles from "./EditChannel.module.css";
import { BiCopy } from "react-icons/bi";
import { BiCheck } from "react-icons/bi";

const EditChannel = () => {
    const { t } = useTranslation();
    const { closeModal, toRouter, toRouterManageCh } =
        useRootStore().routerStore;
    const { getFriends } = useRootStore().friendsStore;
    const navigation = useNavigate();
    const { show } = useRootStore().visibleStore;
    const {
        channelData,
        setUpdateChannelState,
        updateChannel,
        generateNewInvitationCode,
        delateChannel,
        createChannelAvatar,
        setUpdataChannel,
        channelAvatar,
        channelAvatarLoading,
        onSelectChannelImage,
    } = useRootStore().channelStore;

    const updateChannelEvent = () => {
        updateChannel(setUpdataChannel);
    };
    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            onSelectChannelImage(e.target.files[0]);
        }
        show("chUploadFile");
    };

    const delateChannelEvent = (hashId: string) => {
        delateChannel(hashId);
        toRouter("channels");
    };

    const addUserToChannel = () => {
        toRouterManageCh("addUserToChannel");
        getFriends();
    };

    const generateNew = async () => {
        const target = (e) =>
            generatePath(`/:name`, {
                name: `@${e}`,
            });
        generateNewInvitationCode(channelData.groupNumber as string, (e) =>
            navigation(target(e), { replace: true })
        );
    };

    const [copyNumber, setCopyNumber] = useState(false);

    const handleCopyNumber = (e) => {
        navigator.clipboard.writeText(e);
        setCopyNumber(true);
        setTimeout(() => {
            setCopyNumber(false);
        }, 3000);
    };
    const [copyPass, setCopyPass] = useState(false);

    const handleCopyPass = (e) => {
        navigator.clipboard.writeText(e);
        setCopyPass(true);
        setTimeout(() => {
            setCopyPass(false);
        }, 3000);
    };

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
                        <Text children={`${t("groupsNumber")}`} />
                        <span
                            className={styles.copyBox}
                            onClick={() =>
                                handleCopyNumber(channelData.groupNumber)
                            }
                        >
                            <Text
                                children={channelData.groupNumber}
                                style={{
                                    fontSize: "15px",
                                    fontFamily: "Montserrat5",
                                    color: "#03053F",
                                }}
                            />
                            {copyNumber ? (
                                <BiCheck size={16} />
                            ) : (
                                <BiCopy size={14} />
                            )}
                        </span>
                        <Text
                            margin="10px 0 0 0"
                            children={`${t("groupsInvite")}`}
                        />
                        <span
                            className={styles.copyBox}
                            onClick={() =>
                                handleCopyPass(
                                    channelData.invitationCodes[0]?.code || ""
                                )
                            }
                        >
                            <Text
                                children={
                                    channelData.invitationCodes[0]?.code || ""
                                }
                                style={{
                                    fontSize: "15px",
                                    fontFamily: "Montserrat5",
                                    color: "#03053F",
                                }}
                            />
                            {copyPass ? (
                                <BiCheck size={16} />
                            ) : (
                                <BiCopy size={14} />
                            )}
                        </span>
                    </div>
                    <div className={styles.rightBox}>
                        <AvatarUpload
                            imageUrl={
                                channelAvatar
                                    ? channelAvatar
                                    : setUpdataChannel.avatar
                                    ? `${TMP_URL}/${setUpdataChannel.avatar}`
                                    : ""
                            }
                            loading={channelAvatarLoading}
                            color={
                                channelData.color
                                    ? `linear-gradient(25deg, ${channelData.color} 30%, #ddd 100%)`
                                    : "linear-gradient(#ddd, #666)"
                            }
                            upload={true}
                            onChange={(e) => handleFileChange(e)}
                        />
                        <Text
                            margin="6px 0 10px 0"
                            color="yellowgreen"
                            children="Random color"
                            handleLink={() =>
                                setUpdateChannelState("color", getRandomColor())
                            }
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
                            clickMe={generateNew}
                        />
                        <ButtonComponent
                            text={`${t("newAdmin")}`}
                            backColor="red"
                            icon="newAdmin"
                            clickMe={() => toRouterManageCh("newAdmin")}
                        />
                    </div>
                </div>
                <div className={styles.bottomBox}>
                    <SimpleSwitch
                        switchValue={channelData.isPrivate}
                        offOpen="Public"
                        onOpen="Private"
                        onText={`${t("group_is_private")}`}
                        offText={`${t("group_is_open")}`}
                        isPrivate={(e) =>
                            setUpdateChannelState("isPrivate", e as never)
                        }
                    />
                </div>
            </div>
            <div className={styles.addUsersBox}>
                <Text
                    style={{ paddingLeft: "10px" }}
                    children={`${t("groupsName")}`}
                />
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
    );
};

export default observer(EditChannel);
