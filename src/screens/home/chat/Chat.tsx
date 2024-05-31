import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import MessageComponent from '../../../components/Chat/MessageComponent/MessageComponent';
import ScrollContainer from '../../../components/ScrollContainer/ScrollContainer';
import useRootStore from '../../../hooks/useRootStore';
import ChatHeader from '../../../utils/chatHeader';
import MessageInput from './components/messageInput/MessageInput';
import ModalToPrivateChannel from '../../../components/ModalToPrivateChannel';

const Chat = () => {
    const navigate = useNavigate();
    const { messagesFilterValue, setIsMessagesLength, getSelectedChannelMsgs } = useRootStore().messageStore;
    const { closeRightSideBar } = useRootStore().routerStore;
    const { getSlectedChannelUsers } = useRootStore().channelStore;

    useEffect(() => {
        const handleEsc = (event: any) => {
            if (event.keyCode === 27) {
                navigate('/');
                closeRightSideBar();
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [closeRightSideBar, navigate]);

    const messagesV2: React.ReactNode[] = useMemo(() => {
        const messagesData = getSelectedChannelMsgs;

        if (!messagesData || messagesData.length === 0) {
            setIsMessagesLength(true);
            return [];
        }

        setIsMessagesLength(false);

        const filteredMessages = messagesData.filter(
            msg => msg.relevance !== undefined && msg.relevance >= messagesFilterValue,
        );

        const messageComponents: React.ReactNode[] = [];

        for (let i = 0; i < filteredMessages.length; i++) {
            const msg = filteredMessages[i];
            messageComponents.unshift(
                <MessageComponent
                    isFirst={msg === filteredMessages[0]}
                    isLast={filteredMessages.length - 1 === i}
                    _ref={ref => {}}
                    message={msg}
                    users={getSlectedChannelUsers}
                />,
            );
        }

        return messageComponents;
    }, [getSelectedChannelMsgs, messagesFilterValue, getSlectedChannelUsers]);

    return (
        <ChatContainer id="chatView">
            <ChatHeader />
            <ScrollContainer>{messagesV2}</ScrollContainer>
            <MessageInput />

            <ModalToPrivateChannel />
        </ChatContainer>
    );
};

export default observer(Chat);

const ChatContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
`;
