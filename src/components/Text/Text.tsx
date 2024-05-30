import React, { CSSProperties, FC } from 'react';
import styles from './index.module.css';

interface Props {
    children?: any;
    center?: boolean;
    color?: any;
    handleLink?: () => void;
    style?: CSSProperties;
    margin?: string;
    backgroundColor?: string;
    fontWeight?: number;
    fontFamily?: 'Montserrat';
    fontSize?: string;
    textAlign?: string | any;
    moreDot?: boolean;
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
    moreDot,
}) => {
    const tetx = () => {
        if (!moreDot) return children;
        if (children?.length > 18) {
            return children?.slice(0, 15) + `...`;
        }
    };

    return (
        <p
            className={center ? styles.centerText : styles.text}
            onClick={handleLink}
            style={{
                margin: margin ? margin : '3px 0',
                color: color,
                background: backgroundColor,
                fontFamily: fontFamily,
                fontSize: fontSize,
                fontWeight: fontWeight,
                textAlign: textAlign,
                ...style,
            }}
        >
            {tetx()}
        </p>
    );
};

export default Text;
