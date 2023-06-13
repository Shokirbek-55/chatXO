import { observer } from 'mobx-react-lite'
import { styled } from 'styled-components'
import Footer from '../components/Footer/Footer'
import useRootStore from '../hooks/useRootStore'
import { AnimatePresence } from 'framer-motion'

function Sidebar() {

  const { currentRoute } = useRootStore().routerStore

  return (
    <SidebarContainer >
      <currentRoute.components />
      <Footer />
    </SidebarContainer>
  )
}

export default observer(Sidebar)


const SidebarContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    border: 1px solid yellow;
    flex-direction: column;
`