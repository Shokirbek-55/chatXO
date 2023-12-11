import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import Text from "../Text/Text";
import styles from "./MenuItem.module.css";

interface Props {
    icon?: any;
    title?: string;
    onClick?: () => void;
}

const MenuItem: React.FC<Props> = ({ icon, title, onClick }) => {
    return (
        <div className={styles.container} onClick={onClick}>
            <div className={styles.right}>
                <div className={styles.iconBox}>{icon}</div>
                <Text fontSize="14px" children={title} />
            </div>
            <IoIosArrowForward size={22} />
        </div>
    );
};

export default MenuItem;
