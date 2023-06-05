import { observer } from 'mobx-react-lite';
import { Navigate, Outlet } from 'react-router-dom';
import useRootStore from '../hooks/useRootStore';

function HomeLayout() {

  const { token } = useRootStore().loginStore

  if (!token) {
    console.log('token', token);
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div>
      <div className='sidebar'>
        SideBar
      </div>
      <div>
        <div>Chat Area</div>
        <div>Profile Area</div>
      </div>
    </div>
  )
}

export default observer(HomeLayout)