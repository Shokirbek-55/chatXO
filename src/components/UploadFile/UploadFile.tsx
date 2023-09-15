import { observer } from "mobx-react-lite";
import React from "react";
import styles from "./UploadFile.module.css";
import useRootStore from "../../hooks/useRootStore";
import { TMP_URL } from "../../env";
import { CloseIcon } from "../../utils/icons";
import { Checkbox } from "antd";
import Text from "../Text/Text";

const UploadFile = () => {
    const { visible, hide } = useRootStore().visibleStore;
    const { channelAvatar } = useRootStore().channelStore;
    const { userAvatar, createMeAvatar, formData } = useRootStore().usersStore;

    const uploadAvatar = () => {
        createMeAvatar();
        hide("uploadFile");
    };

    return (
        <div
            className={styles.container}
            style={{ display: visible.uploadFile ? "block" : "none" }}
        >
            <div className={styles.fileBox}>
                <div className={styles.closeIcon}>
                    <span onClick={() => hide("uploadFile")}>
                        <CloseIcon />
                    </span>
                    <Text text="Upload this image" />
                </div>
                <img src={userAvatar} alt="" />
                <div className={styles.select} onClick={uploadAvatar}>
                    {/* <CheckIcon color="#02bafd" size={46} /> */}
                </div>
            </div>
        </div>
    );
};

export default observer(UploadFile);
