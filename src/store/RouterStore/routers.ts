import ChannelsScreen from "../../screens/home/channels/ChannelsScreen";
import ConnectWithChannel from "../../screens/home/connectWithChannel/ConnectWithChannel";
import FriendsScreen from "../../screens/home/friendsScreen/FriendsScreen";
import AddFriend from '../../screens/home/addFriend/AddFriend';
import Account from '../../screens/home/account/Account';
import AccountSetting from '../../screens/home/accountSetting/AccountSetting';


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

export type SideBarHelperRoutesType = {
    id: number;
    key: string
    components: React.FC;
    isOpen: boolean;
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


export const SideBarHelperRoutes = {
    addFriends: {
        id: 1,
        key: 'addFriends',
        components: AddFriend,
        isOpen: false,
    },
    account: {
        id: 2,
        key: 'account',
        components: Account,
        isOpen: false,
    },
    settings: {
        id: 3,
        key: 'settings',
        components: AccountSetting,
        isOpen: false,
    },
    friendDetails: {
        id: 4,
        key: 'friendDetails',
        components: AddFriend,
        isOpen: false,
    },
    language: {
        id: 5,
        key: 'language',
        components: AddFriend,
        isOpen: false,
    }
}