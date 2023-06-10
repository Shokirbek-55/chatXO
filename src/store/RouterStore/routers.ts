import ChannelsScreen from "../../screens/home/channels/ChannelsScreen";
import ConnectWithChannel from "../../screens/home/connectWithChannel/ConnectWithChannel";
import FriendsScreen from "../../screens/home/friendsScreen/FriendsScreen";


export const MainRoutes = {
    channels: 'channels',
    friends: 'friends',
    connectChannel: 'connectChannel',
}

export type MainRoutesType = {
    id: number;
    key: string
    components: React.FC;
}

export const mainRoutes: MainRoutesType[] = [
    {
        id: 1,
        key: MainRoutes.channels,
        components: ChannelsScreen,
    },
    {
        id: 2,
        key: MainRoutes.friends,
        components: FriendsScreen,
    },
    {
        id: 3,
        key: MainRoutes.connectChannel,
        components: ConnectWithChannel,
    }
]