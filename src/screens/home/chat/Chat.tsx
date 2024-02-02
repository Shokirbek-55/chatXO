import _ from "lodash";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import MessageComponent from "../../../components/Chat/MessageComponent/MessageComponent";
import ScrollContainer from "../../../components/ScrollContainer/ScrollContainer";
import useRootStore from "../../../hooks/useRootStore";
import ChatHeader from "../../../utils/chatHeader";
import MessageInput from "./components/messageInput/MessageInput";

const Chat = () => {
    const navigate = useNavigate();
    const { messageCache, slug, messagesFilterValue, setIsMessagesLength } =
        useRootStore().messageStore;
    const { closeRightSideBar } = useRootStore().routerStore;

    useEffect(() => {
        const handleEsc = (event: any) => {
            if (event.keyCode === 27) {
                navigate("/");
                closeRightSideBar();
            }
        };
        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, []);

    const messages = useMemo(() => {
        const messagesData = messageCache[slug]?.messages;
        if (messagesData?.length === 0) {
            setIsMessagesLength(true)
            return []
        }
        if (messagesFilterValue !== 0) {
            setIsMessagesLength(false)
            return messagesData.filter((e) => e.relevance && e.relevance >= messagesFilterValue)
        }
        setIsMessagesLength(false)
        return messagesData
    }, [messageCache[slug]?.messages, slug, messagesFilterValue]);

    return (
        <ChatContainer id="chatView">
            <ChatHeader />
            <ScrollContainer>
                {_.map(messages, (message, index) => {
                    return (
                        <div
                            key={index}
                            style={{
                                paddingBottom:
                                    messageCache[slug].messages?.length - 1 ===
                                        index
                                        ? "7.5vh"
                                        : "0",
                                paddingTop: 0 === index ? "7vh" : "0",
                            }}
                        >
                            <MessageComponent message={message} users={messageCache[slug]?.channelUsers} />
                        </div>
                    );
                })}
            </ScrollContainer>
            <MessageInput />
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
