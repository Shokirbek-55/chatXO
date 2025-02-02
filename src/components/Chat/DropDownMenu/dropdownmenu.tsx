import { Dropdown, MenuProps, Space, message } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { styled } from 'styled-components';
import useRootStore from '../../../hooks/useRootStore';
import { ChannelsUsersType, RawMessage } from '../../../types/channel';

//

interface Props {
    massage: RawMessage;
    users?: {
        [key: string]: ChannelsUsersType;
    };
    children: React.ReactNode;
}

const DropDownMenu = ({ massage, children }: Props) => {
    const { user } = useRootStore().authStore;
    const { isSelectChannelIsAdmin } = useRootStore().channelStore;
    const { deleteMessage, setEditMessage, replyMessage } = useRootStore().messageStore;

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: t('reply'),
            onClick: () => {
                replyMessage(massage);
            },
        },
        {
            key: '2',
            label: t('report'),
            onClick: () => {},
        },
        {
            key: '3',
            label: t('copy'),
            onClick: () => {
                try {
                    navigator.clipboard.writeText(massage.message);
                    console.log('Copied!');
                } catch (err) {
                    console.log('Failed to copy!');
                }
            },
        },

        {
            key: '4',
            label: t('Edit'),
            onClick: () => {
                setEditMessage(massage);
            },
        },
        {
            key: '5',
            label: t('delete'),
            onClick: () => {
                if (isSelectChannelIsAdmin || massage.userId === user?.id) {
                    deleteMessage(massage.id, massage.channelSlug, new Date(massage.timestamp));
                } else {
                    message.error('you are not admin');
                }
            },
        },
        {
            key: '6',
            label: t('cancel'),
            onClick: () => {},
        },
    ];

    const itemsIsAdmin: MenuProps['items'] = [
        {
            key: '1',
            label: t('reply'),
            onClick: () => {
                replyMessage(massage);
            },
        },
        {
            key: '2',
            label: t('copy'),
            onClick: () => {
                try {
                    navigator.clipboard.writeText(massage.message);
                    console.log('Copied!');
                } catch (err) {
                    console.log('Failed to copy!');
                }
            },
        },
        {
            key: '3',
            label: t('delete'),
            onClick: () => {
                if (isSelectChannelIsAdmin || massage.userId === user?.id) {
                    deleteMessage(massage.id, massage.channelSlug, new Date(massage.timestamp));
                } else {
                    message.error('you are not admin');
                }
            },
        },
        {
            key: '4',
            label: t('cancel'),
            onClick: () => {},
        },
    ];

    return (
        <DropdownRN
            menu={{ items: isSelectChannelIsAdmin ? items : itemsIsAdmin }}
            trigger={['contextMenu']}
            overlayStyle={{
                width: '130px',
                height: '200px',
                borderRadius: '10%',
                alignItems: 'center',
                padding: '15px',
            }}
        >
            <Space>{children}</Space>
        </DropdownRN>
    );
};

export default observer(DropDownMenu);

const DropdownRN = styled(Dropdown)`
    display: block;
`;
