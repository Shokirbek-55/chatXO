import { observer } from "mobx-react-lite";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import ScrollContainer from "../../../components/ScrollContainer/ScrollContainer";
import MessageInput from "./components/messageInput/MessageInput";
import useRootStore from "../../../hooks/useRootStore";
import _ from "lodash";
import ChatHeaderHashtag from "../../../utils/chatHeaderHashtag";
import MessageComponent from "../../../components/Chat/MessageComponent/MessageComponent";

const ChatHashtag = () => {
  const navigate = useNavigate();
  const { allHashTagsMessages, exit } = useRootStore().hashtagStore;
  const { messageCache, slug, messagesFilterValue, setIsMessagesLength } =
    useRootStore().messageStore;

  useEffect(() => {
    const handleEsc = (event: any) => {
      if (event.keyCode === 27) {
        navigate("/");
      }
    };
    window.addEventListener("keydown", handleEsc);
    window.addEventListener("popstate", exit);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      window.addEventListener("popstate", exit);
    };
  }, []);

  const messages = useMemo(() => {
    const messagesData = allHashTagsMessages.messages;
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
  }, [allHashTagsMessages.messages, slug, messagesFilterValue]);

  return (
    <ChatContainer id="chatView">
      <ChatHeaderHashtag />
      <ScrollContainer>
        {_.map(messages, (message, index) => {
          return (
            <MessageComponent
              isLast={0 === index}
              isFirst={allHashTagsMessages.messages?.length - 1 === index}
              ref={(ref) => {}}
              key={message.id}
              message={message}
              users={messageCache[slug]?.channelUsers}
            />
          );
        })}
      </ScrollContainer>
      <MessageInput />
    </ChatContainer>
  );
};

export default observer(ChatHashtag);

const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;
