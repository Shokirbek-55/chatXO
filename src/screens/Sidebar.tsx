import { observer } from "mobx-react-lite";
import React from "react";
import { styled } from "styled-components";
import Footer from "../components/Footer/Footer";
import useRootStore from "../hooks/useRootStore";

const ModalComponent = ({
    children,
    isOpen,
}: {
    children: React.ReactNode;
    isOpen: boolean;
}) => {
    return (
        <div
            style={{
                position: "absolute",
                width: "100%",
                height: "100vh",
                zIndex: 10,
                overflow: "hidden",
                transform: isOpen ? "translateX(0)" : "translateX(100%)",
                transition: "transform 0.3s ease-in-out",
            }}
        >
            <ModalContainer>{children}</ModalContainer>
        </div>
    );
};

function Sidebar() {
    const { currentRoute, routers } = useRootStore().routerStore;

    return (
        <SidebarContainer>
            {routers.map((route, index) => {
                return (
                    <ModalComponent key={index} isOpen={route.isOpen}>
                        <route.components />
                    </ModalComponent>
                );
            })}
            <currentRoute.components />
            <Footer />
        </SidebarContainer>
    );
}

export default observer(Sidebar);

const ModalContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    background-color: #fff;
    z-index: 10;
`;

const SidebarContainer = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
`;
