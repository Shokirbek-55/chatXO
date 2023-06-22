import { styled } from "styled-components"
import Header from "../../../components/Header/Header"
import { useTranslation } from "react-i18next"
import Text from "../../../components/Text/Text"
import styles from './ChannelsScreen.module.css'
import { Loading } from "../../../components/Loading/Loading"
import MessageBox from "../../../components/MessageBox/MessageBox"
import ChannelRowItem from "../../../components/ChanneItem/ChannelItem"
import useRootStore from "../../../hooks/useRootStore"
import { observer } from "mobx-react-lite"
import { TMP_URL } from "../../../env"
import { motion } from "framer-motion";
import { InputComponent } from "../../../utils/inputComponent"
import { toJS } from "mobx"

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

function ChannelsScreen() {

  const { logout } = useRootStore().authStore
  const { toRouter } = useRootStore().routerStore
  const { myChannels, setSearchChannels, getChannelByHashId, channelData } = useRootStore().channelStore
  const { t } = useTranslation()

  const serachChannelHandler = (text: string) => {
    setSearchChannels(text)
  }

  const getChannel = (hashId: string) => {
    getChannelByHashId(hashId)
    toRouter("manageChannel")
  }

  return (
    <LeftAreaContainer>
      <Header
        text={t("groups")}
        rightIcon="account"
        onRightIconPress={() => toRouter('account')}
      />
      <div className={styles.SearchBox}>
        <InputComponent
          onChangeText={serachChannelHandler}
          placeholder={`${t("searchPlaceholder")}`}
        />
        <Text
          center
          numbers={myChannels.length}
          children={t("groups")}
          style={{
            fontSize: "16px",
            paddingBottom: "5px",
          }}
        />
      </div>
      <div className={styles.main}>
        {false && (
          <div className={styles.loadingBox}>
            <Loading />
          </div>
        )}
        {false && (
          <div className={styles.loadingError}>
            <MessageBox title={t("No Internet Connection")} />
          </div>
        )}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className={styles.contentBox}>
          {myChannels.map((e, index) => {
            return (
              <motion.div
                variants={item}
                whileTap={{ scale: 0.8 }}
                key={index}
                id="map-dev"
                className={styles.channelRowBox}
              >
                <ChannelRowItem
                  onPress={() => getChannel(e?.hashId as string)}
                  item={e}
                  name={e.name}
                  color={e.color ? `linear-gradient(25deg, ${e.color} 30%, #ddd 100%)` : "linear-gradient(#ddd, #666)"}
                  number={e.id}
                  imageUrl={e.avatar ? `${TMP_URL}/${e.avatar}` : ""}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </LeftAreaContainer>
  )
}

export default observer(ChannelsScreen)


const LeftAreaContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`