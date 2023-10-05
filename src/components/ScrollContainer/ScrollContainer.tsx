
import { useRef, useEffect, useState, useCallback } from "react";
import { ArrowDowunIcon } from "../../utils/icons";
import { styled } from "styled-components";
import Lottie from "lottie-react";
import topLoaderJson from "../../assets/topLoader.json";
import { observer } from "mobx-react-lite";
import useRootStore from "../../hooks/useRootStore";
import { useInfiniteScroll } from "../../hooks/useThrottledEffect";
import { RawMessage } from "../../types/channel";
import LinkPriview from "../Chat/LinkPreView/linkPriview";
import MessageAudio from "../Chat/MessageAudio";
import MessageDoc from "../Chat/MessageDoc";
import MessageImg from "../Chat/MessageImg";
import MessageVideo from "../Chat/MessageVideo";
import MessageBox from "../Chat/MessageBox";

const ScrollContainer = () => {
    const outerDiv = useRef<HTMLDivElement | any>(null);
    const innerDiv = useRef<HTMLDivElement | any>(null);

    const { getHistoryMessagesPageState, messageCache, slug } = useRootStore().messageStore
    const { user } = useRootStore().authStore;

    const topDiv = useRef<HTMLDivElement | any>(null);

    const prevInnerDivHeight = useRef(null);

    const [showScrollButton, setShowScrollButton] = useState(false);
   
    useEffect(() => {
        stop.current = messageCache[slug]?.end || false;
        const outerDivHeight = outerDiv.current.clientHeight;
        const innerDivHeight = innerDiv.current.clientHeight;
        const outerDivScrollTop = outerDiv.current.scrollTop;

        if (innerDivHeight < outerDivHeight) {
            topDiv.current.style.height = `${outerDivHeight - innerDivHeight}px`;
        } else {
            topDiv.current.style.height = `0px`;
            if (prevInnerDivHeight.current) {
                outerDiv.current.scrollTo({
                    top: innerDivHeight - prevInnerDivHeight.current + outerDivScrollTop,
                    left: 0,
                    behavior: "auto"
                });
            } else {
                outerDiv.current.scrollTo({
                    top: innerDivHeight - outerDivHeight + 12,
                    left: 0,
                    behavior: "auto" //prevInnerDivHeight.current ? "smooth" :
                });
            }
        }
        prevInnerDivHeight.current = innerDivHeight;
    }, [messageCache[slug]?.messages]);

    // scroll event listener
    useEffect(() => {
        const handleScroll = () => {     
            if (innerDiv.current.clientHeight - outerDiv.current.clientHeight === outerDiv.current.scrollTop) {
                setShowScrollButton(false);
            }
            toBottomShowArrow();
            toBottomNoShowArrow();           
        };
        outerDiv.current.addEventListener('scroll', handleScroll);
    }, []);

    const getMoreMessages = () => {
        getHistoryMessagesPageState(setIsFetching, stop);
    }

    const [isFetching, setIsFetching, stop] = useInfiniteScroll(getMoreMessages, outerDiv);

    const handleScrollButtonClick = useCallback(() => {
        const outerDivHeight = outerDiv.current.clientHeight;
        const innerDivHeight = innerDiv.current.clientHeight;

        outerDiv.current.scrollTo({
            top: innerDivHeight! - outerDivHeight! + 12,
            left: 0,
            behavior: "smooth",
        });

        setShowScrollButton(false);
    }, []);

    const toBottomShowArrow = useCallback(() => {
        const outerDivHeight = outerDiv.current.clientHeight;
        const innerDivHeight = innerDiv.current.clientHeight;
        const outerDivScrollTop = outerDiv.current.scrollTop;

        if (innerDivHeight - outerDivHeight - outerDivScrollTop > 50) {
            setShowScrollButton(true);
        } 
    }, []);

    const toBottomNoShowArrow = useCallback(() => {
        const outerDivHeight = outerDiv.current.clientHeight;
        const innerDivHeight = innerDiv.current.clientHeight;
        const outerDivScrollTop = outerDiv.current.scrollTop;

        if (innerDivHeight - outerDivHeight - outerDivScrollTop < 50) {
            setShowScrollButton(false);
        }
    }, []);


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
        <div
            style={{
                position: "relative",
                height: "100%",
                width: "100%",
                backgroundColor: '#ddd',
                overflow: "hidden",
            }}
        >
            <div
                ref={outerDiv}
                style={{
                    position: "relative",
                    height: "100%",
                    overflowY: "scroll",
                    overflowX: "hidden",
                    flex: '1 1 0',
                }}
            >
                <div ref={topDiv}  style={{
                    flex: '1 1 auto',
                    position: 'relative',
                    minHeight: '12px',
                }}/>
                <div
                    ref={innerDiv}
                    style={{
                        position: "relative",
                        flex: '0 0 auto',
                    }}
                >
                    {
                        isFetching ? (
                            <ScrollTopLoading animationData={topLoaderJson} autoplay={!!isFetching} />
                        ) : null
                    }
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
                </div>
            </div>
            <button
                style={{
                    position: "absolute",
                    bottom: "80px",
                    right: "20px",
                    zIndex: 10,
                    borderRadius: "50%",
                    outline: "none",
                    border: "1px solid transparent",
                    opacity: showScrollButton ? 1 : 0,
                    pointerEvents: showScrollButton ? "auto" : "none",
                }}
                onClick={handleScrollButtonClick}
            >
                <ArrowDowunIcon padding={10} radius={50} />
            </button>
        </div>
    )
};


export default observer(ScrollContainer);


const ScrollTopLoading = styled(Lottie)`
    position: absolute;
    top: 6vh;
    left: 0;
    width: 100%;
`