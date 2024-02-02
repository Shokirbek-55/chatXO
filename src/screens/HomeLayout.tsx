import { observer } from "mobx-react-lite";
import { generatePath, Outlet, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import useRootStore from "../hooks/useRootStore";
import SidebarLayout from "./Sidebar";

import { useEffect } from "react";
import PollMessageCard from "../components/Chat/PollMessageCard";
import PreviewImage from "../components/PreviewImage/PreviewImage";
import Relevence from "../components/Relevence/relevence";
import UploadChannelFile from "../components/UploadChannelFile/UploadChannelFile";
import UploadFile from "../components/UploadFile/UploadFile";
import { regex } from "../utils/regax";
import EmptyScreen from "./home/emptyScreen/EmptyScreen";
import ManageChannelLayout from "./ManageChannel";

function HomeLayout() {
    const { session } = useRootStore().localStore;
    const { visible, hide } = useRootStore().visibleStore;
    const { setChannelHashId } =
        useRootStore().channelStore;
    const navigate = useNavigate();
    const hashIdArr = window.location.pathname.match(regex);
    const hashId = hashIdArr?.[1].toString();

    useEffect(() => {
        if (hashId && session.accessToken) {
            const target = generatePath(`/:name`, {
                name: `@${hashId}`,
            });
            setChannelHashId(hashId, () => navigate(target));
        } else if (!session.accessToken) {
            navigate("/auth/welcome");
        }
    }, [hashId]);

    return (
        <Container>
            <Sidebar>
                <SidebarLayout />
            </Sidebar>
            <ChatArea onClick={() => hide("menuChannel")}>
                <Outlet />
                <EmptyScreen
                    text="Select a chat to start messaging"
                />
            </ChatArea>
            <RightArea
                onClick={() => hide("menuChannel")}
                $isopen={visible.rightSidebar ? "0px" : "-340px"}
            >
                <ManageChannelLayout />
            </RightArea>
            <Relevence />
            <PreviewImage />
            <UploadFile />
            <UploadChannelFile />
            <PollMessageCard />
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
