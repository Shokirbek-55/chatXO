import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import MessageBox from '../../../components/Chat/MessageBox'
import MessageCard from '../../../components/Chat/MessageCard'
import ScrollContainer from '../../../components/ScrollContainer/ScrollContainer'
import useRootStore from '../../../hooks/useRootStore'
import { data } from '../../../store/dataBase'
import { RawMessage } from '../../../types/channel'
import { ChatHeader } from '../../../utils/chatHeader'
import MessageInput from './components/messageInput/MessageInput'
import { toJS } from 'mobx'
import _ from 'lodash'

const Chat = () => {
    const navigate = useNavigate();
    const { messages } = useRootStore().messageStore
    const { myData } = useRootStore().usersStore
    const { channelUsers } = useRootStore().channelStore

    useEffect(() => {
        const handleEsc = (event: any) => {
            if (event.keyCode === 27) {
                navigate('/')
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    const reversed = _.reverse(toJS(messages))

    
    const Header = () => {
        return (
            <ChatHeader
                img_url={data?.avatar ? data?.avatar : ""}
                color={data?.color ? data?.color : "linear-gradient(#ddd, #666)"}
                name={data?.name}
                onTextSearch={() => { }}
                pageState={data.pageState}
            />
        )
    }

    const Input = () => {
        return (
            <MessageInput
                sendCurrentCurrentMessageOnScroll={() => { }}
            />
        )
    }


    const renderMessage = (message: RawMessage) => {
        if (message.userId === myData.id) {
            return <MessageCard message={message} position={false} />;
        } else if (message.userId === -1) {
            return <MessageBox text={message.message} own={0} />;
        } else {
            return (
                <MessageCard position={true} message={message} users={channelUsers} />
            );
        }
    };

    return (
        <ChatContainer id="chatView">
            <ScrollContainer header={<Header />} input={<Input />}>
                {
                    reversed.map((message, index) => {
                        return (
                            <div key={index}>
                                <div
                                    style={{
                                        paddingBottom:
                                            reversed.length - 1 == index ? "7.5vh" : "0",
                                        paddingTop: 0 == index ? "7vh" : "0",
                                    }}
                                >
                                    {renderMessage(message)}
                                </div>
                            </div>
                        );
                    })
                }
            </ScrollContainer>
        </ChatContainer>
    )
}

export default observer(Chat)


const ChatContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
`