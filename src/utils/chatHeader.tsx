import React from 'react';
import { Spin, Tag, Tooltip } from 'antd';
import { observer } from 'mobx-react';
import { GrFormClose } from 'react-icons/gr';
import styled from 'styled-components';
import { InputComponent } from '../components/InputSearch/inputComponent';
import SmallAvatar from '../components/SmallAvatar/smallAvatar';
import Text from '../components/Text/Text';
import { TMP_URL } from '../env';
import useRootStore from '../hooks/useRootStore';
import { ArrowDowunIcon, ArrowUpIcon, CloserNoCirculIcon, HashtagIcon, SearchIcon } from './icons';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

const ChatHeader = () => {
    const [isOpenAllHashTags, setIsOpenAllHashTags] = React.useState<boolean>(false);
    const { visible, toglevisible } = useRootStore().visibleStore;
    const { openRightSideBar } = useRootStore().routerStore;
    const { setSearch, searchMessage, slug, clearSearch, searchMessageState, searchMessages } =
        useRootStore().messageStore;

    const {
        hashTags,
        removeHashTags,
        getChannelAllHashTags,
        isLoading,
        allChatHashTags,
        enter,
        setHashTags,
        isOpenHashTagScreen,
    } = useRootStore().hashtagStore;

    const { getSelectedChannelData } = useRootStore().channelStore;
    const navigate = useNavigate();
    const { name } = useParams();

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

    const searchHandle = (e: string) => {
        setSearch(e);
        searchMessage(e, slug);
    };

    const ToggleSearchInput = () => {
        clearSearch();
        toglevisible('setSearch');
    };

    const OpenManageChannel = () => {
        openRightSideBar();
    };

    const handleClose = (removedTag: string) => {
        removeHashTags(removedTag);
        handleHashTagClick(removedTag);
    };

    return (
        <BassComponent>
            <div className="container">
                <header>
                    <div onClick={OpenManageChannel}>
                        <SmallAvatar
                            imageUrl={
                                getSelectedChannelData.avatar ? `${TMP_URL}/${getSelectedChannelData.avatar}` : ''
                            }
                            color={getSelectedChannelData.color || ''}
                        />
                        <h3>{getSelectedChannelData.name}</h3>
                    </div>
                </header>
                <div>
                    <button
                        style={{
                            outline: 'none',
                            border: 'none',
                            background: 'transparent',
                        }}
                        onClick={() => {
                            getChannelAllHashTags();
                            setIsOpenAllHashTags(true);
                        }}
                    >
                        {isLoading && allChatHashTags.length === 0 ? (
                            <Spin />
                        ) : (
                            <HashtagIcon size={24} color="#303030" />
                        )}
                    </button>
                    {visible.setSearch && (
                        <div>
                            <InputComponent
                                onChangeText={e => searchHandle(e)}
                                backColor="transparent"
                                width="200px"
                                value={searchMessageState}
                            />
                            <span>
                                <ArrowDowunIcon size={24} padding={1} />
                            </span>
                            <span>
                                {searchMessageState.length > 0 ? searchMessages.count : null}
                                <ArrowUpIcon size={24} padding={1} />
                            </span>
                        </div>
                    )}
                    <button
                        style={{
                            outline: 'none',
                            border: 'none',
                            background: 'transparent',
                        }}
                        onClick={ToggleSearchInput}
                    >
                        {visible.setSearch ? (
                            <CloserNoCirculIcon size={24} color="#303030" />
                        ) : (
                            <SearchIcon size={24} color="#303030" />
                        )}
                    </button>
                </div>
            </div>
            <HashTagContainer $isHas={allChatHashTags.length > 0 && isOpenAllHashTags}>
                <Text fontSize="12px" fontFamily="Montserrat" fontWeight={600} margin="0 5px 0 0">
                    All hashtags:
                </Text>
                {allChatHashTags.map((tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag key={index} onClose={() => handleClose(tag)} style={{ cursor: 'pointer' }}>
                            <Text
                                handleLink={() => handleClose(tag)}
                                fontSize="12px"
                                fontFamily="Montserrat"
                                fontWeight={600}
                                margin="0"
                                style={{
                                    cursor: 'pointer',
                                }}
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
                <GrFormClose
                    style={{
                        cursor: 'pointer',
                        position: 'absolute',
                        right: '10px',
                    }}
                    size={24}
                    color="#303030"
                    onClick={() => setIsOpenAllHashTags(!isOpenAllHashTags)}
                />
            </HashTagContainer>
            <HashTagContainer $isHas={hashTags.length > 0}>
                <Text fontSize="12px" fontFamily="Montserrat" fontWeight={600} margin="0 5px 0 0">
                    Created hashtags:
                </Text>
                {hashTags.map((tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag key={index} closable onClose={() => handleClose(tag)}>
                            <Text
                                fontSize="12px"
                                fontFamily="Montserrat"
                                fontWeight={600}
                                margin="0"
                                style={{
                                    cursor: 'auto',
                                }}
                            >
                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
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
            </HashTagContainer>
        </BassComponent>
    );
};

export default observer(ChatHeader);

const BassComponent = styled.div`
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: auto;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(25px);
    z-index: 15;
    box-shadow:
        0px 8px 48px 0px rgba(32, 35, 39, 0.02),
        0px 4px 8px 0px rgba(32, 35, 39, 0.04),
        0px 0px 1px 0px rgba(32, 35, 39, 0.16);

    .container {
        width: 100%;
        height: 7.5vh;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 15px;

        div {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }

        span {
            display: flex;
            align-items: center;
            gap: 2px;
        }
    }

    header {
        width: 70%;
        cursor: pointer;
        height: 100%;
        display: flex;
        align-items: center;
        gap: 5px;

        div {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }

        h3 {
            width: 450px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        nav {
            position: relative;
            margin-left: 5px;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            overflow: hidden;
            img {
                position: absolute;
                width: 45px;
                height: 45px;
                object-fit: cover;
            }
        }
    }
`;

const HashTagContainer = styled.div<{ $isHas: boolean }>`
    width: 100%;
    height: auto;
    padding: 5px;
    display: ${({ $isHas }) => ($isHas ? 'flex' : 'none')};
    align-items: center;
    justify-content: flex-start;
    overflow-x: scroll;
    overflow-y: hidden;
    position: relative;

    border-top: 0.8px solid #d2d2d2;

    &::-webkit-scrollbar {
        height: 2px;
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: #d2d2d2;
    }

    .ant-tag {
        padding: 0px 7px 0px 7px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
