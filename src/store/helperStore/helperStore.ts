import _ from 'lodash';
import { makeAutoObservable } from 'mobx';

class HelperStore {
    constructor() {
        makeAutoObservable(this);
    }

    isPlayAudio: { [key: string]: boolean } = {};

    setIsPlayAudio = (id: string, value: boolean) => {
        _.forIn(this.isPlayAudio, (value, key) => {
            this.isPlayAudio[key] = false;
        });
        this.isPlayAudio[id] = value;
    };
}

export default HelperStore;
