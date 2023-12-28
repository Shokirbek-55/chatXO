import { Button, message, Popconfirm, Slider, Switch } from "antd";
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
import NewInput from "../../../components/NewInput/NewInput";
import MenuItem from "../../../components/MenuItem/MenuItem";
import { MdGroup } from "react-icons/md";
import { IoMdFunnel } from "react-icons/io";
import { BsFillShareFill } from "react-icons/bs";
import Colors from "../../../utils/colors";
import { RiFileCopyFill } from "react-icons/ri";

const EditChannel = () => {
    const { t } = useTranslation();
    const { closeModal, setCurrentRoute, toRouterManageCh, closeRightSideBar } =
        useRootStore().routerStore;
    const { getFriends } = useRootStore().friendsStore;
    const navigation = useNavigate();
    const { show, toglevisible, visible } = useRootStore().visibleStore;
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

    const isPrivateGruop = (checked: boolean) => {
        setUpdateChannelState("isPrivate", checked);
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            onSelectChannelImage(e.target.files[0]);
        }
        show("chUploadFile");
    };

    const deleteEvent = () => {
        navigation("", { replace: true });
        closeRightSideBar();
    };

    const delateChannelEvent = (hashId: string) => {
        delateChannel(hashId, () => deleteEvent());
        setCurrentRoute("channels");
    };

    const addUserToChannel = () => {
        toRouterManageCh("addUserToChannel");
        getFriends();
    };

    // const generateNew = async () => {
    //     const target = (e) =>
    //         generatePath(`/:name`, {
    //             name: `@${e}`,
    //         });
    //     generateNewInvitationCode(channelData.groupNumber as string, (e) =>
    //         navigation(target(e), { replace: true })
    //     );
    // };

    // const [copyNumber, setCopyNumber] = useState(false);

    // const handleCopyNumber = (e) => {
    //     navigator.clipboard.writeText(e);
    //     setCopyNumber(true);
    //     setTimeout(() => {
    //         setCopyNumber(false);
    //     }, 3000);
    // };
    // const [copyPass, setCopyPass] = useState(false);

    // const handleCopyPass = (e) => {
    //     navigator.clipboard.writeText(e);
    //     setCopyPass(true);
    //     setTimeout(() => {
    //         setCopyPass(false);
    //     }, 3000);
    // };

    const copyChatLink = () => {
        navigator.clipboard.writeText(window.location.href);
        message.success("Copy chat link");
    };

    return (
        <div className={styles.editChannel}>
            <Header
                leftIcon="arrowLeft"
                text={t("editGroup")}
                onLeftIconPress={() => closeModal("right")}
            />
            <div className={styles.content}>
                <div className={styles.avatarBox}>
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
                </div>
                <NewInput
                    onChange={(e) => setUpdateChannelState("name", e)}
                    placeholder="Group Name"
                    margin="15px auto 15px auto"
                    width="60%"
                    fontSize="18px"
                    textAlign={"center"}
                    value={setUpdataChannel.name}
                />
                <div className={styles.descriptionBox}>
                    <textarea
                        className={styles.description}
                        rows={6}
                        placeholder="Enter description"
                        value={setUpdataChannel.description}
                        onChange={(e) =>
                            setUpdateChannelState("description", e.target.value)
                        }
                    />
                </div>
                <MenuItem
                    icon={<MdGroup size={24} />}
                    title={`Group type: ${
                        setUpdataChannel.isPrivate ? "Private" : "Public"
                    }`}
                    right={
                        <Switch
                            onChange={isPrivateGruop}
                            checked={setUpdataChannel.isPrivate}
                        />
                    }
                />
                <MenuItem
                    icon={<IoMdFunnel size={24} />}
                    title="Default relevance"
                    onClick={() => toglevisible("relevenceSliderEdit")}
                    right={
                        setUpdataChannel.defaultRelevance
                            ? setUpdataChannel.defaultRelevance
                            : "0"
                    }
                />
                <div
                    className={styles.sliderBox}
                    style={{
                        display: visible.relevenceSliderEdit ? "block" : "none",
                    }}
                >
                    <Slider
                        className={styles.slider}
                        onChange={(e) =>
                            setUpdateChannelState("defaultRelevance", e)
                        }
                    />
                </div>
                <MenuItem
                    icon={<MdGroup size={24} />}
                    title="Add participiants"
                    onClick={addUserToChannel}
                />
                <MenuItem
                    icon={<RiFileCopyFill size={24} />}
                    title="Copy chat"
                    onClick={copyChatLink}
                    right="  "
                />
                <div className={styles.btnSave}>
                    <ButtonComponent
                        text="Save"
                        width="100%"
                        clickMe={updateChannelEvent}
                    />
                </div>
            </div>
        </div>
    );
};

export default observer(EditChannel);
