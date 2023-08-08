import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { styled } from 'styled-components'
import useRootStore from '../hooks/useRootStore'

const ModalComponent = ({ children, isOpen }: {
    children: React.ReactNode,
    isOpen: boolean
}) => {

    return (
        <div style={{
            position: "absolute",
            width: "100%",
            height: "100vh",
            zIndex: 10,
            overflow: "hidden",
            transform: isOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease-in-out"
        }}>
            <ModalContainer>
                {children}
            </ModalContainer>
        </div>
    )

}


function ManageChannelLayout() {

    const { manageRouters } = useRootStore().routerStore

    return (
        <ManageChannelContainer >
            {
                manageRouters.map((route, index) => {
                    return (
                        <ModalComponent key={index} isOpen={route.isOpen}>
                            <route.components />
                        </ModalComponent>
                    )
                })
            }
        </ManageChannelContainer>
    )
}

export default observer(ManageChannelLayout)


const ModalContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  z-index: 10;
`

const ManageChannelContainer = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
`