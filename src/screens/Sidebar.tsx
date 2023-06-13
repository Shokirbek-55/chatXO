import { motion } from "framer-motion"
import { observer } from 'mobx-react-lite'
import React from 'react'
import { styled } from 'styled-components'
import Footer from '../components/Footer/Footer'
import useRootStore from '../hooks/useRootStore'

const ModalComponent = ({ children, isOpen }: {
  children: React.ReactNode,
  isOpen: boolean
}) => {

  const modal = {
    open: {
      x: 0,
    },
    closed: {
      x: 400,
    },
  }

  return (
    <motion.div
      variants={modal}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      transition={{ duration: 0.5 }}
    >
      <ModalContainer>
        {children}
      </ModalContainer>
    </motion.div>
  )

}


function Sidebar() {

  const { currentRoute, modalRoute,isOpen } = useRootStore().routerStore

  return (
    <SidebarContainer >
      <ModalComponent isOpen={isOpen}>
        {
          modalRoute?.components && <modalRoute.components />
        }
        </ModalComponent>
      <currentRoute.components />
      <Footer />
    </SidebarContainer>
  )
}

export default observer(Sidebar)


const ModalContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  z-index: 10;
`

const SidebarContainer = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
`