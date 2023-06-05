import { CSSProperties, FC, useState } from "react";
import { AvatarHook } from "./hook";
import styles from "./index.module.css";
import { User } from "../../types/user";
import Assets from "../../utils/requireAssets";
import Colors from "../../utils/colors";
import Icon from "../Icon";

interface Props {
  url?: string;
  friendItem?: User;
  color?: string;
  avatar?: string;
  loading: boolean;
  upload?: boolean;
  style?: CSSProperties;
  large?: boolean;
  text?: string;
  hours?: any;
  number?: any;
  value?: string;
  channel?: boolean;
  onChange?: (e: any) => void;
  onPreview?: () => void;
  onOpenCamera?: () => void;
  onRemove?: () => void;
  onClose?: () => void;
  setIsOpen?: () => void;
  setAvatar?: [];
  natification?: any
}

const AvatarView: FC<Props> = ({
  url,
  color,
  avatar,
  upload,
  style,
  loading,
  large,
  text,
  number,
  value,
  hours,
  onChange,
  onOpenCamera,
  onPreview,
  onRemove,
  setIsOpen,
  setAvatar,
  natification
}) => {
  style = color ? { ...style, background: color } : { ...style };
  const [isVisible, setIsVisible] = useState(false);
  const { randomColorm } = AvatarHook();
  return (
    <>
      {large ? (
        <div
          className={styles.largeContainer}
          style={{
            ...style,
          }}
          onMouseMove={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          <div className={styles.avatarBox}>
            {url ? (
              <img
                src={url}
                className={styles.avatar}
                onClick={() => {
                  console.log("url", url);
                }}
                alt="#"
              />
            ) : null}
            {natification > 0 ?
              <button className={styles.natification}>{natification}</button> :
              null
            }
          </div>
          {upload ? (
            <label className={styles.largeAvatar}>
              {/* <DropDownSelect */}
              {/* onSelectFile={onChange} */}
              {/* onOpenCamera={onOpenCamera} */}
              {/* cameraIcon={ */}
              <Icon
                src={Assets.download}
                color={Colors.ActiveHastag}
                // onClick={}
                style={{
                  cursor: "pointer",
                  margin: "0 auto",
                  width: "25px",
                  height: "25px",
                }}
              />
              {/* } */}
              {/* /> */}
              <input
                onChange={onChange}
                type="file"
                color={color}
                multiple
                accept="image/png, image/gif, image/jpeg"
                className={styles.avatarInput}
              />
            </label>
          ) : (
            <div className={styles.channelTitle}>
              <p className={styles.channelName}>
                {text && text?.length > 8 ? `${text?.slice(0, 6)}...` : text}
              </p>
              <div className={styles.channelNumber}>
                <p
                  style={{
                    paddingRight: "3px",
                  }}
                ></p>
                <p>{hours}</p>
                <p style={{ zIndex: "999" }}>{hours}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          className={styles.container}
          style={{ ...style }}
          onMouseMove={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          {url ? (
            <img src={url}
              className={styles.avatarSmall}
              alt="#"
              onClick={() => {
                console.log("url", url);
              }}
            />
          ) : (
            <div
              className={styles.avatar}
              style={{
                background: color
                  ? `${color}`
                  : "linear-gradient(rgb(221, 221, 221), rgb(102, 102, 102))",
              }}
            ></div>
          )}
          {upload && isVisible ? (
            <div className={styles.absolute}>
              <label>
                <Icon
                  src={Assets.download}
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
              </label>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default AvatarView;
