import { useEffect, useState } from "react";

import styles from "./index.module.css";
import { SendMessage } from "../../../../../types/channel";
import { ArrowDowunIcon, ArrowUpIcon, DeleteIcon, FillterIcon, MicrophoneIcon, SendIcon } from "../../../../../utils/icons";
import AddHashtags from "../../../../../components/AddHashtags/addhashtags";
import FilterToolbar from "../filterToolbar/FilterToolBar";
import FooterToolbarView from "../footerToolbar/FooterToolBar";
import ReplyMessage from "../replyMessage/replyMessageComponent";
import { styled } from "styled-components";
import useRootStore from "../../../../../hooks/useRootStore";
import { observer } from "mobx-react-lite";
import useRecorder from "../../../../../components/VoiceRecorder/useRecorder";
import { formatMinutes, formatSeconds } from "../../../../../components/VoiceRecorder/format-time";

function MessageInput({ sendCurrentCurrentMessageOnScroll }: any) {
  const { recorderState, ...handlers } = useRecorder();
  const [open, setOpen] = useState<boolean>(false);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [openhastag, setOpenhastag] = useState<boolean>(false);
  const [isOPen, setIsOpen] = useState(true);

  const { setMessageText, messageTextState, onSendMessage } = useRootStore().messageStore

  const handleonSendMessage = () => {
    onSendMessage('text')
    setMessageText("")
  };

  useEffect(() => {

    var textarea: any = document.getElementById("textarea");

    textarea.oninput = function () {
      textarea.style.height = "";
      textarea.style.height = textarea.scrollHeight + "px"
    };

  }, []);

  const onSendEnter = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      onSendMessage('text');
      e.preventDefault();
      setMessageText("");
    }
  };

  return (
    <MessageInputContainer>
      <FilterToolbar isOpen={openFilter} />
      <FooterToolbarView
        props={open}
        openHashTags={open}
        setOpenHashtags={setOpenhastag}
      />
      {/* <AddHashtags
        isOpen={true}
        otherCard={true}
        setopenhashtags={setOpenhastag}
      /> */}
      {/* <ReplyMessage
        isReply={false}
        other={false}
        replyMessages={undefined}
      /> */}
      <div className={styles.inputmessage}>
        <div className="icon" onClick={() => setOpenFilter(!openFilter)}>
          <FillterIcon size={17} color="#303030" />
        </div>
        {!open ? (
          <div className="icon" onClick={() => setOpen(!open)}>
            <ArrowUpIcon color="#303030" />
          </div>
        ) : (
          <div className="icon" onClick={() => setOpen(!open)}>
            <ArrowDowunIcon color="#303030" />
          </div>
        )}
        <div className="inputContainer">
          <textarea
            id="textarea"
            placeholder={
              recorderState.initRecording
                ? `${formatMinutes(
                  recorderState.recordingMinutes
                )} : ${formatSeconds(recorderState.recordingSeconds)}`
                : "Write a message..."
            }
            value={messageTextState}
            onKeyDown={(e) => onSendEnter(e)}
            autoFocus
            disabled={recorderState.initRecording}
            onChange={(e) => setMessageText(e.target.value)}
            className="textAreaInput"
          />
        </div>
        {messageTextState ? (
          <div className="icon" onClick={handleonSendMessage}>
              <SendIcon color="#303030" />
            </div>
        ) : recorderState.initRecording ? (
          <div className="iconBox">
            <div className={`icon ${!isOPen && 'iconDelete'}`}
                onClick={handlers.cancelRecording}
            >
              <DeleteIcon color="#e74c3c" />
            </div>
              <div className="icon" onClick={handlers.saveRecording}>
              <SendIcon color="#303030" />
            </div>
          </div>
        ) : (
          <div className="icon" onClick={handlers.startRecording}>
            <MicrophoneIcon color="#303030" />
          </div>
        )}
      </div>
    </MessageInputContainer>
  );
}
export default observer(MessageInput)


const MessageInputContainer = styled.div`
    width: 100%;
    height: auto;
    padding: 7px 5px 7px 5px;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(25px);
    display: flex;
    box-shadow: 0px -8px 48px 0px rgba(32, 35, 39, 0.02), 0px -4px 8px 0px rgba(32, 35, 39, 0.04), 0px 0px 1px 0px rgba(32, 35, 39, 0.16);
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: height height .15s ease-out,opacity .15s ease-out;
    
    .inputContainer{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        border-radius: 25px;
        margin: 0 5px 0 5px;

      .textAreaInput {
            font-family: Montserrat6;
            width: 100%;
            height: 45px;
            padding: 12.5px 15px;
            font-size: 15px;
            line-height: 20px;
            color: #333;
            outline: none;
            border: none;
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
`