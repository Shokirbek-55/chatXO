import { makeAutoObservable, runInAction } from "mobx";
import { ErrorResponse, StatusEnum } from "../../types";
import { Channel } from "../../types/channel";
import { Operation } from '../../utils/Operation';
import APIs from "../../api/api";


export default class ChannelStore {
    constructor() {
        makeAutoObservable(this);
    }

    getChannelOperation = new Operation<Channel[]>([] as Channel[]);

    channelsData: Channel[] = []

    channelsLoading: boolean = false

    getMyChannels = async () => {
        runInAction(() => {
            this.channelsLoading = true
        })
        await this.getChannelOperation.run(() => APIs.channels.getMyChannels());
        
        if (this.getChannelOperation.isSuccess) {
                console.log('my channels', this.getChannelOperation.data);
                runInAction(() => {
                    this.channelsData = this.getChannelOperation.data;
                    this.channelsLoading = false
                });
            }
    };

    setSearchChannels = (text:string) => {
        runInAction(() => {
            this.channelsData = this.getChannelOperation.data.filter(channel => channel.name.toLowerCase().includes(text.toLowerCase()));
        })
    }
}

