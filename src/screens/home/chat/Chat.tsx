import _ from "lodash";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import MessageComponent from "../../../components/Chat/MessageComponent/MessageComponent";
import ScrollContainer from "../../../components/ScrollContainer/ScrollContainer";
import useRootStore from "../../../hooks/useRootStore";
import ChatHeader from "../../../utils/chatHeader";
import MessageInput from "./components/messageInput/MessageInput";
import { toJS } from "mobx";

const Chat = () => {
  const navigate = useNavigate();
  const {
    messageCache,
    messagesFilterValue,
    setIsMessagesLength,
    getSelectedChannelMsgs,
  } = useRootStore().messageStore;
  const { closeRightSideBar } = useRootStore().routerStore;
  const {
    selectedChannelData: { slug },
  } = useRootStore().channelStore;

  useEffect(() => {
    const handleEsc = (event: any) => {
      if (event.keyCode === 27) {
        navigate("/");
        closeRightSideBar();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [closeRightSideBar, navigate]);

  const messagesV2: React.ReactNode[] = [];
  for (let i = 0; i < getSelectedChannelMsgs.length; i++) {
    const msg = getSelectedChannelMsgs[i];
    messagesV2.unshift(
      <MessageComponent
        isFirst={0 === i}
        isLast={messageCache[slug].messages?.length - 1 === i}
        ref={(ref) => {}}
        key={msg.id}
        message={msg}
        users={messageCache[slug]?.channelUsers}
      />,
    );
  }
  const messages = useMemo(() => {
    const messagesData = messageCache[slug]?.messages;
    if (messagesData?.length === 0) {
      setIsMessagesLength(true);
      return [];
    }
    if (messagesFilterValue !== 0) {
      setIsMessagesLength(false);
      return messagesData.filter(
        (e) => e.relevance && e.relevance >= messagesFilterValue,
      );
    }
    setIsMessagesLength(false);
    return messagesData;
  }, [messageCache[slug]?.messages.length, slug, messagesFilterValue]);

  return (
    <ChatContainer id="chatView">
      <ChatHeader />
      <ScrollContainer>
        {/* {_.map(messages, (message, index) => {
          return (
            <MessageComponent
              isFirst={messageCache[slug].messages?.length - 1 === index}
              isLast={0 === index}
              ref={(ref) => {}}
              key={message.id}
              message={message}
              users={messageCache[slug]?.channelUsers}
            />
          );
        })} */}
        {messagesV2}
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
