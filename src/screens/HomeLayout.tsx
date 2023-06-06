import { motion } from "framer-motion";
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import { styled } from 'styled-components';
import useRootStore from '../hooks/useRootStore';
import ChannelsScreen from './home/channels/ChannelsScreen';

function HomeLayout() {

  const { session } = useRootStore().localStore
  
  if (!session.accessToken) {
    return <Navigate to='/auth/login' />
  }

  return (
    <Container>
      <Sidebar>
        <ChannelsScreen />
      </Sidebar>
      <MainBody>
        <ChatArea>Chat Area</ChatArea>
        <motion.div
          className='rigthArea'

        >
          Profile Area
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

  .rigthArea{
    flex: 1;
  }
`

const Sidebar = styled.div`
  flex: 2;
  max-width: 340px;
  width: 340px;
  height: 100%;
  border: 1px solid red
`

const ChatArea = styled.div`
  flex: 3;
  width: 100%;
  height: 100%;
  border: 1px solid green;
`

const MainBody = styled.div`
  flex: 3;
  width: 100%;
  height: 100%;
  border: 1px solid blue;
  display: flex;
  flex-direction: row;
`