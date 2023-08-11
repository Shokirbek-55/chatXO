import { observer } from "mobx-react-lite";
import { FC, useEffect, useMemo, useRef, useState } from "react";
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
import axios from "axios";

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

const DownloadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 11.641L14.121 10.521C14.3095 10.3387 14.562 10.2377 14.8242 10.2398C15.0864 10.2419 15.3373 10.3469 15.5228 10.5322C15.7084 10.7175 15.8137 10.9682 15.8162 11.2304C15.8186 11.4926 15.718 11.7453 15.536 11.934L12.707 14.763C12.6143 14.8562 12.5042 14.9301 12.3829 14.9806C12.2615 15.0311 12.1314 15.057 12 15.057C11.8686 15.057 11.7385 15.0311 11.6171 14.9806C11.4958 14.9301 11.3857 14.8562 11.293 14.763L8.464 11.934C8.37116 11.841 8.29753 11.7307 8.24734 11.6092C8.19714 11.4878 8.17135 11.3577 8.17144 11.2263C8.17154 11.0949 8.19751 10.9648 8.24788 10.8435C8.29825 10.7221 8.37202 10.6118 8.465 10.519C8.55798 10.4262 8.66833 10.3525 8.78976 10.3023C8.91119 10.2521 9.04131 10.2264 9.17271 10.2264C9.3041 10.2265 9.43419 10.2525 9.55555 10.3029C9.67691 10.3532 9.78716 10.427 9.88 10.52L11 11.641V6C11 5.73478 11.1054 5.48043 11.2929 5.29289C11.4804 5.10536 11.7348 5 12 5C12.2652 5 12.5196 5.10536 12.7071 5.29289C12.8946 5.48043 13 5.73478 13 6V11.641ZM6 17H18C18.2652 17 18.5196 17.1054 18.7071 17.2929C18.8946 17.4804 19 17.7348 19 18C19 18.2652 18.8946 18.5196 18.7071 18.7071C18.5196 18.8946 18.2652 19 18 19H6C5.73478 19 5.48043 18.8946 5.29289 18.7071C5.10536 18.5196 5 18.2652 5 18C5 17.7348 5.10536 17.4804 5.29289 17.2929C5.48043 17.1054 5.73478 17 6 17Z" fill="black" />
  </svg>
)

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6L18 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
)

const MessageAudio: FC<Props> = ({ message, users, position }) => {

  const [duration, setDuration] = useState(0)
  const [audioBlob, setAudioBlob] = useState<Blob>(new Blob())
  const [isDownloaded, setIsDownloaded] = useState(false)
  const [inputLeftComponent, setInputLeftComponent] = useState<JSX.Element>(<DownloadIcon />)

  const url = message.mediaUrl;

  const { isPlayAudio, setIsPlayAudio } = useRootStore().helperStore

  const [value, setValue] = useState(0)
  const [dragging, setDragging] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current){
      audioRef.current.addEventListener("timeupdate", () => {
        if (audioRef.current) {
          console.log('ishlayapti', audioRef.current.duration);
          setValue(audioRef.current.currentTime / audioRef.current.duration * 100)
        }
      });
    }
  }, [audioRef]);

  // function useObjectUrl(blob: Blob) {
  //   const url = useMemo(() => URL.createObjectURL(blob), [blob]);
  //   return url;
  // }

  // // Use the hook and render the audio element
  // function AudioPlayer({ blob }) {
  //   const src = useObjectUrl(blob);
  //   return <audio ref={audioRef} id="noteVoicePlay" {...{ src }} />;
  // }

  // const downloadAudio = async () => {
  //   fetch(`${Env.AssetsUrl}/${url}`)
  //     .then((response) => response.blob())
  //     .then((audioBlob) => {
  //       console.log('Success fetching audio:', audioBlob);
  //       setAudioBlob(audioBlob)
  //       setIsDownloaded(true)
  //       setInputLeftComponent(<PlayIcon />)
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching audio:', error);
  //     });
  // }

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
                    currentUser?.avatar
                      ? `${Env.AssetsUrl}/${currentUser?.avatar}`
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
                  )
                }</button>
              <div className="wavefromBox">
                <Waveform
                  // data={url.startsWith("blob") ? `${url}` : `${Env.AssetsUrl}/${url}`}
                  dragging={dragging}
                  value={value} />
                <input className="audio-slider" type="range" />
              </div>
                <audio src={url.startsWith("blob") ? `${url}` : `${Env.AssetsUrl}/${url}`} id="noteVoicePlay" />
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