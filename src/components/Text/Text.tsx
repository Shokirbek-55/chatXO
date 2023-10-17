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
    fontWeight?: string;
    fontFamily?: string;
    fontSize?: string;
    textAlign?: string | any;
}

const Text: FC<Props> = ({
    children,
    handleLink,
    center,
    style,
    color,
    backgroundColor,
    margin,
    fontFamily,
    fontWeight,
    fontSize,
    textAlign,
}) => {
    return (
        <div
            className={center ? styles.centerText : styles.text}
            onClick={handleLink}
            style={{
                ...style,
                margin: margin ? margin : "3px 0",
                color: color,
                background: backgroundColor,
                fontFamily: fontFamily,
                fontSize: fontSize,
                fontWeight: fontWeight,
                textAlign: textAlign,
            }}
        >
            <div>{children}</div>
        </div>
    );
};

export default observer(Text);
