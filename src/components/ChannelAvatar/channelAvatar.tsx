import React, { CSSProperties } from 'react'
import styles from "./channelAvatar.module.css"
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
    style
}) => {
    style = color ? { ...style, background: color } : { ...style };
    return (
        <div className={styles.container} onClick={onPress} style={{ ...style }}>
            {imageUrl ?
                <img className={styles.avatar} src={imageUrl} alt="" />
                : null
            }
            <div className={styles.nameBox}>
                <p className={styles.channelName}>
                    {name && name?.length > 8 ? `${name?.slice(0, 6)}...` : name}
                </p>
            </div>
        </div>
    )
}

export default ChannelAvatar
