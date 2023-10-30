import { ReactNode, memo, useCallback } from "react";
import { RawMessage } from "../../../types/channel";
import LinkPriview from "../LinkPreView/linkPriview";
import MessageAudio from "../MessageAudio";
import MessageBox from "../MessageBox";
import MessageDoc from "../MessageDoc";
import MessageImg from "../MessageImg";
import MessageVideo from "../MessageVideo";
import useRootStore from "../../../hooks/useRootStore";
import { observer } from "mobx-react";
import { toJS } from "mobx";

const MessageContainer = memo(
    ({
        children,
        messages,
        index,
    }: {
        children: ReactNode;
        messages: RawMessage[];
        index: number;
    }) => {
        return (
            <div
                key={index}
                style={{
                    paddingBottom:
                        messages?.length - 1 == index ? "7.5vh" : "0",
                    paddingTop: 0 == index ? "7vh" : "0",
                }}
            >
                {children}
            </div>
        );
    }
);

const AllMessage = () => {
    const { messageCache, slug } = useRootStore().messageStore;
    const { user } = useRootStore().authStore;

    console.log(toJS(messageCache[slug]?.messages[0]));

    console.log("ishladi AllMessage");

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
        <>
            {messageCache[slug]?.messages.map((message, index) => {
                return (
                    <MessageContainer
                        messages={messageCache[slug]?.messages}
                        index={index}
                    >
                        {renderMessage(message)}
                    </MessageContainer>
                );
            })}
        </>
    );
};

export default observer(AllMessage);
