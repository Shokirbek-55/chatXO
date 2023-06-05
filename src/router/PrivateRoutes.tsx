import { observer } from 'mobx-react-lite'
import { Navigate, Outlet } from 'react-router-dom'
import useRootStore from '../hooks/useRootStore'
import { useEffect } from 'react'

const PrivateRoutes = () => {
    
    const { loginStore } = useRootStore()
    
    const { token } = loginStore

    useEffect(() => {
        console.log('token', token);
    }, [token])

    return (
        token ? <Outlet /> : <Navigate to='/login' />
    )
}
export default observer(PrivateRoutes)