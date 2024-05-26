import React from 'react';
import { CheckIcon } from '../../utils/icons';
import Text from '../Text/Text';
import styles from './LanguageSelect.module.css';

interface Props {
    language: any;
    flag: any;
    isCheck?: boolean;
    onPress?: (e: any) => void;
}

const LanguageSelect: React.FC<Props> = ({ language, flag, isCheck, onPress }) => {
    return (
        <div className={`${styles.language} ${isCheck ? styles.isChecked : styles.isCheck}`} onClick={onPress}>
            <div className={styles.left}>
                <img className={styles.flag} src={flag} alt="" />
                <Text fontSize="13px" children={language} />
            </div>
            {isCheck ? <CheckIcon /> : null}
        </div>
    );
};

export default LanguageSelect;
