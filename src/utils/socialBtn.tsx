import React from 'react';
import styles from './index.module.css';
interface Props {
    title?: string;
    icon?: any;
    width?: string;
    height?: string;
    border?: string;
    backgroundColor?: string;
    borderRadius?: string;
    color?: string;
    margin?: string;
    cursor?: string;
    onClick?: () => void;
}

const SocialBtn: React.FC<Props> = ({
    title,
    icon,
    width = '100%',
    height = '45px',
    border = '1px solid #D1D1D1',
    backgroundColor = 'transparent',
    borderRadius = '10px',
    color = '#242424',
    margin,
    cursor = 'pointer',
    onClick,
}) => {
    return (
        <button
            onClick={onClick}
            className={styles.socialBtnHover}
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '5px 20px',
                justifyContent: 'space-between',
                cursor: cursor,
                backgroundColor: backgroundColor,
                border: border,
                width: width,
                height: height,
                borderRadius: borderRadius,
                color: color,
                margin: margin,
            }}
        >
            <div>{icon}</div>
            {title}
            <span></span>
        </button>
    );
};

export default SocialBtn;
