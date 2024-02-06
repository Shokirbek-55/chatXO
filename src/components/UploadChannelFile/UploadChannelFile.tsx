import { observer } from "mobx-react-lite";
import { useState } from "react";
import Cropper from "react-easy-crop";
import useRootStore from "../../hooks/useRootStore";
import { CropAvatarStateType } from "../../store/channelStore/channelStore";
import { CheckIcon, CloseIcon } from "../../utils/icons";
import Text from "../Text/Text";
import styles from "./UploadChannelFIle.module.css";
import getCroppedImg from "./cropImg";

const UploadChannelFile = () => {
    const { visible, hide } = useRootStore().visibleStore;
    const { createMeAvatar } = useRootStore().usersStore;
    const {
        closeSelectImage,
        cropAvatarState,
        onCreateChannelImage,
        createChannelAvatar
    } = useRootStore().channelStore;
    const [cropBase, setCropBase] = useState("");
    const [file, setFile] = useState<File>();
    const [crop, onCropChange] = useState({ x: 0, y: 0 })
    const [zoom, onZoomChange] = useState(1.2)

    const onCropComplete = async (_, croppedAreaPixels) => {
        try {
            const croppedImage = await getCroppedImg(
                cropAvatarState.img,
                croppedAreaPixels,
                0,
            )
            const reader = new FileReader();
            reader.readAsDataURL(croppedImage as Blob);
            reader.onloadend = () => {
                const base64data = reader.result;
                setCropBase(base64data as string);
            };
            setFile(croppedImage as File);
        } catch (e) {
            console.error(e)
        }
    }

    const onHandle: {
        [key in CropAvatarStateType["type"]]: () => void;
    } = {
        crateChannel: () => onCreateChannelImage(cropBase),
        updataChannel: () => createChannelAvatar(file!),
        profile: () => createMeAvatar(file!)
    };

    const selectAvatar = async () => {
        if (!file) return;
        onHandle[cropAvatarState.type]();
        hide("chUploadFile");
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
                <div className={styles.cropper}>
                    <Cropper
                        image={cropAvatarState.img}
                        crop={crop}
                        zoom={zoom}
                        onCropChange={onCropChange}
                        onZoomChange={onZoomChange}
                        zoomWithScroll
                        onCropComplete={onCropComplete}
                    />
                </div>
                <div className={styles.select} onClick={selectAvatar}>
                    <CheckIcon color="#7EA88B" size={46} />
                </div>
            </div>
        </div>
    );
};

export default observer(UploadChannelFile);
