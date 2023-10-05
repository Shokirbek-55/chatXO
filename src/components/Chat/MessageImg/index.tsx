import { FC } from "react";
import { Env } from "../../../env";
import { ChannelsUsersType, RawMessage } from "../../../types/channel";
import MessageComponent from "../MessageComponent/MessageComponent";
import styles from "./index.module.css";

interface Props {
    message: RawMessage;
    own: boolean;
    users?: {
        [key: string]: ChannelsUsersType;
    };
    onPress?: () => void;
}

const MessageImg: FC<Props> = ({ message, own, users, onPress }) => {
    const url = message.mediaUrl;

    return (
        <MessageComponent position={own} message={message} users={users}>
            <img
                src={`${Env.AssetsUrl}/${url}`}
                alt="#"
                className={styles.imgCard}
                onClick={onPress}
            />
        </MessageComponent>
    );
};

export default MessageImg;
