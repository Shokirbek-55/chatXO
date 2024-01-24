import { observer } from "mobx-react-lite";
import useRootStore from "../../hooks/useRootStore";
import { CheckIcon, CloseIcon } from "../../utils/icons";
import Text from "../Text/Text";
import styles from "./UploadFile.module.css";

const UploadFile = () => {
    const { visible, hide } = useRootStore().visibleStore;
    const { userAvatar, createMeAvatar } = useRootStore().usersStore;

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
                    <Text children="Upload this image" />
                </div>
                <img src={userAvatar} alt="" />
                <div className={styles.select} onClick={uploadAvatar}>
                    <CheckIcon color="#02bafd" size={46} />
                </div>
            </div>
        </div>
    );
};

export default observer(UploadFile);
