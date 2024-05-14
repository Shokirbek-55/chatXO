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

function MessageInput() {
    const { recorderState, ...handlers } = useRecorder();
    const { visible, toglevisible } = useRootStore().visibleStore;
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [openhastag, setOpenhastag] = useState<boolean>(false);

    const { setMessageText, messageTextState, onSendMessage } = useRootStore().messageStore;

    const handleonSendMessage = () => {
        if (messageTextState) {
            onSendMessage('text');
            setMessageText('');
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
            handleonSendMessage();
            e.preventDefault();
        }
    };

    return (
        <MessageInputContainer>
            <div className="container">
                <ReplyMessage />
                <FilterToolbar isOpen={openFilter} />
                <AddHashtags isOpen={openhastag} setopenhashtags={setOpenhastag} />
                <FooterToolbarView
                    props={visible.openFooterMediaBar}
                    openHashTags={openhastag}
                    setOpenHashtags={setOpenhastag}
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
                                    ? `${formatMinutes(
                                          recorderState.recordingMinutes,
                                      )} : ${formatSeconds(recorderState.recordingSeconds)}`
                                    : 'Write a message...'
                            }
                            value={messageTextState}
                            onKeyDown={e => onSendEnter(e)}
                            autoFocus
                            disabled={recorderState.initRecording}
                            onChange={e => setMessageText(e.target.value)}
                            className="textAreaInput"
                        />
                    </div>
                    {messageTextState ? (
                        <button className="icon" onClick={handleonSendMessage}>
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
        height: 45px;
    }

    .iconDelete {
        display: none;
    }
`;
