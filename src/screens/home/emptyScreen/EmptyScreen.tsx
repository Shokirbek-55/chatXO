import { observer } from 'mobx-react-lite';
import React from 'react';
import Text from '../../../components/Text/Text';
import styles from './EmptyScreen.module.css';

interface Props {
    text: string;
}

const EmptyScreen: React.FC<Props> = ({ text }) => {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <Text children={text} />
            </div>
        </div>
    );
};

export default observer(EmptyScreen);
