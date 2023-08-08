import { observer } from 'mobx-react-lite';
import { Navigate, Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import useRootStore from '../hooks/useRootStore';
import SidebarLayout from "./Sidebar";
import EditChannel from "./home/editChannel/EditChannel";
import EmptyScreen from "./home/emptyScreen/EmptyScreen";
import ManageChannelLayout from "./ManageChannel"

function HomeLayout() {

  const { session } = useRootStore().localStore
  const { isOpenRigthSideBar } = useRootStore().routerStore


  if (!session.accessToken) {
    return <Navigate to='/auth/welcome' />
  }

  return (
    <Container>
      <Sidebar>
        <SidebarLayout />
      </Sidebar>
      <ChatArea>
        <Outlet />
        <EmptyScreen />
      </ChatArea>
      <RightArea $isopen={isOpenRigthSideBar}>
        <ManageChannelLayout />
      </RightArea>
    </Container>
  )
}

export default observer(HomeLayout)

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  .rigthArea{
    flex: 1;
    max-width: 340px;
    width: 340px;
    height: 100%;
    transition: transform 0.3s ease-in-out;
    z-index: 16;
  }
  .open{
    transform: translateX(0);
  }
  .close{
    transform: translateX(100%);
  }
`

const Sidebar = styled.div`
  flex: 1;
  max-width: 340px;
  width: 340px;
  height: 100%;
  z-index: 1;
`

const ChatArea = styled.div`
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: #ddd;
  z-index: 1;
`

const RightArea = styled.div<{ $isopen?: string }>`
  flex: 1;
  max-width: 340px;
  width: 340px;
  height: 100%;
  transition: margin-right 0.3s ease-in-out;
  z-index: 16;
  margin-right: ${props => props.$isopen};
`