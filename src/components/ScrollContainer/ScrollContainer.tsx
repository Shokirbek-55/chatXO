
import Lottie from "lottie-react";
import { observer } from "mobx-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import topLoaderJson from "../../assets/topLoader.json";
import useRootStore from "../../hooks/useRootStore";
import { useInfiniteScroll } from "../../hooks/useThrottledEffect";
import { ArrowDowunIcon } from "../../utils/icons";

type ScrollContainerProps = {
    children: React.ReactNode;
};


const ScrollContainer = ({ children }: ScrollContainerProps) => {

    const outerDiv = useRef<HTMLDivElement | any>(null);
    const innerDiv = useRef<HTMLDivElement | any>(null);
    const topDiv = useRef<HTMLDivElement | any>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

    const { getHistoryMessagesPageState, messageCache, slug, prevInnerDivHeight, setPrevInnerDivHeight } = useRootStore().messageStore
    const { isOpenHashTagScreen, getHistoryHashTagsMessagesPageState, allHashTagsMessages } = useRootStore().hashtagStore

    useEffect(() => {
        stop.current = messageCache[slug]?.end || allHashTagsMessages?.end || false;
        const outerDivHeight = outerDiv.current.clientHeight;
        const innerDivHeight = innerDiv.current.clientHeight;
        const outerDivScrollTop = outerDiv.current.scrollTop;

        if (innerDivHeight < outerDivHeight) {
            topDiv.current.style.height = `${outerDivHeight - innerDivHeight}px`;
        } else {
            topDiv.current.style.height = `0px`;
            if (prevInnerDivHeight[slug]) {
                console.log('prevInnerDivHeight[slug]', prevInnerDivHeight[slug]);
                console.log('top1', innerDivHeight - prevInnerDivHeight[slug] + outerDivScrollTop)
                outerDiv.current.scrollTo({
                    top: innerDivHeight - prevInnerDivHeight[slug] + outerDivScrollTop,
                    left: 0,
                    behavior: "auto"
                });
            } else {
                console.log('top2', innerDivHeight - outerDivHeight + 12)
                outerDiv.current.scrollTo({
                    top: innerDivHeight - outerDivHeight + 12,
                    left: 0,
                    behavior: prevInnerDivHeight[slug] ? "smooth" : "auto",
                });
            }
        }
        setPrevInnerDivHeight(slug, innerDivHeight);
    }, [children]);

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
        if (isOpenHashTagScreen) {
            getHistoryHashTagsMessagesPageState(setIsFetching, stop);
        } else {
            getHistoryMessagesPageState(setIsFetching, stop);
        }
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
                    WebkitOverflowScrolling: 'touch',
                }}
            >
                <div ref={topDiv} style={{
                    flex: '1 1 auto',
                    position: 'relative',
                    minHeight: '12px',
                }} />
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
                    {children}
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