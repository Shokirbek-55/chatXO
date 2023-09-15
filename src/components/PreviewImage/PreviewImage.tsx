import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { TMP_URL } from "../../env";
import useRootStore from "../../hooks/useRootStore";
import Colors from "../../utils/colors";
import {
    CloserNoCirculIcon,
    DeleteIcon,
    DownloadIcon,
    ZoomInIcon,
    ZoomOutIcon,
} from "../../utils/icons";
import RowItemView from "../RowItem";
import SmallAvatar from "../SmallAvatar/smallAvatar";
import Text from "../Text/Text";
import styles from "./PreviewImage.module.css";

const PreviewImage = () => {
    const { visible, hide } = useRootStore().visibleStore;
    const { user } = useRootStore().authStore;
    const [zoom, setZoom] = useState(1);
    const { previewData, deletePreviewAvatar } = useRootStore().usersStore;
    const clickZoomIn = () => {
        let zoomClone = zoom;
        if (zoomClone < 1.75) {
            setZoom(zoomClone + 0.25);
        } else {
            setTimeout(() => {
                setZoom(1);
            }, 1500);
        }
    };
    const clickZoomOut = () => {
        let zoomClone = zoom;
        if (zoomClone > 0.5) {
            setZoom(zoomClone - 0.25);
        } else {
            setTimeout(() => {
                setZoom(1);
            }, 1500);
        }
    };

    const delateAvatar = () => {
        deletePreviewAvatar();
    };

    return (
        <div
            className={styles.container}
            style={{ display: visible.previewModal ? "block" : "none" }}
        >
            <div
                className={styles.rowItem}
                onClick={() => hide("previewModal")}
            >
                <div>
                    <SmallAvatar
                        color={previewData.color}
                        imageUrl={`${TMP_URL}/${previewData.avatar}`}
                    />
                </div>
                <div>
                    <Text
                        text={
                            previewData.username
                                ? previewData.username
                                : previewData.name
                        }
                        style={{ fontSize: "20px" }}
                        color={Colors.White}
                    />
                    <Text
                        text="Profile photo"
                        style={{ fontSize: "12px" }}
                        color={Colors.White}
                    />
                </div>
            </div>
            <div className={styles.iconBox}>
                {previewData.id === user.id ||
                previewData.adminId === user.id ? (
                    <span onClick={delateAvatar}>
                        <DeleteIcon size={22} color="#fff" />
                    </span>
                ) : null}
                <DownloadIcon size={22} color="#fff" />
                <ZoomOutIcon onClick={clickZoomOut} size={22} color="#fff" />
                <ZoomInIcon onClick={clickZoomIn} size={22} color="#fff" />
                <span onClick={() => hide("previewModal")}>
                    <CloserNoCirculIcon size={24} color="#fff" />
                </span>
            </div>
            <div className={styles.box} onClick={() => hide("previewModal")}>
                <img
                    src={`${TMP_URL}/${previewData.avatar}`}
                    style={{ transform: `scale(${zoom})` }}
                />
            </div>
        </div>
    );
};

export default observer(PreviewImage);
