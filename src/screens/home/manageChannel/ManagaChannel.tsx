import { message } from 'antd';
import { observer } from 'mobx-react-lite';
import { BsFillShareFill } from 'react-icons/bs';
import { IoIosSettings } from 'react-icons/io';
import { MdGroup } from 'react-icons/md';
import { RiFileCopyFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import AvatarUpload from '../../../components/AvatarUpload/AvatarUpload';
import Header from '../../../components/Header/Header';
import MenuItem from '../../../components/MenuItem/MenuItem';
import Text from '../../../components/Text/Text';
import { TMP_URL } from '../../../env';
import useRootStore from '../../../hooks/useRootStore';
import { ButtonComponent } from '../../../utils/button';
import styles from './ManagaChannel.module.css';

const ManagaChannel = () => {
    const { channelData, getChannelBlockedUsers, getChannelUsers, adminId } = useRootStore().channelStore;
    const { toRouterManageCh, closeModal, closeRightSideBar } = useRootStore().routerStore;
    const { userChannelLeave, getPreviewData } = useRootStore().usersStore;
    const { user } = useRootStore().authStore;
    const { show } = useRootStore().visibleStore;
    const navigation = useNavigate();

    const PreviewChannelAvatar = () => {
        getPreviewData(channelData as any);
        show('previewModal');
    };

    const leaveChannel = () => {
        userChannelLeave(channelData.id, () => navigation('', { replace: true }));
        closeRightSideBar();
    };

    const OpenBlockUser = () => {
        toRouterManageCh('blockUser');
        getChannelBlockedUsers(channelData.hashId);
    };

    const EditGroup = () => {
        toRouterManageCh('editChannel');
        getChannelUsers(channelData.hashId);
    };

    const copyChatLink = () => {
        navigator.clipboard.writeText(window.location.href);
        message.success('Copy chat link');
    };

    const truncatedText = text => {
        const words = text.split(' ');
        if (words.length > 35) {
            return words.slice(0, 30).join(' ') + '...';
        } else {
            return text;
        }
    };

    return (
        <div className={styles.container}>
            <Header leftIcon="arrowRight" text={channelData.name} onLeftIconPress={() => closeModal('right')} />
            <AvatarUpload
                upload={false}
                style={{ margin: '10px auto', width: '90%' }}
                imageUrl={channelData?.avatar ? `${TMP_URL}/${channelData.avatar}` : ''}
                color={channelData?.color ? channelData.color : 'linear-gradient(#ddd, #666)'}
                onPreview={() => PreviewChannelAvatar()}
            />
            <div className={styles.description}>
                <Text
                    fontSize="12px"
                    children={channelData.description ? truncatedText(channelData.description) : 'no description'}
                />
            </div>
            {adminId === user.id ? (
                <div className={styles.itemsRow}>
                    <MenuItem
                        icon={<MdGroup size={24} />}
                        title="Members"
                        onClick={() => toRouterManageCh('channelSetting')}
                    />
                    <MenuItem icon={<RiFileCopyFill size={24} />} title="Copy chat" onClick={copyChatLink} right />
                    <MenuItem icon={<MdGroup size={24} />} title="Blocked members" onClick={OpenBlockUser} />
                    <MenuItem icon={<IoIosSettings size={24} />} title="Edit group" onClick={EditGroup} />
                </div>
            ) : (
                <div className={styles.items}>
                    <MenuItem
                        icon={<MdGroup size={24} />}
                        title="Members"
                        onClick={() => toRouterManageCh('channelSetting')}
                    />
                    <MenuItem icon={<BsFillShareFill size={24} />} title="Copy chat" onClick={copyChatLink} right />
                </div>
            )}
            <div className={styles.bottomBox}>
                {adminId === user.id ? <Text fontSize="14px" children="You are admin" /> : null}
                {adminId === user.id ? (
                    <ButtonComponent
                        backColor="transparent"
                        text="change admin"
                        color="red"
                        clickMe={() => toRouterManageCh('newAdmin')}
                    />
                ) : (
                    <ButtonComponent backColor="transparent" text="leave group" color="red" clickMe={leaveChannel} />
                )}
            </div>
        </div>
    );
};

export default observer(ManagaChannel);
