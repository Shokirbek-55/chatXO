import React, { CSSProperties, FC } from "react";
import Colors from "../../utils/colors";
import styles from "./index.module.css";
export type Color = keyof typeof colors;

interface Props {
  color?: Color;
  icon?: string;
  raised?: boolean;
  onClickbutton?: () => void;
  onRefreshbutton?: () => void;
  rounded?: boolean;
  uppercase?: boolean;
  textColor?: Color;
  title?: string
  fontSize?: string;
  fromChatInfo?: boolean;
  style?: CSSProperties;
  className?: any;
  full?: boolean;
}

const colors = {
  primary: Colors.Blue,
  secondary: Colors.BaliHai,
  danger: Colors.RedDamask,
  accent: Colors.CuriousBlue,
  light: Colors.White,
  dark: Colors.Black,
  gray: Colors.GrayChateau,
  lightGreen: Colors.LightGreen,
};

const ButtonView: FC<Props> = ({
  title,
  color = "primary",
  raised,
  rounded,
  onClickbutton,
  textColor,
  uppercase,
  icon,
  fontSize = "regular",
  fromChatInfo,
  full,
  style = {},
  className,
  ...props
}) => {
  return (
    <div className={styles.container}>
      <div className={full ? styles.full : styles.buttonBox}>
        <button
          onClick={onClickbutton}
          style={{
            background: colors[color],
            ...style,
          }}
          className={`${className} ${rounded ? styles.rounded : styles.notRounded
            }`}
        >
          <p className={uppercase ? styles.uppercase : styles.notuppercase}>
            {title}
          </p>
        </button>
      </div>
    </div>
  );
};

export default ButtonView;
