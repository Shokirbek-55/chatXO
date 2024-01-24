import { FC } from "react";
import { Env } from "../../../env";
import { RawMessage } from "../../../types/channel";
import styles from "./index.module.css";
import useRootStore from "../../../hooks/useRootStore";

interface Props {
    message: RawMessage;
}

const MessageImg: FC<Props> = ({ message }) => {
    const url = message.mediaUrl;
    const { getPreviewData } = useRootStore().usersStore;
    const { show } = useRootStore().visibleStore;


    const onPress = () => {
        getPreviewData(message as any);
        show("previewModal");

    }

    return (
        <img
            src={`${Env.AssetsUrl}/${url}`}
            alt="#"
            className={styles.imgCard}
            onClick={onPress}
        />
    );
};

export default MessageImg;
