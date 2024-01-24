import { saveAs } from "file-saver";
import { observer } from "mobx-react-lite";
import { useState } from "react";
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
import SmallAvatar from "../SmallAvatar/smallAvatar";
import Text from "../Text/Text";
import styles from "./PreviewImage.module.css";

const PreviewImage = () => {
    const { visible, hide } = useRootStore().visibleStore;
    const { getChannelUsersData } = useRootStore().channelStore;
    const { user } = useRootStore().authStore;
    const [zoom, setZoom] = useState(1);
    const { previewData, deletePreviewAvatar } = useRootStore().usersStore;

    const newDate = new Date(
        previewData.timestamp ? previewData.timestamp : ("" as never)
    );
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);

    const options = {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "numeric",
    };
    const formattedDate = newDate.toLocaleDateString("uz-UZ", options as never);

    const clickZoomIn = () => {
        if (zoom === 2) return;
        setZoom(zoom + 0.25);
    };
    const clickZoomOut = () => {
        if (zoom === 0.25) return;
        setZoom(zoom - 0.25);
    };

    const delateAvatar = () => {
        deletePreviewAvatar();
    };

    const downloadFile = () => {
        saveAs(
            `${TMP_URL}/${previewData.avatar || previewData.mediaUrl}`,
            `${previewData.avatar || previewData.mediaUrl}`
        );
    };

    const mediaUrlOwnerImg = getChannelUsersData.find(
        (e) => e?.id === previewData.userId
    );

    const deleteVisible = previewData?.id === user.id || previewData?.adminId === user.id || previewData?.userId === user.id;

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
                        imageUrl={`${TMP_URL}/${previewData.avatar || mediaUrlOwnerImg?.avatar}`}
                    />
                </div>
                <div>
                    <Text
                        children={previewData.username || previewData.name}
                        style={{ fontSize: "20px" }}
                        color={Colors.White}
                    />
                    <Text
                        children={
                            previewData.timestamp
                                ? formattedDate
                                : "Profile photo"
                        }
                        style={{ fontSize: "12px" }}
                        color={Colors.White}
                    />
                </div>
            </div>
            <div className={styles.iconBox}>
                {deleteVisible && (
                    <span onClick={delateAvatar}>
                        <DeleteIcon size={22} color="#fff" />
                    </span>
                )}
                <span onClick={downloadFile}>
                    <DownloadIcon size={22} color="#fff" />
                </span>
                <ZoomOutIcon onClick={clickZoomOut} size={22} color="#fff" />
                <ZoomInIcon onClick={clickZoomIn} size={22} color="#fff" />
                <span onClick={() => hide("previewModal")}>
                    <CloserNoCirculIcon size={24} color="#fff" />
                </span>
            </div>
            <div className={styles.box} onClick={() => hide("previewModal")}>
                <img
                    src={`${TMP_URL}/${previewData.avatar || previewData.mediaUrl}`}
                    style={{ transform: `scale(${zoom})` }}
                    alt={previewData.username || previewData.name}
                />
            </div>
        </div>
    );
};

export default observer(PreviewImage);
