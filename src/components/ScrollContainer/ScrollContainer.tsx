
import React, { useRef, useEffect, useState, useCallback } from "react";
import { ArrowDowunIcon } from "../../utils/icons";

type ScrollContainerProps = {
    children: React.ReactNode;
    header: React.ReactNode;
    input: React.ReactNode;
};

const ScrollContainer = ({ children, header,input }:ScrollContainerProps) => {
    const outerDiv = useRef<HTMLDivElement | any>(null);
    const innerDiv = useRef<HTMLDivElement | any>(null);

    const prevInnerDivHeight = useRef(null);

    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        const outerDivHeight = outerDiv.current.clientHeight;
        const innerDivHeight = innerDiv.current.clientHeight;
        const outerDivScrollTop = outerDiv.current.scrollTop;

        if (
            !prevInnerDivHeight.current ||
            outerDivScrollTop === prevInnerDivHeight.current - outerDivHeight
        ) {
            outerDiv.current.scrollTo({
                top: innerDivHeight! - outerDivHeight!,
                left: 0,
                behavior: prevInnerDivHeight.current ? "smooth" : "auto"
            });
        } else {
            setShowScrollButton(true);
        };

        prevInnerDivHeight.current = innerDivHeight;
    }, [children]);

    const handleScrollButtonClick = useCallback(() => {
        const outerDivHeight = outerDiv.current.clientHeight;
        const innerDivHeight = innerDiv.current.clientHeight;

        outerDiv.current.scrollTo({
            top: innerDivHeight! - outerDivHeight! + 10,
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


    return (
        <div
            style={{
                position: "relative",
                height: "100%",
                width: "100%",
                backgroundColor: 'green',
            }}
        >
            {header}
            <div
                ref={outerDiv}
                style={{
                    position: "relative",
                    height: "100%",
                    overflowY: "scroll",
                }}
            >
                <div
                    ref={innerDiv}
                    style={{
                        position: "relative"
                    }}
                >
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
            <div style={{
                position: "absolute",
                bottom: "0",
                width: "100%",
            }}>
                {input}
            </div>
        </div>
    )
};


export default ScrollContainer;