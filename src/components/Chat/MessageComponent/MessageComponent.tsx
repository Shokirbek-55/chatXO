import { FC, useMemo, useState } from "react";
import { styled } from "styled-components";
import { Env } from "../../../env";
import { ChannelsUsersType, RawMessage } from "../../../types/channel";
import { relevanceFuniction } from "../../../utils/boxShadov";
import SmallAvatar from "../../SmallAvatar/smallAvatar";
import DropDownMenu from "../DropDownMenu/dropdownmenu";
import MessageHeader from "../MessageHeader";
import { ReplyTypeRender } from "../ReplyedMessage/beforeSendReply";
import { Tag, Tooltip } from "antd";
import Text from "../../Text/Text";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import useRootStore from "../../../hooks/useRootStore";
import { observer } from "mobx-react-lite";
import { RenderMessage } from "../AllMessage/AllMessage";
import MessageBox from "../MessageBox";
import { toJS } from "mobx";

interface Props {
    message: RawMessage;
    users: {
        [key: string]: ChannelsUsersType;
    };
}

const MessageComponent: FC<Props> = ({
    message,
    users,
}) => {
    const navigate = useNavigate();
    const { name } = useParams();
    const { isOpenHashTagScreen, setHashTags, enter } =
        useRootStore().hashtagStore;
    const { toRouterManageCh, manageRouters, openInUser } =
        useRootStore().routerStore;
    const { getFriendDetails } = useRootStore().usersStore;
    const { user } = useRootStore().authStore;
    const [pimp, setPimp] = useState<{
        pimpType: 'pimp' | 'unPimp',
        value: number | undefined
    } | undefined>(undefined)

    const msg = useMemo(() => {
        return pimp !== undefined ? { ...message, relevance: pimp.value } : message
    }, [pimp?.pimpType, message])
    const currentUser: ChannelsUsersType | undefined = users?.[message.userId];

    const MESSAGE_STYLE = relevanceFuniction(msg);
    const boxShadov = MESSAGE_STYLE?.boxShadow;

    const handleHashTagClick = (tag: string) => {
        if (isOpenHashTagScreen) {
            setHashTags(tag);
            enter();
        } else {
            setHashTags(tag);
            enter();
            navigate(
                generatePath("/:name", {
                    name: name || "",
                }) +
                    generatePath("/:hashtag", {
                        hashtag: tag,
                    })
            );
        }
    };

    const openUserAccount = (userId: number) => {
        getFriendDetails(userId);
        openInUser();
    };

    const position = useMemo(() => message.userId === user.id, [user, message])

    const renderMessage = useMemo(() => <RenderMessage message={msg} />, [msg.relevance])
    
    if (message.userId === -1) {
        return <MessageBox text={msg.message} own={0} />;
    }

    return (
        <Container $position={position} $isRaplayed={msg.isReply}>
            <div className="childContainer">
                {!position && (
                    <MessageHeader
                        name={msg.username}
                        relevance={msg.relevance}
                        color={currentUser?.color || msg.color}
                        userId={msg.userId}
                        message={msg}
                        setPimp={setPimp}
                    />
                )}
                <div className="messageCard">
                    {!position && (
                        <div className="avatarCard">
                            <SmallAvatar
                                onPress={() =>
                                    openUserAccount(currentUser?.id as never)
                                }
                                color={currentUser?.color || message.color}
                                imageUrl={
                                    currentUser?.avatar
                                        ? `${Env.AssetsUrl}/${currentUser?.avatar}`
                                        : ""
                                }
                            />
                        </div>
                    )}
                    <DropDownMenu massage={msg}>
                        <BoxShadow $boxShodow={boxShadov}>
                            <AudioPlayContainer>
                                {msg.isReply && (
                                    <div
                                        className="replayMessage"
                                        onClick={() => {}}
                                    >
                                        <MessageHeader
                                            name={
                                                msg.originMessage?.username
                                            }
                                            showReply
                                            color={msg?.color}
                                            style={{
                                                fontFamily: "sans-serif",
                                                fontSize: "20px",
                                            }}
                                        />
                                        <div className="messageMain">
                                            {ReplyTypeRender(msg)}
                                        </div>
                                    </div>
                                )}
                                {renderMessage}
                                <HashTagsContainer
                                    $isHas={
                                        msg.hashtags &&
                                        msg.hashtags.length > 0
                                    }
                                >
                                    {msg.hashtags &&
                                        msg.hashtags.map((tag, index) => {
                                            const isLongTag = tag.length > 20;
                                            const tagElem = (
                                                <Tag
                                                    key={index}
                                                    onClick={() =>
                                                        handleHashTagClick(tag)
                                                    }
                                                >
                                                    <Text
                                                        fontSize="12px"
                                                        fontFamily="Montserrat5"
                                                        margin="0"
                                                    >
                                                        #
                                                        {isLongTag
                                                            ? `${tag.slice(
                                                                  0,
                                                                  20
                                                              )}...`
                                                            : tag}
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
                            </AudioPlayContainer>
                        </BoxShadow>
                    </DropDownMenu>
                </div>
            </div>
        </Container>
    );
};

export default observer(MessageComponent);

const Container = styled.div<{ $isRaplayed?: boolean; $position?: boolean }>`
    width: 100%;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    justify-content: ${({ $position }) =>
        $position ? "flex-end" : "flex-start"};

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
    }
`;

const AudioPlayContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 15px;
    background-color: rgb(242, 242, 240);
    z-index: 1;
`;

const BoxShadow = styled.div<{ $boxShodow?: string }>`
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: ${({ $boxShodow }) => $boxShodow || "none"};
    z-index: auto;
`;

const HashTagsContainer = styled.div<{ $isHas: boolean }>`
    width: 100%;
    height: auto;
    padding: 0 15px 10px 15px;
    display: ${({ $isHas }) => ($isHas ? "flex" : "none")};
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
    flex-wrap: wrap;
`;
