import { FC } from "react";
import { Env } from "../../../env";
import { RawMessage } from "../../../types/channel";
import styles from "./index.module.css";

interface Props {
    message: RawMessage;
    onPress?: () => void;
}

const MessageImg: FC<Props> = ({ message, onPress }) => {
    const url = message.mediaUrl;

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
