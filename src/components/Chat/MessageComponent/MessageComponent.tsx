import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { ChannelsUsersType, RawMessage } from '../../../types/channel';
import { relevanceFuniction } from '../../../utils/boxShadov';
import DropDownMenu from '../DropDownMenu/dropdownmenu';
import MessageHeader from '../MessageHeader';
import { ReplyTypeRender } from '../ReplyedMessage/beforeSendReply';
import { Tag, Tooltip } from 'antd';
import Text from '../../Text/Text';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import useRootStore from '../../../hooks/useRootStore';
import { observer } from 'mobx-react-lite';
import { RenderMessage } from '../AllMessage/AllMessage';
import MessageBox from '../MessageBox';
import SmallAvatar from '../../SmallAvatar/smallAvatar';
import { Env } from '../../../env';
import { extractHourMinute } from '../../../helper/helper';

interface Props {
    message: RawMessage;
    users: {
        [key: string]: ChannelsUsersType;
    };
    isFirst: boolean;
    isLast: boolean;
    _ref: (node: HTMLDivElement | null) => void;
}

const MessageComponent: FC<Props> = ({ message, users, isFirst, isLast, _ref }) => {
    const navigate = useNavigate();
    const { name } = useParams();
    const messageRef = useRef<HTMLDivElement>(null);
    const { isOpenHashTagScreen, setHashTags, enter } = useRootStore().hashtagStore;
    const { openInUser } = useRootStore().routerStore;
    const { getFriendDetails } = useRootStore().usersStore;
    const { user } = useRootStore().authStore;
    const [pimp, setPimp] = useState<
        | {
              pimpType: 'pimp' | 'unPimp';
              value: number | undefined;
          }
        | undefined
    >(undefined);

    useEffect(() => {
        if (_ref) _ref(messageRef.current);
    }, [_ref]);

    const msg = useMemo(() => {
        return pimp !== undefined ? { ...message, relevance: pimp.value } : message;
    }, [pimp?.pimpType, pimp?.value, message]);

    const MESSAGE_STYLE = relevanceFuniction(msg);
    const boxShadov = MESSAGE_STYLE?.boxShadow;
    const currentUser: ChannelsUsersType | undefined = users?.[message.userId];
    const position = useMemo(() => msg.userId === user.id, [user, msg]);

    const handleHashTagClick = (tag: string) => {
        if (isOpenHashTagScreen) {
            setHashTags(tag);
            enter();
        } else {
            setHashTags(tag);
            enter();
            navigate(
                generatePath('/:name', {
                    name: name || '',
                }) +
                    generatePath('/:hashtag', {
                        hashtag: tag,
                    }),
            );
        }
    };

    const openUserAccount = () => {
        if (user.id === currentUser?.id) return;
        getFriendDetails(currentUser?.id);
        openInUser();
    };

    const renderMessage = useMemo(() => <RenderMessage message={msg} />, [msg, pimp]);

    if (msg.userId === -1) {
        return (
            <MessageBoxContainer $isFirst={isFirst} $isLast={isLast} ref={messageRef}>
                <MessageBox text={msg.message} own={0} />
            </MessageBoxContainer>
        );
    }

    return (
        <MessageBoxContainer $isFirst={isFirst} $isLast={isLast} ref={messageRef}>
            <Container $position={position} $isRaplayed={msg.isReply}>
                <MessageAvatar $position={position}>
                    <SmallAvatar
                        forMessage
                        color={currentUser?.color || msg.color}
                        imageUrl={currentUser?.avatar && `${Env.AssetsUrl}/${currentUser?.avatar}`}
                        onPress={openUserAccount}
                    />
                </MessageAvatar>
                <BoxShadow $boxShodow={boxShadov}>
                    <MessageHeader
                        name={msg.username}
                        color={currentUser?.color || msg.color}
                        userId={msg.userId}
                        message={msg}
                        setPimp={setPimp}
                        titleOnPress={openUserAccount}
                    >
                        <MessageContainer>
                            <DropDownMenu massage={msg}>
                                <AudioPlayContainer>
                                    {msg.isReply && (
                                        <div className="replayMessage">
                                            <MessageHeader
                                                name={msg.originMessage?.username}
                                                showReply
                                                color={msg?.color}
                                                style={{
                                                    fontFamily: 'sans-serif',
                                                    fontSize: '20px',
                                                }}
                                                message={msg?.originMessage as RawMessage}
                                            />
                                            <div className="messageMain">{ReplyTypeRender(msg)}</div>
                                        </div>
                                    )}
                                    {renderMessage}
                                    <MessageFooter>
                                        <HashTagsContainer>
                                            {msg.hashtags &&
                                                msg.hashtags.map((tag, index) => {
                                                    const isLongTag = tag.length > 20;
                                                    const tagElem = (
                                                        <Tag key={index} onClick={() => handleHashTagClick(tag)}>
                                                            <Text
                                                                fontSize="12px"
                                                                fontFamily="Montserrat"
                                                                fontWeight={600}
                                                                margin="0"
                                                            >
                                                                #{isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                                            </Text>
                                                        </Tag>
                                                    );
                                                    return isLongTag ? (
                                                        <Tooltip title={tag} key={tag}>
                                                            {tagElem}
                                                        </Tooltip>
                                                    ) : (
                                                        tagElem
                                                    );
                                                })}
                                        </HashTagsContainer>
                                        <TimeViewContainer>
                                            <Text
                                                fontSize="10px"
                                                fontWeight={500}
                                                style={{
                                                    textAlign: 'end',
                                                }}
                                            >
                                                {extractHourMinute(msg.timestamp)}
                                            </Text>
                                        </TimeViewContainer>
                                    </MessageFooter>
                                </AudioPlayContainer>
                            </DropDownMenu>
                        </MessageContainer>
                    </MessageHeader>
                </BoxShadow>
            </Container>
        </MessageBoxContainer>
    );
};

export default observer(MessageComponent);

const MessageBoxContainer = styled.div<{ $isFirst: boolean; $isLast: boolean }>`
    padding-bottom: ${({ $isFirst }) => ($isFirst ? '7.5vh' : '0')};
    padding-top: ${({ $isLast }) => ($isLast ? '7vh' : '0')};
`;

const Container = styled.div<{ $isRaplayed?: boolean; $position?: boolean }>`
    width: 100%;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    justify-content: ${({ $position }) => ($position ? 'flex-end' : 'flex-start')};
`;

const MessageContainer = styled.div`
    width: 100%;
    height: 100%;

    .avatarCard {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .replayMessage {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 0 10px;
        margin-top: 5px;
        cursor: pointer;

        .messageMain {
            margin-bottom: 5px;
        }
    }
`;

const AudioPlayContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 15px;
    background-color: #fff;
    z-index: 1;
`;

const BoxShadow = styled.div<{ $boxShodow?: string }>`
    width: fit-content;
    position: relative;
    height: 100%;
    border-radius: 15px;
    box-shadow: ${({ $boxShodow }) => $boxShodow || 'none'};
    z-index: auto;
`;

const MessageFooter = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: auto 30px;
    padding: 0 15px;
    margin-bottom: 10px;
`;

const HashTagsContainer = styled.div`
    width: 100%;
    height: auto;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
    flex-wrap: wrap;
`;

const TimeViewContainer = styled.div`
    width: 100%;
    align-self: flex-end;
    justify-self: flex-end;
`;

const MessageAvatar = styled.div<{ $position?: boolean }>`
    display: ${({ $position }) => ($position ? 'none' : 'flex')};
    align-self: flex-end;
    z-index: 2;
`;
