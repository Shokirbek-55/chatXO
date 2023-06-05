import React, { CSSProperties, FC } from "react";
import Colors from "../../utils/colors";
import {
  AccountIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseIcon,
  LogoutIcon,
  MdGroupAddIcon,
  SettingIcon,
} from "../../utils/icons";
import styles from "./index.module.css";

interface Props {
  header?: string;
  text?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  leftIcon?: string;
  onLeftIconPress?: () => void;
  colorText?: string;
  rightIconColor?: string;
  leftIconColor?: string;
  textSize?: string;
}
const HeaderView: FC<Props> = ({
  header,
  text,
  rightIcon,
  leftIcon,
  rightIconColor = "#444",
  leftIconColor = "#444",
  colorText = " #404d66",
  textSize = "18",
  onRightIconPress = () => { },
  onLeftIconPress = () => { },
}) => {
  return (
    <div className={styles.container} style={{}}>
      <div>
        {leftIcon === "account" ? (
          <div onClick={onLeftIconPress}>
            <AccountIcon color={leftIconColor} />
          </div>
        ) : leftIcon === "arrowLeft" ? (
          <div onClick={onLeftIconPress}>
            <ArrowLeftIcon color={leftIconColor} />
          </div>
        ) : leftIcon === "arrowRight" ? (
          <div onClick={onLeftIconPress}>
            <ArrowRightIcon color={leftIconColor} />
          </div>
        ) : leftIcon === "setting" ? (
          <div onClick={onLeftIconPress}>
            <SettingIcon color={leftIconColor} />
          </div>
        ) : leftIcon === "logout" ? (
          <div onClick={onLeftIconPress}>
            <LogoutIcon color={leftIconColor} />
          </div>
        ) : leftIcon === "addUser" ? (
          <div onClick={onLeftIconPress}>
            <MdGroupAddIcon color={leftIconColor} />
          </div>
        ) : leftIcon === "close" ? (
          <div onClick={onLeftIconPress}>
            <CloseIcon color={leftIconColor} />
          </div>
        ) : (
          <div className={styles.hidden}>left</div>
        )}
      </div>
      <div style={{ fontSize: `${textSize}px`, color: `${colorText}` }}>
        {text}
      </div>
      <div>
        {rightIcon === "account" ? (
          <div onClick={onRightIconPress}>
            <AccountIcon color={rightIconColor} />
          </div>
        ) : rightIcon === "arrowLeft" ? (
          <div onClick={onRightIconPress}>
            <ArrowLeftIcon color={rightIconColor} />
          </div>
        ) : rightIcon === "arrowRight" ? (
          <div onClick={onRightIconPress}>
            <ArrowRightIcon color={rightIconColor} />
          </div>
        ) : rightIcon === "setting" ? (
          <div onClick={onRightIconPress}>
            <SettingIcon color={rightIconColor} />
          </div>
        ) : rightIcon === "logout" ? (
          <div onClick={onRightIconPress}>
            <LogoutIcon color={rightIconColor} />
          </div>
        ) : rightIcon === "addUser" ? (
          <div onClick={onRightIconPress}>
            <MdGroupAddIcon color={rightIconColor} />
          </div>
        ) : rightIcon === "close" ? (
          <div onClick={onRightIconPress}>
            <CloseIcon color={rightIconColor} />
          </div>
        ) : (
          <div className={styles.hidden}>right</div>
        )}
      </div>
    </div>
  );
};

export default HeaderView;
