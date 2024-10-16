import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { styled } from 'styled-components';
import { formatMinutes, formatSeconds } from '../../../../../components/VoiceRecorder/format-time';
import useRecorder from '../../../../../components/VoiceRecorder/useRecorder';
import useRootStore from '../../../../../hooks/useRootStore';
import {
    ArrowDowunIcon,
    ArrowUpIcon,
    DeleteIcon,
    FillterIcon,
    MicrophoneIcon,
    SendIcon,
} from '../../../../../utils/icons';
import FilterToolbar from '../filterToolbar/FilterToolBar';
import FooterToolbarView from '../footerToolbar/FooterToolBar';
import styles from './index.module.css';
import ReplyMessage from '../replyMessage/replyMessageComponent';
import AddHashtags from '../../../../../components/AddHashtags/addhashtags';
import { toJS } from 'mobx';

interface User {
    id: string;
    username: string;
}

function MessageInput() {
    const { recorderState, ...handlers } = useRecorder();
    const { visible, toglevisible } = useRootStore().visibleStore;
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [openHashtag, setOpenHashtag] = useState<boolean>(false);
    const [showUserList, setShowUserList] = useState<boolean>(false);
    const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
    const [cursorPosition, setCursorPosition] = useState<number>(0);

    const { setMessageText, messageTextState, onSendMessage } = useRootStore().messageStore;
    const { getSlectedChannelUsers } = useRootStore().channelStore;

    const handleOnSendMessage = () => {
        if (messageTextState) {
            onSendMessage('text');
            setMessageText('');
            setShowUserList(false);
        }
    };

    useEffect(() => {
        var textarea: any = document.getElementById('textarea');
        textarea.oninput = function () {
            textarea.style.height = '';
            textarea.style.height = textarea.scrollHeight + 'px';
        };
    }, []);

    const onSendEnter = (e: any) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleOnSendMessage();
            e.preventDefault();
        }
    };

    const markSelectedChannelUsers = () => {
        const selectedUsers = toJS(getSlectedChannelUsers);
        const usersArray = Object.values(selectedUsers).map(user => ({
            id: user.id.toString(),
            username: user.username,
        })) as User[];

        const usernames = usersArray.map(user => user.username);
        const markedUsernames = usernames.map(username => `${username}`);
        return markedUsernames;
    };

    const handleTextareaChange = (e: any) => {
        const { value, selectionStart } = e.target;
        setMessageText(value);
        setCursorPosition(selectionStart);

        const lastWord = value.substring(0, selectionStart).split(' ').pop();
        if (lastWord.startsWith('@')) {
            const query = lastWord.substring(1).toLowerCase();
            const filtered = markSelectedChannelUsers().filter(username => username.toLowerCase().startsWith(query));
            setFilteredUsers(filtered.map(username => ({ username })));
            setShowUserList(true);
        } else {
            setShowUserList(false);
        }
    };

    const handleUserClick = (user: User) => {
        const value = messageTextState;
        const start = value.substring(0, cursorPosition).lastIndexOf('@');
        const newText = value.substring(0, start + 1) + user.username + ' ' + value.substring(cursorPosition);
        setMessageText(newText);
        setShowUserList(false);
    };

    return (
        <MessageInputContainer>
            <div className="container">
                <ReplyMessage />
                <FilterToolbar isOpen={openFilter} />
                <AddHashtags isOpen={openHashtag} setopenhashtags={setOpenHashtag} />
                <FooterToolbarView
                    props={visible.openFooterMediaBar}
                    openHashTags={openHashtag}
                    setOpenHashtags={setOpenHashtag}
                />
                <div className={styles.inputmessage}>
                    {!visible.openFooterMediaBar ? (
                        <button className="icon" onClick={() => toglevisible('openFooterMediaBar')}>
                            <ArrowUpIcon color="#303030" />
                        </button>
                    ) : (
                        <button className="icon" onClick={() => toglevisible('openFooterMediaBar')}>
                            <ArrowDowunIcon color="#303030" />
                        </button>
                    )}
                    <button className="icon" onClick={() => setOpenFilter(!openFilter)}>
                        <FillterIcon size={17} color="#303030" />
                    </button>
                    <div className="inputContainer">
                        <textarea
                            id="textarea"
                            placeholder={
                                recorderState.initRecording
                                    ? `${formatMinutes(recorderState.recordingMinutes)} : ${formatSeconds(recorderState.recordingSeconds)}`
                                    : 'Write a message...'
                            }
                            value={messageTextState}
                            onKeyDown={e => onSendEnter(e)}
                            autoFocus
                            disabled={recorderState.initRecording}
                            onChange={handleTextareaChange}
                            className="textAreaInput"
                        />
                        {showUserList && (
                            <UserList>
                                {filteredUsers.map(user => (
                                    <UserListItem key={user.id} onClick={() => handleUserClick(user)}>
                                        {user.username}
                                    </UserListItem>
                                ))}
                            </UserList>
                        )}
                    </div>
                    {messageTextState ? (
                        <button className="icon" onClick={handleOnSendMessage}>
                            <SendIcon color="#303030" />
                        </button>
                    ) : recorderState.initRecording ? (
                        <div className="iconBox">
                            <button className={`icon`} onClick={handlers.cancelRecording}>
                                <DeleteIcon color="#e74c3c" />
                            </button>
                            <button className="icon" onClick={handlers.saveRecording}>
                                <SendIcon color="#303030" />
                            </button>
                        </div>
                    ) : (
                        <button className="icon" onClick={handlers.startRecording}>
                            <MicrophoneIcon color="#303030" />
                        </button>
                    )}
                </div>
            </div>
        </MessageInputContainer>
    );
}

export default observer(MessageInput);

const MessageInputContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(25px);
    box-shadow:
        0px -8px 48px 0px rgba(32, 35, 39, 0.02),
        0px -4px 8px 0px rgba(32, 35, 39, 0.04),
        0px 0px 1px 0px rgba(32, 35, 39, 0.16);
    z-index: 15;

    .container {
        position: relative;
        width: 100%;
        height: auto;
        padding: 6px 5px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        transition:
            height 0.15s ease-out,
            opacity 0.15s ease-out;
    }

    .inputContainer {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        margin: 0 5px 0 5px;
        border: 0.5px solid #a3aea6;
        border-radius: 8px;

        .textAreaInput {
            font-family: Montserrat;
            font-weight: 600;
            font-size: 15px;
            width: 100%;
            height: 35px;
            padding: 7.5px 15px;
            line-height: 20px;
            border: none;
            color: #a3aea6;
            outline: none;
            resize: none;
            opacity: initial;
            overflow: hidden;
            background-color: transparent;
        }
    }

    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 45px;
        height: 45px;
        outline: none;
        border: none;
        background-color: transparent;
    }

    .iconBox {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 6px;
    }
`;

const UserList = styled.ul`
    position: absolute;
    bottom: 40px;
    width: 100%;
    background: white;
    box-shadow:
        0px 8px 48px 0px rgba(32, 35, 39, 0.1),
        0px 4px 8px 0px rgba(32, 35, 39, 0.1),
        0px 0px 1px 0px rgba(32, 35, 39, 0.16);
    border-radius: 8px;
    list-style: none;
    margin: 0;
    padding: 0;
    z-index: 10;
`;

const UserListItem = styled.li`
    padding: 8px 16px;
    cursor: pointer;

    &:hover {
        background-color: #f5f5f5;
    }
`;
