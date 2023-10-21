import { observer } from "mobx-react-lite";
import { Route, Routes, useNavigate } from "react-router-dom";
import AuthLayout from "../screens/AuthLayout";
import Login from "../screens/auth/sign-in/Login";
import SignUp from "../screens/auth/sign-up/SignUp";
import WelcomeView from "../screens/auth/welcome/Welcome";
import ChangeLanguageView from "../screens/auth/change-language/ChangeLanguage";
import SignUpSocial from "../screens/auth/sign-up-social/SignUpSocial";
import Chat from "../screens/home/chat/Chat";
import useRootStore from "../hooks/useRootStore";
import React, { useEffect } from "react";
import ForgotPasswordView from "../screens/auth/forgot-password/ForgotPassword";
import { regex } from "../utils/regax";
import ChatHashtag from "../screens/home/chat/ChatHashtag";

const HomeLayout = React.lazy(() => import("../screens/HomeLayout"));

function RootRouter() {
    const { session } = useRootStore().localStore;
    const navigation = useNavigate();
    const hashIdArr = window.location.pathname.match(regex);
    const hashId = hashIdArr?.[1].toString();

    useEffect(() => {
        if (!session.accessToken) {
            navigation("/auth/welcome");
            localStorage.setItem("hashId", `${hashId}`);
        }
    }, []);

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
