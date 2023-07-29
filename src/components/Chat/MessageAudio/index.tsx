import { observer } from "mobx-react-lite";
import { FC, useRef, useState } from "react";
import { styled } from "styled-components";
import { Env } from "../../../env";
import useRootStore from "../../../hooks/useRootStore";
import { ChannelsUsersType, RawMessage } from "../../../types/channel";
import { relevanceFuniction } from "../../../utils/boxShadov";
import SmallAvatar from "../../SmallAvatar/smallAvatar";
import Waveform from "../../Waveform/Waveform";
import DropDownMenu from "../DropDownMenu/dropdownmenu";
import MessageHeader from "../MessageHeader";
import styles from "./index.module.css";
import { toJS } from "mobx";

interface Props {
  message: RawMessage;
  position: boolean;
  users?: {
    [key: string]: ChannelsUsersType;
  };
}

const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.409 9.35294C21.8893 9.60835 22.291 9.98963 22.5712 10.4559C22.8514 10.9222 22.9994 11.456 22.9994 11.9999C22.9994 12.5439 22.8514 13.0777 22.5712 13.544C22.291 14.0102 21.8893 14.3915 21.409 14.6469L8.597 21.6139C6.534 22.7359 4 21.2759 4 18.9679V5.03294C4 2.72294 6.534 1.26394 8.597 2.38494L21.409 9.35294Z" fill="#303030" />
  </svg>
)

const PauseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 19C9.1 19 10 18.1 10 17V7C10 5.9 9.1 5 8 5C6.9 5 6 5.9 6 7V17C6 18.1 6.9 19 8 19ZM14 7V17C14 18.1 14.9 19 16 19C17.1 19 18 18.1 18 17V7C18 5.9 17.1 5 16 5C14.9 5 14 5.9 14 7Z" fill="#303030" />
  </svg>
)

const MessageAudio: FC<Props> = ({ message, users, position }) => {
  const url = message.mediaUrl;  

  const { isPlayAudio, setIsPlayAudio } = useRootStore().helperStore

  const [value, setValue] = useState(0)
  const [dragging, setDragging] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null);

  const handleOnChange = (e: number) => {
    setDragging(true)
    setValue(e)
  }

  const POSITION_MESSAGE = position
    ? { justifyContent: "flex-start" }
    : { justifyContent: "flex-end" };

  const currentUser: ChannelsUsersType | undefined =
    users?.[message.userId];

  const MESSAGE_STYLE = relevanceFuniction(message);
  const boxShadov = MESSAGE_STYLE?.boxShadow;

  const messageUSerId = message.userId
  const messageId = message.id
  const handleRelevenceModal = () => {
  }

  const handlePlayPause = () => {
    setIsPlayAudio(messageId, !isPlayAudio[messageId])
    const audios = document.querySelectorAll("audio");
    audios.forEach((audio, index) => {
      audio.pause();
    });

    if (!audioRef.current) return;

    if (!isPlayAudio[messageId]) {
      audioRef.current.pause();
    } else {
      setIsPlayAudio(messageId, true)
      audioRef.current.play();
    }
  };



  return (
    <div className={styles.parentContainer} style={POSITION_MESSAGE}>
      <div className={styles.childContainer}>
        {position && (
          <span onClick={() => handleRelevenceModal()}>
            <MessageHeader
              name={message.username}
              relevance={message?.relevance}
              color={currentUser?.color}
            />
          </span>
        )}
        <div className={styles.messageCard}>
          {position && (
            <div className={styles.avatarCard}>
              {currentUser && (
                <SmallAvatar
                  color={currentUser?.color}
                  imageUrl={
                    currentUser.avatar
                      ? `${Env.AssetsUrl}/${currentUser.avatar}`
                      : ""
                  }
                />
              )}
            </div>
          )}
          <DropDownMenu massage={message}>
            <BoxShadow $boxShodow={boxShadov}>
            <AudioPlayContainer>
              <button className="playBtn" onClick={handlePlayPause}>{
                !!isPlayAudio[messageId] ? (
                  <PauseIcon />
                ) : (
                  <PlayIcon />
                )}</button>
              <div className="wavefromBox">
                <Waveform
                  // data={url.startsWith("blob") ? `${url}` : `${Env.AssetsUrl}/${url}`}
                  dragging={dragging}
                  value={value} />
                <input className="audio-slider" type="range" />
              </div>
              <audio id="noteVoicePlay" ref={audioRef} src={
                url.startsWith("blob") ? `${url}` : `${Env.AssetsUrl}/${url}`
              } />
              </AudioPlayContainer>
            </BoxShadow>
          </DropDownMenu>
        </div>
      </div>
    </div>
  );
};

export default observer(MessageAudio);

const AudioPlayContainer = styled.div`
  position: relative;
  display: flex;
  gap: 10px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 15px;
  border-radius: 30px;
  background-color: rgb(242, 242, 240);
  z-index: 1;

  .playBtn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: #fff;
    &:hover {
      background-color: #f2f2f0;
    }
  }
    .wavefromBox{
      position: relative;
      flex: 1;
    }

    .audio-slider{
      width: 100%;
      opacity: 1;
      position: absolute;
      bottom: 0;
    }
`

const BoxShadow = styled.div<{ $boxShodow?: string; }>`
  position: relative;
  width: 300px;
  min-height: 50px;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: ${({ $boxShodow }) => $boxShodow || "none"};
  z-index: auto;
`