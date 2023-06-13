import { motion } from "framer-motion";
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import { styled } from 'styled-components';
import useRootStore from '../hooks/useRootStore';
import SidebarLayout from "./Sidebar";
import Chat from "./home/chat/Chat";
import EditChannel from "./home/editChannel/EditChannel";
import Account from "./home/account/Account";
import AccountSetting from "./home/accountSetting/AccountSetting";
import FriendsScreen from "./home/friendsScreen/FriendsScreen";
import AddFriend from "./home/addFriend/AddFriend";

function HomeLayout() {

  const { session } = useRootStore().localStore

  if (!session.accessToken) {
    return <Navigate to='/auth/welcome' />
  }

  return (
    <Container>
      <Sidebar>
        <AccountSetting />
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