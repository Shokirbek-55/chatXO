import { observer } from "mobx-react-lite";
import { FC } from "react";
import { styled } from "styled-components";
import { Env } from "../../../env";
import { ChannelsUsersType, RawMessage } from "../../../types/channel";
import { relevanceFuniction } from "../../../utils/boxShadov";
import SmallAvatar from "../../SmallAvatar/smallAvatar";
import DropDownMenu from "../DropDownMenu/dropdownmenu";
import MessageHeader from "../MessageHeader";
import { ReplyTypeRender } from "../ReplyedMessage/beforeSendReply";

interface Props {
  message: RawMessage;
  position: boolean;
  users?: {
    [key: string]: ChannelsUsersType;
  };
  children: React.ReactNode;
}

const MessageComponent: FC<Props> = ({ message, users, position, children }) => {

  const currentUser: ChannelsUsersType | undefined = users?.[message.userId];

  const MESSAGE_STYLE = relevanceFuniction(message);
  const boxShadov = MESSAGE_STYLE?.boxShadow;

  return (
    <Container $position={position} $isRaplayed={message.isReply}>
      <div className='childContainer'>
        {!position && (
          <MessageHeader
            name={message.username}
            relevance={message.relevance}
            color={message.color || currentUser?.color}
          />
        )}
        <div className='messageCard'>
          {!position && (
            <div className='avatarCard'>
              <SmallAvatar
                color={currentUser?.color || message.color}
                imageUrl={
                  currentUser?.avatar
                    ? `${Env.AssetsUrl}/${currentUser?.avatar}`
                    : ""
                }
              />
            </div>
          )}
          <DropDownMenu massage={message}>
            <BoxShadow $boxShodow={boxShadov}>
              <AudioPlayContainer>
                {
                  message.isReply
                  && (<div className="replayMessage" onClick={()=>{}}>
                    <MessageHeader
                      name={message.originMessage?.username}
                      showReply
                      color={message?.color}
                      style={{
                        fontFamily: "sans-serif",
                        fontSize: "20px",
                      }}
                    />
                    <div className="messageMain">
                      {ReplyTypeRender(message)}
                    </div>
                  </div>)
                }
                {children}
              </AudioPlayContainer>
            </BoxShadow>
          </DropDownMenu>
        </div>
      </div>
    </Container>
  );
};

export default observer(MessageComponent);

const Container = styled.div<{ $isRaplayed?: boolean, $position?: boolean }>`
  width: 100%;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: ${({ $position }) => $position ? "flex-end" : "flex-start"};

  .childContainer {
    width: fit-content;
  }

  .messageCard {
    display: flex;
    flex-direction: row;
    gap: 10px;

    .avatarCard {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }

    .replayMessage{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 0 10px;
      margin-top: 5px;
      cursor: pointer;

      .messageMain{
        margin-bottom: 5px;
      }
    }
  }
`

const AudioPlayContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 15px;
    background-color: rgb(242, 242, 240);
    z-index: 1;
`

const BoxShadow = styled.div<{ $boxShodow?: string }>`
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: ${({ $boxShodow }) => $boxShodow || "none"};
    z-index: auto;
`;
