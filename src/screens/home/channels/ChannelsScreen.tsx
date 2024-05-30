import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import ChannelRowItem from '../../../components/ChanneItem/ChannelItem';
import Header from '../../../components/Header/Header';
import { Loading } from '../../../components/Loading/Loading';
import MessageBox from '../../../components/MessageBox/MessageBox';
import SearchInput from '../../../components/SearchInput/SearchInput';
import Text from '../../../components/Text/Text';
import { TMP_URL } from '../../../env';
import useRootStore from '../../../hooks/useRootStore';
import { Channel } from '../../../types/channel';
import Colors from '../../../utils/colors';
import styles from './index.module.css';
import { toJS } from 'mobx';

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

function ChannelsScreen() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { closeChannelInUser } = useRootStore().routerStore;
    const { myChannels, setSearchChannels, getChannelByHashId, handelSelectedChannel } = useRootStore().channelStore;
    const { setChannelSlug } = useRootStore().messageStore;
    const { openChannel } = useRootStore().chatStore;
    const { show } = useRootStore().visibleStore;

    const serachChannelHandler = (text: string) => {
        setSearchChannels(text);
    };

    const handleSelectChanel = (e: Channel) => {
        handelSelectedChannel({ id: e.id, hashId: e.hashId, slug: e.slug });
        getChannelByHashId(e.hashId);
        setChannelSlug(e.slug);
        const target = generatePath(`/:name`, { name: `@${e.hashId}` });
        navigate(target);
        closeChannelInUser();
        openChannel(e.slug);
    };

    const openMenu = () => {
        show('menuChannel');
    };

    return (
        <LeftAreaContainer>
            <Header text={t('groups')} rightIcon="more" onRightIconPress={openMenu} />
            <div className={styles.SearchBox}>
                <SearchInput onChange={serachChannelHandler} placeholder={`${t('searchPlaceholder')}`} />
            </div>
            <ChannelRowContainer>
                {false && (
                    <div className={styles.loadingBox}>
                        <Loading />
                    </div>
                )}
                {false && (
                    <div className={styles.loadingError}>
                        <MessageBox title={t('No Internet Connection')} />
                    </div>
                )}
                {myChannels.length === 0 && (
                    <div className={styles.loadingError}>
                        <MessageBox title={t('No Channels')} />
                    </div>
                )}
                <motion.div variants={container} initial="hidden" animate="visible" className={styles.contentBox}>
                    {myChannels.map(e => {
                        return (
                            <motion.div
                                variants={item}
                                whileTap={{ scale: 0.8 }}
                                key={e.id}
                                id="map-dev"
                                className={styles.channelRowBox}
                                onClick={() => handleSelectChanel(e)}
                            >
                                <ChannelRowItem
                                    item={e}
                                    name={e.name}
                                    color={
                                        e.color
                                            ? `linear-gradient(25deg, ${e.color} 30%, #ddd 100%)`
                                            : 'linear-gradient(#ddd, #666)'
                                    }
                                    number={e.id}
                                    imageUrl={e.avatar ? `${TMP_URL}/${e.avatar}` : ''}
                                />
                                <div className={styles.channelNameBox}>
                                    <Text children={e.name} color={Colors.White} fontSize="14px" margin="15px 0 0 0 " />
                                    <Text children={`${e.users.length} members`} color={Colors.White} fontSize="12px" />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </ChannelRowContainer>
        </LeftAreaContainer>
    );
}

export default observer(ChannelsScreen);

const LeftAreaContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const ChannelRowContainer = styled.div`
    position: relative;
    flex: 1;
    overflow-y: auto;
    padding-bottom: 20px;
`;
