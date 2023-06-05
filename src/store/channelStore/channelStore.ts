import { makeAutoObservable, runInAction } from "mobx";
import { ErrorResponse, StatusEnum } from "../../types";
import { Channel } from "../../types/channel";
import { Operation } from '../../utils/Operation';

type channelStatus = StatusEnum.IDLE | StatusEnum.PENDING | StatusEnum.REJECTED | StatusEnum.RESOLVED;


export default class ChannelStore {
    constructor() {
        makeAutoObservable(this);
    }

    getChannelOperation = new Operation<Channel>(null as unknown as Channel);

    channelStatus: channelStatus = StatusEnum.IDLE;

    channelData: Channel | null = null;

    error: ErrorResponse | null = null;


    getChannel = async (hashId: string) => {
        try {
            runInAction(() => {
                this.channelStatus = StatusEnum.PENDING;
            });
            //get channel
            console.log("get channel");

            // await this.getChannelOperation.run(() => ChannelService.getChannel(hashId));
            const respons = this.getChannelOperation;
            
            if (respons.isSuccess) {
                runInAction(() => {
                    this.channelStatus = StatusEnum.RESOLVED;
                });
                this.channelData = respons.data;
            }
            
        } catch (e: any) {
            runInAction(() => {
                this.channelStatus = StatusEnum.REJECTED;
            });
            this.error = e.response.data;
        }
    };

}

