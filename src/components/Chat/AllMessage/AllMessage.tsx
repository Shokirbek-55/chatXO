import { RawMessage } from "../../../types/channel";
import LinkPriviewComponent from "../LinkPreView/linkPriview";
import MessageAudio from "../MessageAudio";
import MessageBox from "../MessageBox";
import MessageDoc from "../MessageDoc";
import MessageImg from "../MessageImg";
import MessagePoll from "../MessagePoll";
import MessageVideo from "../MessageVideo";

interface PropType {
    message: RawMessage;
}

export const RenderMessage = ({ message }: PropType) => {
    const renderTextMessage = (message: RawMessage) => (
        <LinkPriviewComponent message={message} />
    );

    const renderImageMessage = (message: RawMessage) => (
        <MessageImg message={message} />
    );

    const renderVideoMessage = (message: RawMessage) => (
        <MessageVideo message={message} />
    );

    const renderAudioMessage = (message: RawMessage) => (
        <MessageAudio
            message={message}
            users={undefined}
            position={undefined}
        />
    );

    const renderDocumentMessage = (message: RawMessage) => (
        <MessageDoc
            mediaLocation={message.mediaUrl}
            mediaTitle={message.mediaTitle}
            loading={false}
            status={"Download"}
            message={message}
        />
    );

    const renderPollMessage = (message: RawMessage) => (
        <MessagePoll message={message} />
    );

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

    return renderMessage(message);
};
