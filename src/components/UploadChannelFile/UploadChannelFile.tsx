import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import { Cropper, CropperRef } from "react-advanced-cropper";
import useRootStore from "../../hooks/useRootStore";
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
        onConvertedFile,
        onCreateConvertedFile,
        onSetCreateChannelImage,
        setCreateChannelData,
    } = useRootStore().channelStore;
    const cropperRef = useRef<CropperRef>(null);
    console.log("setCreateChannelData", toJS(setCreateChannelData));

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
        onConvertedFile(convertedFile);
        onCreateConvertedFile(convertedFile);
    };

    const SelectChannelAvatar = () => {
        createChannelAvatar();
        closeSelectImage();
    };

    const CreateChannelAvatar = () => {
        onSetCreateChannelImage();
        closeSelectImage();
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
