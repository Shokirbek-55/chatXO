

import { observer } from 'mobx-react-lite';
import { Navigate, Outlet } from 'react-router-dom';
import useRootStore from '../hooks/useRootStore';

function AuthLayout() {

    const { token } = useRootStore().loginStore

    if (token) {
        console.log('token', token);
        return <Navigate to="/" replace />;
    }
    
  return (
    <div>
          <Outlet />
    </div>
  )
}

export default observer(AuthLayout)