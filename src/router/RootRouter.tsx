import { observer } from "mobx-react-lite"
import { Route, Routes } from "react-router-dom"
import AuthLayout from "../screens/AuthLayout"
import HomeLayout from "../screens/HomeLayout"
import Login from "../screens/auth/sign-in/Login"
import SignUp from "../screens/auth/sign-up/SignUp"
import WelcomeView from "../screens/auth/welcome/Welcome"
import ChangeLanguageView from "../screens/auth/change-language/ChangeLanguage"
import SignUpSocial from "../screens/auth/sign-up-social/SignUpSocial"
import FriendsScreen from "../screens/home/friendsScreen/FriendsScreen"


function RootRouter() {

    return (
        <Routes>
            <Route path="/" element={<HomeLayout />} >
                <Route path='friends' element={<FriendsScreen />} />
            </Route>
            <Route path="/auth" element={<AuthLayout />} >
                <Route index path='welcome' element={<WelcomeView />} />
                <Route path='login' element={<Login />} />
                <Route path='sign-up' element={<SignUp />} />
                <Route path='sign-up-social' element={<SignUpSocial />} />
                <Route path='changeLanguage' element={<ChangeLanguageView />} />
            </Route>
        </Routes>
    )
}

export default observer(RootRouter)