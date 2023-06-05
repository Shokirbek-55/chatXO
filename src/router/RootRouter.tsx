import { Route, Routes } from "react-router-dom"
import PrivateRoutes from "./PrivateRoutes"
import Home from "../screens/home/Home"
import Login from "../screens/auth/sign-in/Login"
import Contact from "../screens/home/Contact"
import useRootStore from "../hooks/useRootStore"
import { observer } from "mobx-react-lite"
import HomeLayout from "../screens/HomeLayout"
import AuthLayout from "../screens/AuthLayout"
import SignUp from "../screens/auth/sign-up/SignUp"
import WelcomeView from "../screens/auth/welcome/Welcome"
import ChangeLanguageView from "../screens/auth/change-language/ChangeLanguage"


function RootRouter() {

    const { token } = useRootStore().loginStore

    return (
        <Routes>
            <Route element={<HomeLayout />} >
                <Route index path='/' element={<Home />} />
                <Route path='contact' element={<Contact />} />
            </Route>
            <Route path="/auth" element={<AuthLayout />} >
                <Route index path='welcome' element={<WelcomeView />} />
                <Route path='login' element={<Login />} />
                <Route path='signup' element={<SignUp />} />
                <Route path='changeLanguage' element={<ChangeLanguageView />} />
            </Route>
        </Routes>
    )
}

export default observer(RootRouter)