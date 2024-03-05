import { observer } from "mobx-react-lite";
import { FC, useRef, useState } from "react";
import { styled } from "styled-components";
import { Env } from "../../../env";
import useRootStore from "../../../hooks/useRootStore";
import { RawMessage } from "../../../types/channel";
import Waveform from "../../Waveform/Waveform";
import getBlobDuration from "../../../helper/getBlobDuration";

interface Props {
  message: RawMessage;
  users: any;
  position: any;
}

const PlayIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.409 9.35294C21.8893 9.60835 22.291 9.98963 22.5712 10.4559C22.8514 10.9222 22.9994 11.456 22.9994 11.9999C22.9994 12.5439 22.8514 13.0777 22.5712 13.544C22.291 14.0102 21.8893 14.3915 21.409 14.6469L8.597 21.6139C6.534 22.7359 4 21.2759 4 18.9679V5.03294C4 2.72294 6.534 1.26394 8.597 2.38494L21.409 9.35294Z"
      fill="#303030"
    />
  </svg>
);

const PauseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 19C9.1 19 10 18.1 10 17V7C10 5.9 9.1 5 8 5C6.9 5 6 5.9 6 7V17C6 18.1 6.9 19 8 19ZM14 7V17C14 18.1 14.9 19 16 19C17.1 19 18 18.1 18 17V7C18 5.9 17.1 5 16 5C14.9 5 14 5.9 14 7Z"
      fill="#303030"
    />
  </svg>
);

const MessageAudio: FC<Props> = ({ message, users, position }) => {
  const url = message.mediaUrl;

  const { isPlayAudio, setIsPlayAudio } = useRootStore().audioStore;

  const [value, setValue] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [timeUpdate, setTimeUpdate] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const messageId = message?.id;

  const playAudio = async (audio: string) => {
    setDragging(false);
    if (audioRef.current && timeUpdate === 0) {
      const duration = await getBlobDuration(audio);
      setDuration(duration);
      audioRef.current.src = audio;
      audioRef.current.load();
      audioRef.current.play();
      audioRef.current.addEventListener("timeupdate", () => {
        if (audioRef.current) {
          setTimeUpdate(
            Math.floor((audioRef.current.currentTime / duration) * 100)
          );
          setValue(Math.floor((audioRef.current.currentTime / duration) * 100));
          if (audioRef.current.currentTime === duration) {
            setIsPlayAudio(messageId, false, allAudioPause);
            const fineshed = setTimeout(() => {
              setDragging(true);
              setTimeUpdate(0);
              setValue(0);
            }, 500);
            return () => clearTimeout(fineshed);
          }
        }
      });
    } else {
      audioRef.current?.play();
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const allAudioPause = () => {
    const audio = document.querySelectorAll("#noteAudioPlayer");
    audio.forEach((item: any) => {
      item.pause();
      item.currentTime = 0;
    });
  };

  const handlePlayPause = () => {
    setIsPlayAudio(messageId, !isPlayAudio[messageId], allAudioPause);
    if (!isPlayAudio[messageId]) {
      pauseAudio();
    } else {
      playAudio(`${Env.AssetsUrl}/${url}`);
    }
  };

  const handleRangeChange = (e: any) => {
    setDragging(true);
    setValue(Number(e.target.value));
    if (audioRef.current) {
      audioRef.current.currentTime = (Number(e.target.value) / 100) * duration;
      audioRef.current.play();
      setIsPlayAudio(messageId, true, allAudioPause);
    }
  };

  return (
    <AudioPlayContainer>
      <button className="playBtn" onClick={handlePlayPause}>
        {!!isPlayAudio[messageId] ? <PauseIcon /> : <PlayIcon />}
      </button>
      <div className="wavefromBox">
        <Waveform dragging={dragging} value={dragging ? value : timeUpdate} />
        <input
          disabled={!timeUpdate}
          className="audio-slider"
          type="range"
          onChange={(e) => handleRangeChange(e)}
          onDragLeave={() => setDragging(false)}
          value={value}
          min={0}
          max={100}
        />
      </div>
      <audio ref={audioRef} id="noteAudioPlayer" />
    </AudioPlayContainer>
  );
};

export default observer(MessageAudio);

const AudioPlayContainer = styled.div`
  position: relative;
  display: flex;
  gap: 10px;
  width: 100%;
  min-width: 300px;
  height: 100%;
  padding: 15px;
  padding-bottom: 5px;

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
  .wavefromBox {
    position: relative;
    flex: 1;
  }

  .audio-slider {
    width: 100%;
    opacity: 1;
    position: absolute;
    outline: none;
    touch-action: none;
    opacity: 0;
  }

  .audio-slider::-webkit-slider-runnable-track {
    width: 100%; /* Trackni to'liq qoplang */
    height: 40px;
    border-radius: 5px;
  }
`;
