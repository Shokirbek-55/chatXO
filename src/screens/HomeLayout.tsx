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
import { regex } from "../utils/regax";
import EmptyScreen from "./home/emptyScreen/EmptyScreen";
import ManageChannelLayout from "./ManageChannel";

function HomeLayout() {
    const navigate = useNavigate();
    const { session } = useRootStore().localStore;
    const { visible, hide } = useRootStore().visibleStore;
    const { setChannelHashId } = useRootStore().channelStore;
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
        <AppBody>
            <Container>
                <Sidebar>
                    <SidebarLayout />
                </Sidebar>
                <ChatArea onClick={() => hide("menuChannel")}>
                    <Outlet />
                    <EmptyScreen text="Select a chat to start messaging" />
                </ChatArea>
                <RightArea
                    onClick={() => hide("menuChannel")}
                    $isopen={visible.rightSidebar ? "0px" : "-340px"}
                >
                    <ManageChannelLayout />
                </RightArea>
                <Relevence />
                <PreviewImage />
                <UploadChannelFile />
                <PollMessageCard />
            </Container>
        </AppBody>
    );
}

export default observer(HomeLayout);

const AppBody = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: rgba(127, 168, 139, 0.15);
    display: flex;
    justify-content: center;
`

const Container = styled.div`
    position: relative;
    display: flex;
    width: 1000px;
    height: 100vh;
    max-width: 1000px;
    max-height: 100vh;
    background-color: #fff;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 4px 38px -20px rgba(0, 0, 0, 0.25);
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
    background-color: #fff;
    border-right: 1px solid #e5e5e5;
`;

const ChatArea = styled.div`
    position: relative;
    flex: 1;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: #fff;
`;

const RightArea = styled.div<{ $isopen?: string }>`
    position: absolute;
    flex: 1;
    max-width: 340px;
    width: 340px;
    height: 100%;
    transition: right 0.3s ease-in-out;
    z-index: 16;
    right: ${(props) => props.$isopen};
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    background: rgba(127, 168, 139, 0.6);
`;
