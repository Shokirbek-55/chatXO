import _ from 'lodash';
import { makeAutoObservable } from 'mobx';
import { AppRootStore } from '../store';

class AudioStore {
    root: AppRootStore;
    constructor(root: AppRootStore) {
        makeAutoObservable(this);
        this.root = root;
    }

    isPlayAudio: {
        [key: string]: boolean;
    } = {};
    messageId: string = '';

    setIsPlayAudio = (id: string, value: boolean, allAudioPause: () => void) => {
        if (this.messageId !== id) {
            _.forIn(this.isPlayAudio, (value, key) => {
                this.isPlayAudio[key] = false;
            });
            this.isPlayAudio[id] = value;
            allAudioPause();
            this.messageId = id;
        } else {
            this.isPlayAudio[id] = value;
        }
    };
}

export default AudioStore;
