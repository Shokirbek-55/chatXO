import { motion } from "framer-motion";
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import { styled } from 'styled-components';
import useRootStore from '../hooks/useRootStore';
import Account from "./home/account/Account";
import AccountSetting from "./home/accountSetting/AccountSetting";
import AddFriend from "./home/addFriend/AddFriend";
import AddUserToChannel from "./home/addUserToChannel/AddUserToChannel";
import BlockUser from "./home/blockUser/BlockUser";
import ChannelsScreen from './home/channels/ChannelsScreen';
import ChannelSetting from "./home/channelSetting/ChannelSetting";
import Chat from "./home/chat/Chat";
import ConnectWithChannel from "./home/connectWithChannel/ConnectWithChannel";
import CreateChannel from "./home/createChannel/CreateChannel";
import EditChannel from "./home/editChannel/EditChannel";
import EmptyScreen from "./home/emptyScreen/EmptyScreen";
import FriendDetail from "./home/friendDetail/FriendDetail";
import FriendsScreen from "./home/friendsScreen/FriendsScreen";
import ManagaChannel from "./home/manageChannel/ManagaChannel";
import NewAdmin from "./home/newAdmin/NewAdmin";

function HomeLayout() {

  const { session } = useRootStore().localStore

  if (!session.accessToken) {
    return <Navigate to='/auth/welcome' />
  }

  return (
    <Container>
      <Sidebar>
        <ChannelsScreen />
      </Sidebar>
      <MainBody>
        <ChatArea>
          <Chat />
        </ChatArea>
        <motion.div
          className='rigthArea'
        >
          <EditChannel />
        </motion.div>
      </MainBody>
    </Container>
  )
}

export default observer(HomeLayout)


const Container = styled.div`
  display: flex;
  flex: 5;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  .rigthArea{
    flex: 1.3;
  }
`

const Sidebar = styled.div`
  flex: 2;
  max-width: 340px;
  width: 340px;
  height: 100%;
`

const ChatArea = styled.div`
  flex: 3;
  width: 100%;
  height: 100%;
  background-color: #ddd;
`

const MainBody = styled.div`
  flex: 3;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`