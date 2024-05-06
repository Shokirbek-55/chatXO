import {
  CSSProperties,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { RawMessage } from "../../../types/channel";
import { lightenColor, relevanceFuniction } from "../../../utils/boxShadov";
import useRootStore from "../../../hooks/useRootStore";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import Text from "../../Text/Text";
import { DataObject } from "../../../types";
import { parseJsonData } from "../../../helper/helper";

interface Props {
  message: RawMessage;
  name?: string;
  showReply?: boolean;
  color?: string;
  userId?: number;
  style?: CSSProperties;
  setPimp?: Dispatch<
    SetStateAction<
      | {
          pimpType: "pimp" | "unPimp";
          value: number | undefined;
        }
      | undefined
    >
  >;
  children?: ReactNode;
  titleOnPress?: () => void;
}

const MessageHeader = ({
  message,
  name,
  color = "",
  showReply,
  userId,
  setPimp,
  children,
  titleOnPress,
}: Props) => {
  const MESSAGE_STYLE = relevanceFuniction(message);
  const textSize = MESSAGE_STYLE.fontSize;

  const { getOneMember, channelUsers } = useRootStore().channelStore;
  const { pimpMessage, unPimpMessage } = useRootStore().chatStore;
  const { user } = useRootStore().authStore;
  const [activePimp, setActivePimp] = useState(false);

  const myself = useMemo(
    () => channelUsers.find((e) => e.id === user.id),
    [channelUsers, user]
  );

  const data: DataObject = useMemo(
    () => (message?.pimps ? parseJsonData(message.pimps) : {}),
    [message]
  );

  useEffect(() => {
    setActivePimp(data ? data.hasOwnProperty(user.id) : false);
  }, [data, user]);

  const onRelevance = () => {
    getOneMember(userId || 0);
  };

  const PimpMesssage = () => {
    pimpMessage(
      userId,
      message.messageId,
      message.channelSlug,
      message.timestamp
    );
    console.log(toJS(myself));
    setPimp &&
      setPimp({
        pimpType: "pimp",
        value: myself?.relevance,
      });
    setActivePimp(true);
  };

  const UnPimpMesssage = () => {
    unPimpMessage(
      userId,
      message.messageId,
      message.channelSlug,
      message.timestamp
    );
    const keys = Object.keys(data);
    const il = keys[0] === `${user?.id}` ? 1 : 0;
    console.log(toJS(message));
    setPimp &&
      setPimp({
        pimpType: "unPimp",
        value: data[`${keys[il]}`],
      });
    setActivePimp(false);
  };

  const star = useMemo(() => {
    if (userId === user.id) return null;
    return activePimp ? (
      <AiFillStar color="#FFAA33" size={14} onClick={() => UnPimpMesssage()} />
    ) : (
      <AiOutlineStar size={14} color="#999" onClick={() => PimpMesssage()} />
    );
  }, [activePimp, userId, user]);

  return (
    <Container $backColor={lightenColor(color)}>
      <HeaderContainer>
        <Button onClick={titleOnPress}>
          <Text fontSize={textSize} color={color} fontWeight={700}>
            {name}
          </Text>
        </Button>
        {!showReply && (
          <div className="relevanceBox">
            <div className="relevances">
              <Button onClick={() => onRelevance()}>
                <Text fontSize={"14px"} fontWeight={500} color="#EE35AF">
                  {message?.minRelevance === -1 ? "" : message?.minRelevance}
                </Text>
              </Button>
              <Button onClick={() => onRelevance()}>
                <Text fontSize={"14px"} fontWeight={500} color="#999">
                  {message?.relevance || 0}
                </Text>
              </Button>
            </div>
            {star}
          </div>
        )}
      </HeaderContainer>
      <MessageContainer>{children}</MessageContainer>
    </Container>
  );
};
export default observer(MessageHeader);

const Container = styled.div<{ $backColor: string }>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.$backColor ? props.$backColor : "#f44"};
  border-radius: 15px;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  gap: 15px;

  .relevanceBox {
    display: flex;
    gap: 7px;
    align-items: center;

    .relevances {
      display: flex;
      gap: 7px;
    }
  }
`;

const MessageContainer = styled.div`
  width: 100%;
`;

const Button = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
`;
