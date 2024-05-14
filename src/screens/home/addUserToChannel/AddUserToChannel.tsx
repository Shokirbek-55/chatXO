import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import Header from '../../../components/Header/Header';
import MessageBox from '../../../components/MessageBox/MessageBox';
import RowItemView from '../../../components/RowItem';
import SearchInput from '../../../components/SearchInput/SearchInput';
import { TMP_URL } from '../../../env';
import useRootStore from '../../../hooks/useRootStore';
import styles from './AddUserToChannel.module.css';
const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2,
        },
    },
};

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

const AddUserToChannel = () => {
    const { t } = useTranslation();
    const { addUserToChannel, channelData } = useRootStore().channelStore;
    const { usersListForAdd, setSearchUsersForAdd } = useRootStore().friendsStore;

    const { closeModal } = useRootStore().routerStore;

    const handleChangeText = (key: string) => {
        setSearchUsersForAdd(key);
    };

    return (
        <div className={styles.container}>
            <Header text={`${t('addParticipant')}`} leftIcon="arrowLeft" onLeftIconPress={() => closeModal('right')} />
            <div className={styles.searchBox}>
                <SearchInput onChange={e => handleChangeText(e)} placeholder={`${t('searchPlaceholder')}`} />
            </div>
            <div style={{ marginTop: '5px' }}>
                <motion.div variants={container} initial="hidden" animate="visible">
                    {usersListForAdd?.length !== 0 ? (
                        usersListForAdd?.map((e, index) => {
                            return (
                                <motion.div variants={item} key={index} id="map-dev" className={styles.channelRowBox}>
                                    <RowItemView
                                        key={index}
                                        text={e.username}
                                        loading={false}
                                        imageUrl={e.avatar ? `${TMP_URL}/${e.avatar}` : ''}
                                        color={
                                            e.color
                                                ? `linear-gradient(25deg, ${e.color} 30%, #ddd 100%)`
                                                : 'linear-gradient(#ddd, #666)'
                                        }
                                        rightButton={true}
                                        onButtonPress={() => addUserToChannel(channelData.hashId, e.id as any)}
                                        title={`${e.isAdded ? t('added') : t('add')}`}
                                        className={e.isAdded ? styles.added : styles.add}
                                    />
                                </motion.div>
                            );
                        })
                    ) : (
                        <MessageBox title={`${t('no_avalible_friends')}`} />
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default observer(AddUserToChannel);
