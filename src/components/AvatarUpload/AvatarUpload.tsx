import { CSSProperties, FC, useState } from "react";
import styles from "./AvatarUpload.module.css";
import Assets from "../../utils/requireAssets";
import Colors from "../../utils/colors";
import Icon from "../Icon";

interface Props {
  style?: CSSProperties;
  color?: string;
  imageUrl?: string;
  upload: boolean,
  onChange?: (e: any) => void;
  value?: string;
}

const AvatarUpload: FC<Props> = ({
  style,
  color,
  imageUrl,
  onChange,
  upload,
  value
}) => {
  style = color ? { ...style, background: color } : { ...style };
  return (
    <>
      <div
        className={styles.container}
        style={{
          ...style,
        }}
      >
        <div className={styles.avatarBox}>
          {imageUrl ?
            <img className={styles.avatar} src={imageUrl} alt="" /> :
            null
          }
          {upload ?
            <label className={styles.uploadIcon}>
              <Icon
                src={Assets.upload}
                color={Colors.ActiveHastag}
                style={{
                  cursor: "pointer",
                  margin: "0 auto",
                  width: "25px",
                  height: "25px",
                }}
              />
              <input
                type="file"
                multiple
                value={value}
                color={color}
                onChange={onChange}
                accept="image/png, image/gif, image/jpeg"
                className={styles.avatarInput}
              />
            </label> :
            null
          }
        </div>
      </div>
    </>
  );
};

export default AvatarUpload;
