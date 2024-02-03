import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import useRootStore from "../hooks/useRootStore";
import AuthLayout from "../screens/AuthLayout";
import ChangeLanguageView from "../screens/auth/change-language/ChangeLanguage";
import ForgotPasswordView from "../screens/auth/forgot-password/ForgotPassword";
import Login from "../screens/auth/sign-in/Login";
import SignUpSocial from "../screens/auth/sign-up-social/SignUpSocial";
import SignUp from "../screens/auth/sign-up/SignUp";
import WelcomeView from "../screens/auth/welcome/Welcome";
import Chat from "../screens/home/chat/Chat";
import ChatHashtag from "../screens/home/chat/ChatHashtag";

const HomeLayout = React.lazy(() => import("../screens/HomeLayout"));

function RootRouter() {
    const { session } = useRootStore().localStore;
    const navigation = useNavigate();

    useEffect(() => {
        if (!session.accessToken) {
            navigation("/auth/welcome");
        }
    }, [session.accessToken]);

    return (
        <Routes>
            <Route path="/" element={
                <React.Suspense fallback={null}>
                    <HomeLayout />
                </React.Suspense>
            }>
                <Route path=":name" element={<Chat />} />
                <Route path=":name/:hashTag" element={<ChatHashtag />} />
            </Route>
            <Route path="/auth" element={<AuthLayout />}>
                <Route index path="welcome" element={<WelcomeView />} />
                <Route path="login" element={<Login />} />
                <Route path="sign-up" element={<SignUp />} />
                <Route path="sign-up-social" element={<SignUpSocial />} />
                <Route path="changeLanguage" element={<ChangeLanguageView />} />
                <Route path="forgot-pass" element={<ForgotPasswordView />} />
            </Route>
        </Routes>
    );
}

export default observer(RootRouter);
