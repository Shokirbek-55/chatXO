import Lottie from 'lottie-react';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import topLoaderJson from '../../assets/topLoader.json';
import useRootStore from '../../hooks/useRootStore';
import { useInfiniteScroll } from '../../hooks/useThrottledEffect';
import { ArrowDowunIcon } from '../../utils/icons';

type ScrollContainerProps = {
    children: React.ReactNode;
};

const SCROLL_PRECISION = 800;

const ScrollContainer = ({ children }: ScrollContainerProps) => {
    const outerDiv = useRef<HTMLDivElement | any>(null);
    const innerDiv = useRef<HTMLDivElement | any>(null);
    const topDiv = useRef<HTMLDivElement | any>(null);
    const prevInnerDiv = useRef<Number | any>(null);
    const prevScrollTop = useRef<number | any>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

    const { getHistoryMessagesPageState } = useRootStore().messageStore;
    const { isOpenHashTagScreen, getHistoryHashTagsMessagesPageState } = useRootStore().hashtagStore;

    useEffect(() => {
        // TODO: yangi message cache bo'yicha quydagi qatorni yangilash kerak
        // stop.current = messageCache[slug]?.end || allHashTagsMessages?.end || false;
        const outerDivHeight = outerDiv.current.clientHeight;
        const innerDivHeight = innerDiv.current.clientHeight;
        const outerDivScrollTop = outerDiv.current.scrollTop;

        if (innerDivHeight < outerDivHeight) {
            topDiv.current.style.height = `${outerDivHeight - innerDivHeight}px`;
        } else {
            topDiv.current.style.height = `0px`;
            if (prevInnerDiv.current) {
                console.log('prevInnerDivHeight[slug]', prevInnerDiv.current);
                console.log('top1', innerDivHeight - prevInnerDiv.current + outerDivScrollTop);
                outerDiv.current.scrollTo({
                    top: innerDivHeight - prevInnerDiv.current + outerDivScrollTop,
                    left: 0,
                    behavior: 'auto',
                });
            } else {
                console.log('top2', innerDivHeight - outerDivHeight + 12);
                outerDiv.current.scrollTo({
                    top: innerDivHeight - outerDivHeight + 12,
                    left: 0,
                    behavior: prevInnerDiv.current ? 'smooth' : 'auto',
                });
            }
        }
        prevInnerDiv.current = innerDivHeight;
    }, [children]);

    const handleScroll = () => {
        const list = outerDiv.current;
        const innerDivHeight = innerDiv.current.clientHeight;

        const scrollToNext = prevScrollTop.current > list.scrollTop;

        if (prevScrollTop.current !== null) {
            if (scrollToNext && list.scrollTop <= SCROLL_PRECISION) {
                // onLoadNext();
                console.log('onLoadNext');
            }

            if (!scrollToNext && list.scrollTop + list.offsetHeight >= list.scrollHeight - SCROLL_PRECISION) {
                // onLoadPrevious();
                console.log('onLoadPrevious');
            }
        }

        prevScrollTop.current = list.scrollTop;

        if (innerDivHeight - list.clientHeight - list.scrollTop > 50) {
            setShowScrollButton(true);
        } else {
            setShowScrollButton(false);
        }
    };

    const getMoreMessages = () => {
        if (isOpenHashTagScreen) {
            getHistoryHashTagsMessagesPageState(setIsFetching, stop);
        } else {
            getHistoryMessagesPageState(setIsFetching, stop);
        }
    };

    const [isFetching, setIsFetching, stop] = useInfiniteScroll(getMoreMessages, outerDiv);

    const handleScrollButtonClick = useCallback(() => {
        const outerDivHeight = outerDiv.current.clientHeight;
        const innerDivHeight = innerDiv.current.clientHeight;

        outerDiv.current.scrollTo({
            top: innerDivHeight! - outerDivHeight! + 12,
            left: 0,
            behavior: 'smooth',
        });

        setShowScrollButton(false);
    }, []);

    return (
        <Container>
            <div ref={outerDiv} className="outerDiv" onScroll={handleScroll}>
                <div ref={topDiv} className="topDiv" />
                <div ref={innerDiv} className="innerDiv">
                    {isFetching ? <ScrollTopLoading animationData={topLoaderJson} autoplay={!!isFetching} /> : null}
                    {children}
                </div>
            </div>
            {showScrollButton && (
                <button className="bottomButton" onClick={handleScrollButtonClick}>
                    <ArrowDowunIcon />
                </button>
            )}
        </Container>
    );
};

export default observer(ScrollContainer);

const ScrollTopLoading = styled(Lottie)`
    position: absolute;
    top: 6vh;
    left: 0;
    width: 100%;
`;

const Container = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    background-color: #fff;
    overflow: hidden;

    .outerDiv {
        position: relative;
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        flex: 1 1 0;
        -webkit-overflow-scrolling: touch;
    }

    .innerDiv {
        position: relative;
        flex: 0 0 auto;
    }

    .topDiv {
        flex: 1 1 auto;
        position: relative;
        min-height: 12px;
    }

    .bottomButton {
        position: absolute;
        bottom: 80px;
        right: 20px;
        z-index: 10;
        border-radius: 50%;
        outline: none;
        border: 1px solid transparent;
        opacity: 1;
        pointer-events: auto;
    }
`;
