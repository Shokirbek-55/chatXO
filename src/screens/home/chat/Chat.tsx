import { observer } from "mobx-react-lite";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import ScrollContainer from "../../../components/ScrollContainer/ScrollContainer";
import ChatHeader from "../../../utils/chatHeader";
import MessageInput from "./components/messageInput/MessageInput";
import useRootStore from "../../../hooks/useRootStore";
import _ from "lodash";
import MessageComponent from "../../../components/Chat/MessageComponent/MessageComponent";

const Chat = () => {
    const navigate = useNavigate();
    const { messageCache, slug, messagesFilterValue } =
        useRootStore().messageStore;

    useEffect(() => {
        const handleEsc = (event: any) => {
            if (event.keyCode === 27) {
                navigate("/");
            }
        };
        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, []);

    const messages = useMemo(() => messagesFilterValue != 0 && messageCache[slug]?.messages.length >= 0 ? messageCache[slug]?.messages.filter((e) => e.relevance && e.relevance >= messagesFilterValue) : messageCache[slug]?.messages, [messageCache[slug]?.messages, slug, messagesFilterValue])
    const users = useMemo(() => messageCache[slug]?.channelUsers, [messageCache[slug]?.channelUsers])

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
                                    messageCache[slug].messages?.length - 1 ==
                                    index
                                        ? "7.5vh"
                                        : "0",
                                paddingTop: 0 == index ? "7vh" : "0",
                            }}
                        >
                            <MessageComponent message={message} users={users} />
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
