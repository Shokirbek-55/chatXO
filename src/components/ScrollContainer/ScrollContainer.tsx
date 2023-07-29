
import React, { useRef, useEffect, useState, useCallback } from "react";
import { ArrowDowunIcon } from "../../utils/icons";
import { styled } from "styled-components";

type ScrollContainerProps = {
    children: React.ReactNode;
    header: React.ReactNode;
    input: React.ReactNode;
};

const ScrollContainer = ({ children, header,input }:ScrollContainerProps) => {
    const outerDiv = useRef<HTMLDivElement | any>(null);
    const innerDiv = useRef<HTMLDivElement | any>(null);
    const inputDiv = useRef<HTMLDivElement | any>(null);

    const topDiv = useRef<HTMLDivElement | any>(null);

    // const prevInnerDivHeight = useRef(null);

    const [showScrollButton, setShowScrollButton] = useState(false);

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

    useEffect(() => {
        const outerDivHeight = outerDiv.current.clientHeight;
        const innerDivHeight = innerDiv.current.clientHeight;
        const outerDivScrollTop = outerDiv.current.scrollTop;

        if (innerDivHeight < outerDivHeight) {
            topDiv.current.style.height = `${outerDivHeight - innerDivHeight}px`;
        } else {
            topDiv.current.style.height = `0px`;
            outerDiv.current.scrollTo({
                top: innerDivHeight - outerDivHeight + 12,
                left: 0,
                behavior: "auto" //prevInnerDivHeight.current ? "smooth" :
            });
        }
        
        // if (
        //     !prevInnerDivHeight.current ||
        //     outerDivScrollTop === prevInnerDivHeight.current - outerDivHeight
        // ) {
            // outerDiv.current.scrollTo({
            //     top: innerDivHeight! - outerDivHeight! + 12,
            //     left: 0,
            //     behavior: "auto" //prevInnerDivHeight.current ? "smooth" :
            // });
        // } else {
        //     setShowScrollButton(true);
        // };

        // prevInnerDivHeight.current = innerDivHeight;
    }, [children]);

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
                backgroundColor: 'green',
                overflow: "hidden",
            }}
        >
            <div style={{
                position: "absolute",
                top: "0",
                width: "100%",
                zIndex: 11,
                height: 'auto',
            }}
            >
                {header}
            </div>
            <div
                ref={outerDiv}
                style={{
                    position: "relative",
                    height: "100%",
                    overflowY: "scroll",
                    // border: "1px solid red",
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
                        // border: "1px solid black",
                        flex: '0 0 auto',
                    }}
                >
                    <div />
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
                zIndex: 10,
                height: 'auto',
            }}
                ref={inputDiv}
            >
                {input}
            </div>
        </div>
    )
};


export default ScrollContainer;