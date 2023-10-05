import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import ScrollContainer from "../../../components/ScrollContainer/ScrollContainer";
import ChatHeader from "../../../utils/chatHeader";
import MessageInput from "./components/messageInput/MessageInput";

const Chat = () => {
    const navigate = useNavigate();

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

    return (
        <ChatContainer id="chatView">
            <ChatHeader/>
            <ScrollContainer />
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
