import { observer } from "mobx-react-lite";
import React from "react";
import useRootStore from "../../hooks/useRootStore";
import { TMP_URL } from "../../env";
import { CheckIcon, CloseIcon } from "../../utils/icons";
import { Checkbox } from "antd";
import Text from "../Text/Text";
import styles from "./UploadChannelFIle.module.css";

const UploadChannelFile = () => {
    const { visible, hide } = useRootStore().visibleStore;
    const { channelAvatar, createChannelAvatar } = useRootStore().channelStore;

    const SelectChannelAvatar = () => {
        createChannelAvatar();
        hide("chUploadFile");
    };

    return (
        <div
            className={styles.container}
            style={{ display: visible.chUploadFile ? "block" : "none" }}
        >
            <div className={styles.fileBox}>
                <div className={styles.closeIcon}>
                    <CloseIcon />
                    <Text text="Upload this image" />
                </div>
                <img src={channelAvatar} alt="" />
                <div className={styles.select} onClick={SelectChannelAvatar}>
                    <CheckIcon color="#02bafd" size={46} />
                </div>
            </div>
        </div>
    );
};

export default observer(UploadChannelFile);
