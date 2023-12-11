import ChannelsScreen from "../../screens/home/channels/ChannelsScreen";
import ConnectWithChannel from "../../screens/home/connectWithChannel/ConnectWithChannel";
import FriendsScreen from "../../screens/home/friendsScreen/FriendsScreen";
import AddFriend from "../../screens/home/addFriend/AddFriend";
import Account from "../../screens/home/account/Account";
import AccountSetting from "../../screens/home/accountSetting/AccountSetting";
import FriendDetail from "../../screens/home/friendDetail/FriendDetail";
import CreateChannel from "../../screens/home/createChannel/CreateChannel";
import Language from "../../screens/home/language/Language";
import EditChannel from "../../screens/home/editChannel/EditChannel";
import AddUserToChannel from "../../screens/home/addUserToChannel/AddUserToChannel";
import ManagaChannel from "../../screens/home/manageChannel/ManagaChannel";
import NewAdmin from "../../screens/home/newAdmin/NewAdmin";
import ChannelSetting from "../../screens/home/channelSetting/ChannelSetting";
import BlockUser from "../../screens/home/blockUser/BlockUser";
import ChannelInUser from "../../screens/home/channelInUser/ChannelInUser";

export const MainRoutes = {
    channels: "channels",
    friends: "friends",
    connectChannel: "connectChannel",
};

export type MainRoutesType = {
    id: number;
    key: string;
    components: React.FC;
};

export type SideBarHelperRoutesType = {
    id: number;
    key: string;
    components: React.FC;
    isOpen: boolean;
};

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
    },
];

export const SideBarHelperRoutes = {
    addFriends: {
        id: 1,
        key: "addFriends",
        components: AddFriend,
        isOpen: false,
    },
    account: {
        id: 2,
        key: "account",
        components: Account,
        isOpen: false,
    },
    settings: {
        id: 3,
        key: "settings",
        components: AccountSetting,
        isOpen: false,
    },
    friendDetails: {
        id: 4,
        key: "friendDetails",
        components: FriendDetail,
        isOpen: false,
    },
    language: {
        id: 5,
        key: "language",
        components: Language,
        isOpen: false,
    },
    createChannel: {
        id: 6,
        key: "createChannel",
        components: CreateChannel,
        isOpen: false,
    },
    channels: {
        id: 7,
        key: "channels",
        components: ChannelsScreen,
        isOpen: false,
    },
    editChannel: {
        id: 8,
        key: "editChannel",
        components: EditChannel,
        isOpen: false,
    },
    manageChannel: {
        id: 9,
        key: "manageChannel",
        components: ManagaChannel,
        isOpen: false,
    },
    addUserToChannel: {
        id: 10,
        key: "addUserToChannel",
        components: AddUserToChannel,
        isOpen: false,
    },
    newAdmin: {
        id: 11,
        key: "newAdmin",
        components: NewAdmin,
        isOpen: false,
    },
    channelSetting: {
        id: 12,
        key: "channelSetting",
        components: ChannelSetting,
        isOpen: false,
    },
    blockUser: {
        id: 13,
        key: "blockUser",
        components: BlockUser,
        isOpen: false,
    },
    friends: {
        id: 13,
        key: "friends",
        components: FriendsScreen,
        isOpen: false,
    },
};

export const ManageHelperRoutes = {
    addFriends: {
        id: 1,
        key: "addFriendsM",
        components: AddFriend,
        isOpen: false,
    },
    language: {
        id: 2,
        key: "languageM",
        components: Language,
        isOpen: false,
    },
    editChannel: {
        id: 3,
        key: "editChannelM",
        components: EditChannel,
        isOpen: false,
    },
    manageChannel: {
        id: 4,
        key: "manageChannelM",
        components: ManagaChannel,
        isOpen: true,
    },
    addUserToChannel: {
        id: 5,
        key: "addUserToChannelM",
        components: AddUserToChannel,
        isOpen: false,
    },
    newAdmin: {
        id: 6,
        key: "newAdminM",
        components: NewAdmin,
        isOpen: false,
    },
    channelSetting: {
        id: 7,
        key: "channelSettingM",
        components: ChannelSetting,
        isOpen: false,
    },
    blockUser: {
        id: 8,
        key: "blockUserM",
        components: BlockUser,
        isOpen: false,
    },
    channelInUser: {
        id: 9,
        key: "channelInUserM",
        components: ChannelInUser,
        isOpen: false,
    },
};
