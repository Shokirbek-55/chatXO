import React, { CSSProperties } from 'react'
import styles from "./smallAvatar.module.css"
interface Props {
    imageUrl?: string;
    color?: string;
    onPress?: () => void;
    style?: CSSProperties;
}

const SmallAvatar: React.FC<Props> = ({
    imageUrl,
    color,
    onPress,
    style
}) => {
    style = color ? { ...style, background: color } : { ...style, background: "linear-gradient(#ddd, #666)" };
    return (
        <div onClick={onPress} className={styles.container} style={{ ...style }}>
            {imageUrl ? <img className={styles.imageBox} src={imageUrl} /> : null}
        </div>
    )
}

export default SmallAvatar
