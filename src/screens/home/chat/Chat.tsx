import { observer } from "mobx-react-lite";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import ScrollContainer from "../../../components/ScrollContainer/ScrollContainer";
import ChatHeader from "../../../utils/chatHeader";
import MessageInput from "./components/messageInput/MessageInput";
import LinkPriview from "../../../components/Chat/LinkPreView/linkPriview";
import MessageAudio from "../../../components/Chat/MessageAudio";
import MessageDoc from "../../../components/Chat/MessageDoc";
import MessageImg from "../../../components/Chat/MessageImg";
import MessageVideo from "../../../components/Chat/MessageVideo";
import { RawMessage } from "../../../types/channel";
import MessageBox from "../../../components/Chat/MessageBox";
import useRootStore from "../../../hooks/useRootStore";
import _ from "lodash";
import MessagePoll from "../../../components/Chat/MessagePoll";

const Chat = () => {
    const navigate = useNavigate();
    const { messageCache, slug, messagesFilterValue } =
        useRootStore().messageStore;
    const { user } = useRootStore().authStore;

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

    const renderTextMessage = (message: RawMessage) => {
        switch (message.userId) {
            case user.id:
                return <LinkPriview message={message} position={true} />;
            default:
                return (
                    <LinkPriview
                        message={message}
                        position={false}
                        users={messageCache[slug]?.channelUsers}
                    />
                );
        }
    };

    const renderImageMessage = (message: RawMessage) => {
        switch (message.userId) {
            case user.id:
                return <MessageImg message={message} own={true} />;
            default:
                return (
                    <MessageImg
                        message={message}
                        own={false}
                        users={messageCache[slug]?.channelUsers}
                    />
                );
        }
    };

    const renderVideoMessage = (message: RawMessage) => {
        switch (message.userId) {
            case user.id:
                return <MessageVideo message={message} own={true} />;
            default:
                return (
                    <MessageVideo
                        message={message}
                        own={false}
                        users={messageCache[slug]?.channelUsers}
                    />
                );
        }
    };

    const renderAudioMessage = (message: RawMessage) => {
        switch (message.userId) {
            case user.id:
                return <MessageAudio message={message} position={true} />;
            default:
                return (
                    <MessageAudio
                        message={message}
                        position={false}
                        users={messageCache[slug]?.channelUsers}
                    />
                );
        }
    };

    const renderDocumentMessage = (message: RawMessage) => {
        switch (message.userId) {
            case user.id:
                return (
                    <MessageDoc
                        own={true}
                        mediaLocation={message.mediaUrl}
                        mediaTitle={message.mediaTitle}
                        loading={false}
                        status={"Download"}
                        message={message}
                    />
                );
            default:
                return (
                    <MessageDoc
                        mediaLocation={message.mediaUrl}
                        mediaTitle={message.mediaTitle}
                        own={false}
                        loading={false}
                        status={"Download"}
                        message={message}
                        users={messageCache[slug]?.channelUsers}
                    />
                );
        }
    };

    const renderPollMessage = (message: RawMessage) => {
        switch (message.userId) {
            case user.id:
                return (
                    <MessagePoll
                        isReply={message.isReply}
                        pollId={message.pollId ? message.pollId : 0}
                        own={true}
                        message={message}
                    />
                );
            default:
                return (
                    <MessagePoll
                        isReply={message.isReply}
                        pollId={message.pollId ? message.pollId : 0}
                        own={false}
                        message={message}
                        users={messageCache[slug]?.channelUsers}
                    />
                );
        }
    };

    const renderMessage = (message: RawMessage) => {
        switch (message.type) {
            case "text":
                return renderTextMessage(message);
            case "image":
                return renderImageMessage(message);
            case "video":
                return renderVideoMessage(message);
            case "audio":
                return renderAudioMessage(message);
            case "document":
                return renderDocumentMessage(message);
            case "NORMAL":
                return renderPollMessage(message);
            case "RELEVANCE":
                return renderPollMessage(message);
            default:
                return <MessageBox text={message.message} own={0} />;
        }
    };

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
                            {renderMessage(message)}
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
