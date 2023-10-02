import { observer } from "mobx-react-lite";
import React, { CSSProperties, FC } from "react";
import styles from "./index.module.css";

interface Props {
    children?: any;
    center?: boolean;
    color?: any;
    handleLink?: () => void;
    style?: CSSProperties;
    margin?: string;
    backgroundColor?: string;
}

const Text: FC<Props> = ({
    children,
    handleLink,
    center,
    style,
    color,
    backgroundColor,
    margin,
}) => {
    return (
        /* {isHttp ? (
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
          /* )} */
        <div
            className={center ? styles.centerText : styles.text}
            onClick={handleLink}
            style={{
                ...style,
                margin: margin ? margin : "3px 0",
                color,
                background: backgroundColor,
            }}
        >
            <div>{children}</div>
        </div>
    );
};

export default observer(Text);
