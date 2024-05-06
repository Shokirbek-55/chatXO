import { throttle } from "lodash";
import { action, makeObservable } from "mobx"
import { Channel, ChannelInitialState } from "../../types/channel";
import { User } from "../../types/user";
import APIs from "../../api/api";


class Channels {
    channelByHashId = new Map<string, Channel>();
    channelUsersByHashId = new Map<string, User[]>();
    hashIdQueue = new Set<string>();

    processQueue = throttle(async () => {
        if (!this.hashIdQueue.size) {
            return;
        }
        const hashIds = Array.from(this.hashIdQueue)

        for (const hashId of hashIds) {
            const [channelInfo, channelUsers] = await Promise.all([
                APIs.channels.getChannelByHashId(hashId),
                APIs.channels.getChannelUsers(hashId)
            ])
            this.upsert(hashId, channelInfo.data, channelUsers.data)
            this.hashIdQueue.delete(hashId)
        }

        if (this.hashIdQueue.size) {
            this.processQueue()
        }
    }, 500)

    constructor() {
        makeObservable(this, {
            upsert: action,
        })
    }

    get(channelHashId: string) {
        this.hashIdQueue.add(channelHashId)
        this.processQueue()
    }

    clear() {
        this.processQueue.cancel()
        this.channelByHashId.clear()
    }

    upsert(channelHashId: string, ChannelInfo: Channel, channelUsers: User[]) {
        let channelBox = this.channelByHashId.get(channelHashId)

        this.channelUsersByHashId.set(channelHashId, channelUsers)
        if (channelBox) {
            const channel = Object.assign(channelBox, ChannelInfo)
            this.channelByHashId.set(channelHashId, channel)
            return
        }
        this.channelByHashId.set(channelHashId, ChannelInitialState)
    }
}

export default new Channels()
