import React from "react";
import styles from "./NewInput.module.css";

interface Props {
    value?: any;
    onChange: (e: any) => void;
    placeholder?: string;
    width?: string;
    padding?: string;
    margin?: string;
    textAlign?: any;
    fontSize?: string;
}

const NewInput: React.FC<Props> = ({
    value,
    onChange,
    placeholder,
    margin,
    padding,
    width,
    textAlign,
    fontSize,
}) => {
    return (
        <input
            value={value}
            onChange={(e) => onChange(e?.target.value)}
            placeholder={placeholder}
            className={styles.input}
            style={{
                width: width,
                margin: margin,
                padding: padding,
                textAlign: textAlign,
                fontSize: fontSize,
            }}
        />
    );
};

export default NewInput;
