import React, { CSSProperties } from "react";
import styles from "./channelAvatar.module.css";
interface Props {
    imageUrl?: string;
    color?: string;
    name?: string;
    time?: string;
    onPress?: () => void;
    style?: CSSProperties;
}

const ChannelAvatar: React.FC<Props> = ({
    color,
    imageUrl,
    name,
    onPress,
    time,
    style,
}) => {
    style = color ? { ...style, background: color } : { ...style };
    return (
        <div
            className={styles.container}
            onClick={onPress}
            style={{ ...style }}
        >
            {imageUrl ? (
                <img className={styles.avatar} src={imageUrl} alt="" />
            ) : null}
        </div>
    );
};

export default ChannelAvatar;
