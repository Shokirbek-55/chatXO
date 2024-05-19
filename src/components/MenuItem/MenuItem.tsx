import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { MdPersonRemove } from 'react-icons/md';
import Text from '../Text/Text';
import styles from './MenuItem.module.css';

interface Props {
    icon?: any;
    title?: string;
    right?: React.ReactNode | boolean;
    onClick?: () => void;
    onRightPress?: () => void;
    onTitlePress?: () => void;
    onDelete?(): void;
    isAdmin?: boolean;
}

const MenuItem: React.FC<Props> = ({
    icon,
    title,
    onClick,
    right,
    onTitlePress,
    onRightPress,
    isAdmin = false,
    onDelete,
}) => {
    return (
        <div className={styles.container} onClick={onClick}>
            {!!isAdmin && <MdPersonRemove className={styles.deleteIcon} onClick={onDelete} />}
            <div className={styles.right} onClick={onTitlePress}>
                <div className={styles.iconBox}>{icon}</div>
                <Text fontSize="14px" children={title} />
            </div>
            <div onClick={onRightPress} className={styles.rightIconSection}>
                {right ? right : <IoIosArrowForward size={22} />}
            </div>
        </div>
    );
};

export default MenuItem;
