import { observer } from "mobx-react-lite";
import React, { useRef, useState } from "react";
import useRootStore from "../../hooks/useRootStore";
import { TMP_URL } from "../../env";
import { CheckIcon, CloseIcon } from "../../utils/icons";
import Text from "../Text/Text";
import styles from "./UploadChannelFIle.module.css";
import { Cropper, CropperRef } from "react-advanced-cropper";

const UploadChannelFile = () => {
    const { visible, hide } = useRootStore().visibleStore;
    const {
        channelAvatar,
        createChannelAvatar,
        closeSelectImage,
        createAvatar,
        setCreateChannelState,
        createFormData,
    } = useRootStore().channelStore;
    const cropperRef = useRef<CropperRef>(null);
    const [file, setFile] = useState(null);

    const onCrop = () => {
        const base64Data = cropperRef.current?.getCanvas()?.toDataURL() || "";

        const base64WithoutPrefix = base64Data.replace(
            /^data:[^;]+;base64,/,
            ""
        );

        const byteCharacters = atob(base64WithoutPrefix);
        const byteArrays = [];
        for (let i = 0; i < byteCharacters.length; i++) {
            byteArrays.push(byteCharacters.charCodeAt(i) as never);
        }
        const blob = new Blob([new Uint8Array(byteArrays)], {
            type: "application/octet-stream",
        });

        const fileName = "convertedFile";
        const convertedFile = new File([blob], fileName, {
            type: "application/octet-stream",
        });
        setFile(convertedFile as never);
    };

    const SelectChannelAvatar = () => {
        createChannelAvatar(file as never);
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
                <Cropper
                    className={styles.cropper}
                    ref={cropperRef}
                    src={channelAvatar ? channelAvatar : createAvatar}
                    onChange={onCrop}
                />
                <div className={styles.select} onClick={selectAvatar}>
                    <CheckIcon color="#7EA88B" size={46} />
                </div>
            </div>
        </div>
    );
};

export default observer(UploadChannelFile);
