import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import MessageBox from "../../../components/Chat/MessageBox";
import MessageCard from "../../../components/Chat/MessageCard";
import ScrollContainer from "../../../components/ScrollContainer/ScrollContainer";
import useRootStore from "../../../hooks/useRootStore";
import { RawMessage } from "../../../types/channel";
import MessageInput from "./components/messageInput/MessageInput";
import MessageImg from "../../../components/Chat/MessageImg";
import MessageVideo from "../../../components/Chat/MessageVideo";
import MessageAudio from "../../../components/Chat/MessageAudio";
import MessageDoc from "../../../components/Chat/MessageDoc";
import LinkPriview from "../../../components/Chat/LinkPreView/linkPriview";
import ChatHeader from "../../../utils/chatHeader";

const Chat = () => {
    const navigate = useNavigate();
    const { messageCache, slug, searchMessage, searchMessageState } =
        useRootStore().messageStore;
    const { user } = useRootStore().authStore;
    const { visible } = useRootStore().visibleStore;
    const { toRouterManageCh, openRightSideBar } = useRootStore().routerStore;

    const OpenManageChannel = () => {
        openRightSideBar();
    };

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

    const Header = () => {
        return (
            <ChatHeader
                img_url={messageCache[slug]?.channelData.avatar}
                color={messageCache[slug]?.channelData.color}
                name={messageCache[slug]?.channelData.name}
                onTextSearch={() => {}}
                pageState={messageCache[slug]?.channelData.pageState}
                onPress={OpenManageChannel}
                inputValue={visible.setSearch ? searchMessageState : ""}
            />
        );
    };

    const Input = () => {
        return <MessageInput />;
    };

    const renderTextMessage = (message: RawMessage) => {
        switch (message.userId) {
            case user.id:
                return <LinkPriview message={message} position={false} />;
            default:
                return (
                    <LinkPriview
                        message={message}
                        position={true}
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
                return <MessageAudio message={message} position={false} />;
            default:
                return (
                    <MessageAudio
                        message={message}
                        position={true}
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
            default:
                return <MessageBox text={message.message} own={0} />;
        }
    };

    return (
        <ChatContainer id="chatView">
            <ScrollContainer header={<Header />} input={<Input />}>
                {messageCache[slug]?.messages.map((message, index) => {
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
