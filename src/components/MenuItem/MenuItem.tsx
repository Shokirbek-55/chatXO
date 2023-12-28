import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import Text from "../Text/Text";
import styles from "./MenuItem.module.css";

interface Props {
    icon?: any;
    title?: string;
    right?: any;
    onClick?: () => void;
    onRightPress?: () => void;
    onTitlePress?: () => void;
}

const MenuItem: React.FC<Props> = ({
    icon,
    title,
    onClick,
    right,
    onTitlePress,
    onRightPress,
}) => {
    return (
        <div className={styles.container} onClick={onClick}>
            <div className={styles.right} onClick={onTitlePress}>
                <div className={styles.iconBox}>{icon}</div>
                <Text fontSize="14px" children={title} />
            </div>
            <div onClick={onRightPress}>
                {right ? right : <IoIosArrowForward size={22} />}
            </div>
        </div>
    );
};

export default MenuItem;
