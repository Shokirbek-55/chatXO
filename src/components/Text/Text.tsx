import React, { CSSProperties, FC } from "react";
import styles from "./index.module.css";

interface Props {
  numbers?: any;
  text?: string;
  children?: any;
  center?: boolean;
  color?: any;
  value?: string;
  handleLink?: () => void;
  style?: CSSProperties;
  onClick?: () => void;
  margin?: string;
}

const Text: FC<Props> = ({
  children,
  handleLink,
  center,
  style,
  color,
  text,
  value,
  numbers,
  onClick,
  margin
}) => {
  const isHttp = text?.includes("http");
  return (
    <>
      {isHttp ? (
        <a
          href={`${text}`}
          target="_blank"
          className={center ? styles.centerText : styles.text}
          onClick={() => handleLink && handleLink()}
          style={{ ...style, margin: margin, color }}
        >
          {numbers} {children} {onClick} {value} {text}
        </a>
      ) : (
        <p
          className={center ? styles.centerText : styles.text}
          onClick={() => handleLink && handleLink()}
          style={{ ...style, margin: margin ? margin : "3px 0", color }}
        >
          {numbers} {children} {onClick} {value} {text}
        </p>
      )}
    </>
  );
};

export default Text;
