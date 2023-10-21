import { observer } from "mobx-react-lite";
import { generatePath, Navigate, Outlet, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import useRootStore from "../hooks/useRootStore";
import SidebarLayout from "./Sidebar";

import EmptyScreen from "./home/emptyScreen/EmptyScreen";
import ManageChannelLayout from "./ManageChannel";
import Relevence from "../components/Relevence/relevence";
import PreviewImage from "../components/PreviewImage/PreviewImage";
import UploadFile from "../components/UploadFile/UploadFile";
import UploadChannelFile from "../components/UploadChannelFile/UploadChannelFile";
import { regex } from "../utils/regax";
import { useEffect } from "react";

function HomeLayout() {
    const { session } = useRootStore().localStore;
    const { isOpenRigthSideBar } = useRootStore().routerStore;
    const { setChannelHashId, getChannelByHashId } =
        useRootStore().channelStore;
    const navigate = useNavigate();
    const hashIdArr = window.location.pathname.match(regex);
    const hashId = hashIdArr?.[1].toString();
    const localHashId = JSON.stringify(localStorage.getItem("hashId"));

    useEffect(() => {
        if (hashId && session.accessToken) {
            const target = generatePath(`/:name`, {
                name: `@${hashId}`,
            });
            setChannelHashId(hashId, () => navigate(target));
        } else if (!session.accessToken) {
            navigate("/auth/welcome");
        }
    }, []);

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
                <Relevence />
                <PreviewImage />
                <UploadFile />
                <UploadChannelFile />
            </Container>
    );
}

export default observer(HomeLayout);

const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
    .rigthArea {
        flex: 1;
        max-width: 340px;
        width: 340px;
        height: 100%;
        transition: transform 0.3s ease-in-out;
        z-index: 16;
    }
    .open {
        transform: translateX(0);
    }
    .close {
        transform: translateX(100%);
    }
`;

const Sidebar = styled.div`
    flex: 1;
    max-width: 340px;
    width: 340px;
    height: 100%;
    z-index: 1;
`;

const ChatArea = styled.div`
    position: relative;
    flex: 1;
    width: 100%;
    height: 100%;
    background-color: #ddd;
    z-index: 1;
`;

const RightArea = styled.div<{ $isopen?: string }>`
    flex: 1;
    max-width: 340px;
    width: 340px;
    height: 100%;
    transition: margin-right 0.3s ease-in-out;
    z-index: 16;
    margin-right: ${(props) => props.$isopen};
`;
