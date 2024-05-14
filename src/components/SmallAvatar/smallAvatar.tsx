import React, { CSSProperties } from "react";
import styles from "./smallAvatar.module.css";
interface Props {
  imageUrl?: string;
  color?: string;
  onPress?: () => void;
  style?: CSSProperties;
  forMessage?: boolean;
}

const SmallAvatar: React.FC<Props> = ({
  imageUrl,
  color,
  onPress,
  style,
  forMessage,
}) => {
  style = color
    ? { ...style, background: color }
    : { ...style, background: "linear-gradient(#ddd, #666)" };
  if (forMessage) {
    style = { ...style, width: "30px", height: "30px", marginRight: "15px" };
  }
  return (
    <div onClick={onPress} className={styles.container} style={{ ...style }}>
      {imageUrl ? <img className={styles.imageBox} src={imageUrl} /> : null}
    </div>
  );
};

export default SmallAvatar;
