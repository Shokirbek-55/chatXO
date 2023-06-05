import { styled } from "styled-components"
import Header from "../../../components/Header/Header"
import { useTranslation } from "react-i18next"
import Footer from "../../../components/Footer/Footer"
import { InputComponent } from "../../../components/InputSearch/inputComponent"
import Text from "../../../components/Text/Text"
import styles from './index.module.css'
import { Loading } from "../../../components/Loading/Loading"
import MessageBox from "../../../components/MessageBox/MessageBox"
import ChannelRowItem from "../../../components/ChanneItem/ChannelItem"


function ChannelsScreen() {

  const { t } = useTranslation()

  return (
    <LeftAreaContainer>
      <Header
        text={t("groups")}
        rightIcon="account"
        onRightIconPress={() => console.log("right icon pressed")}
      />
      <div className={styles.SearchBox}>
        <InputComponent
          onChangeText={(text) => console.log(text)}
          size={18}
          placeholder={t("searchPlaceholder")}
        />
        <Text
          center
          numbers={1}
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
        <div className={styles.contentBox}>
          {true ? (
                    <div
                      id="map-dev"
                      className={styles.channelRowBox}
                    >
                      <ChannelRowItem
                        onPress={() => console.log("channel row pressed")}                        
                        item={'channel'}
                        text={'channel'}
                        natification={2}
                        color={"linear-gradient(#ddd, #666)"}
                        number={2}
                        imageUrl={'https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fimage&psig=AOvVaw1wzc2EL4jeU1VvdKu5xohL&ust=1686049984247000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMjvzuT_q_8CFQAAAAAdAAAAABAE'}
                      />
                    </div>
                  ) :
                <MessageBox size="12px" title={t("no_avalible_groups")} />
              }
        </div>
      </div>
      <Footer activeTab={1} />
    </LeftAreaContainer>
  )
}

export default ChannelsScreen


const LeftAreaContainer = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid yellow;
    display: flex;
    flex-direction: column;
`