import { FC } from 'react';
import { Env } from '../../../env';
import { RawMessage } from '../../../types/channel';
import styles from './index.module.css';

interface Props {
    message: RawMessage;
}

const MessageVideo: FC<Props> = ({ message }) => {
    const url = message.mediaUrl;

    return (
        <video id="player" controls data-poster="/path/to/poster.jpg" className={styles.videoPlayer}>
            <source src={`${Env.AssetsUrl}/${url}`} type="video/mp4" />
            <track kind="captions" label="English captions" src="/path/to/captions.vtt" srcLang="en" default />
        </video>
    );
};

export default MessageVideo;
