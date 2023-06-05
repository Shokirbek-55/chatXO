import { Route, Routes } from "react-router-dom"
import PrivateRoutes from "./PrivateRoutes"
import Home from "../screens/Home"
import Login from "../screens/Login"
import Contact from "../screens/Contact"
import useRootStore from "../hooks/useRootStore"
import { observer } from "mobx-react-lite"
import SignUp from "../screens/SignUp"
import HomeLayout from "../screens/HomeLayout"
import AuthLayout from "../screens/AuthLayout"


function RootRouter() {

    const { token } = useRootStore().loginStore

    return (
        <Routes>
            <Route element={<HomeLayout />} >
                <Route index path='/' element={<Home />} />
                <Route path='contact' element={<Contact />} />
            </Route>
            <Route path="/auth" element={<AuthLayout />} >
                <Route index path='login' element={<Login />} />
                <Route path='signup' element={<SignUp />} />
            </Route>
        </Routes>
    )
}

export default observer(RootRouter)