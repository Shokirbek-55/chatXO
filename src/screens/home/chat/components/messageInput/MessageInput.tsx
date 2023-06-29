import { useEffect, useState } from "react";

import styles from "./index.module.css";
import { SendMessage } from "../../../../../types/channel";
import { ArrowDowunIcon, ArrowUpIcon, DeleteIcon, FillterIcon, MicrophoneIcon, SendIcon } from "../../../../../utils/icons";
import AddHashtags from "../../../../../components/AddHashtags/addhashtags";
import FilterToolbar from "../filterToolbar/FilterToolBar";
import FooterToolbarView from "../footerToolbar/FooterToolBar";
import ReplyMessage from "../replyMessage/replyMessageComponent";
import { styled } from "styled-components";

function MessageInput({ sendCurrentCurrentMessageOnScroll }: any) {
  const [open, setOpen] = useState<boolean>(false);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [openhastag, setOpenhastag] = useState<boolean>(false);
  const [isOPen, setIsOpen] = useState(true);
  const [messageText, setMessageText] = useState<string>("");

  const onSendMessage = () => {

  };

  useEffect(() => {

    var textarea: any = document.getElementById("textarea");

    textarea.oninput = function () {
      textarea.style.height = "";
      /* textarea.style.height = Math.min(textarea.scrollHeight, 300) + "px"; */
      textarea.style.height = textarea.scrollHeight + "px"
    };

  }, []);

  return (
    <MessageInputContainer>
      {/* <FooterToolbarView
        props={false}
        openHashTags={false}
        setOpenHashtags={setOpenhastag}
      /> */}
      {/* <FilterToolbar isOpen={true} otherCard={false} />
      <AddHashtags
        isOpen={false}
        otherCard={open}
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
              open ? "Write a message..." : "Write a message..."
            }
            value={messageText}
            onKeyDown={(e) => { }}
            autoFocus
            disabled={false}
            onChange={(e) => setMessageText(e.target.value)}
            className="textAreaInput"
          />
        </div>
        {!false ? (
          <div className="icon" onClick={onSendMessage}>
            <SendIcon color="#303030" />
          </div>
        ) : false ? (
          <div className={styles.voiceIcon}>
            <div
              style={{ position: "absolute", right: "80px" }}
              onClick={() => setIsOpen(!isOPen)}
            >
              <DeleteIcon color="#e74c3c" />
            </div>
            <div onClick={() => setIsOpen(!isOPen)}>
              <SendIcon color="#303030" />
            </div>
          </div>
        ) : (
          <div onClick={() => setIsOpen(!isOPen)}>
            <MicrophoneIcon color="#303030" />
          </div>
        )}
      </div>
    </MessageInputContainer>
  );
}
export default MessageInput;


const MessageInputContainer = styled.div`
    width: 100%;
    height: auto;
    padding: 7px 5px 7px 5px;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(25px);
    display: flex;
    box-shadow: 0px -8px 48px 0px rgba(32, 35, 39, 0.02), 0px -4px 8px 0px rgba(32, 35, 39, 0.04), 0px 0px 1px 0px rgba(32, 35, 39, 0.16);

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
`