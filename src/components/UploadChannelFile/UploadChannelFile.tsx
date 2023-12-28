import { observer } from "mobx-react-lite";
import React from "react";
import useRootStore from "../../hooks/useRootStore";
import { TMP_URL } from "../../env";
import { CheckIcon, CloseIcon } from "../../utils/icons";
import Text from "../Text/Text";
import styles from "./UploadChannelFIle.module.css";

const UploadChannelFile = () => {
    const { visible, hide } = useRootStore().visibleStore;
    const {
        channelAvatar,
        createChannelAvatar,
        closeSelectImage,
        createAvatar,
        setCreateChannelState,
    } = useRootStore().channelStore;

    const SelectChannelAvatar = () => {
        createChannelAvatar();
        hide("chUploadFile");
    };

    const CreateChannelAvatar = () => {
        setCreateChannelState("avatar", createAvatar);
        hide("chUploadFile");
    };

    const selectAvatar = () => {
        if (channelAvatar) {
            SelectChannelAvatar();
        }
        if (createAvatar) {
            CreateChannelAvatar();
        }
    };

    return (
        <div
            className={styles.container}
            style={{ display: visible.chUploadFile ? "block" : "none" }}
        >
            <div className={styles.fileBox}>
                <div className={styles.closeIcon}>
                    <span onClick={closeSelectImage}>
                        <CloseIcon />
                    </span>
                    <Text children="Upload this image" />
                </div>
                <img
                    src={channelAvatar ? channelAvatar : createAvatar}
                    alt=""
                />
                <div className={styles.select} onClick={selectAvatar}>
                    <CheckIcon color="#02bafd" size={46} />
                </div>
            </div>
        </div>
    );
};

export default observer(UploadChannelFile);
