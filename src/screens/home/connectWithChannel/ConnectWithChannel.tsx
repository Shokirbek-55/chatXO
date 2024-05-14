import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';
import ButtonView from '../../../components/Button';
import Header from '../../../components/Header/Header';
import Input from '../../../components/Input';
import Text from '../../../components/Text/Text';
import useRootStore from '../../../hooks/useRootStore';
import styles from './ConnectWithChannel.module.css';

const ConnectWithChannel = () => {
    const { t } = useTranslation();
    const { toRouter } = useRootStore().routerStore;
    const { setConnectChannelData, connectChannelData } = useRootStore().usersStore;
    const { visible } = useRootStore().visibleStore;
    const navigation = useNavigate();

    const { returnGroupByNumber } = useRootStore().usersStore;

    const JoinChannel = async () => {
        const target = e => generatePath(`/:name`, { name: `@${e}` });
        returnGroupByNumber(connectChannelData.channelNumber, e => navigation(target(e)));
    };

    return (
        <div className={styles.container}>
            <Header text="Connect" />
            <div className={styles.main}>
                <div className={styles.connectBox}>
                    <div className={styles.connect}>
                        <Text children={`${t('groupsNumber')}`} margin="2px 6px" />
                        <Input
                            borderred
                            value={connectChannelData.channelNumber}
                            placeholder="Enter group number"
                            setUserName={e => setConnectChannelData('channelNumber', e)}
                        />
                        {visible.passwordInput ? (
                            <>
                                <Text children={`${t('groupsInvite')}`} margin="10px 6px 2px 6px" />
                                <Input
                                    borderred
                                    value={connectChannelData.channelInviteCode}
                                    placeholder="Enter group invitation code"
                                    setUserName={e => setConnectChannelData('channelInviteCode', e)}
                                />
                            </>
                        ) : null}
                        <ButtonView
                            title={`${t('join_group')}`}
                            style={{
                                display: 'flex',
                                fontSize: '18px',
                                width: '100%',
                                marginTop: '20px',
                            }}
                            onClickbutton={() => JoinChannel()}
                        />
                    </div>
                    <div>
                        <h2
                            style={{
                                textAlign: 'center',
                                color: '#404d66',
                                fontFamily: 'Montserrat',
                                fontWeight: 600,
                            }}
                        >
                            {t('or')}
                        </h2>
                    </div>
                    <ButtonView
                        title={`${t('createGroup')}`}
                        onClickbutton={() => toRouter('createChannel')}
                        style={{
                            display: 'flex',
                            fontSize: '18px',
                            width: '100%',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default observer(ConnectWithChannel);
