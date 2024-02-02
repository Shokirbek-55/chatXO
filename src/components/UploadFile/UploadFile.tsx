import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import Avatar from "react-avatar-edit";
import ReactCrop from "react-image-crop";
import useRootStore from "../../hooks/useRootStore";
import { CheckIcon, CloseIcon } from "../../utils/icons";
import Text from "../Text/Text";
import styles from "./UploadFile.module.css";
import { CropperRef, Cropper, Coordinates } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

const UploadFile = () => {
    const { visible, hide } = useRootStore().visibleStore;
    const [file, setFile] = useState(null);
    const cropperRef = useRef<CropperRef>(null);

    const { userAvatar, onSelectFile, createMeAvatar } =
        useRootStore().usersStore;

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

    const onUploadAvatar = () => {
        createMeAvatar(file as never);
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
                    <Text children="Upload this image" />
                </div>
                <Cropper
                    className={styles.cropper}
                    ref={cropperRef}
                    src={userAvatar}
                    onChange={onCrop}
                />
                <div className={styles.select} onClick={onUploadAvatar}>
                    <CheckIcon color="#7EA88B" size={46} />
                </div>
            </div>
        </div>
    );
};

export default observer(UploadFile);
