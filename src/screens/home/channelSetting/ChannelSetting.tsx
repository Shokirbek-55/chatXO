import { observer } from 'mobx-react-lite';
import React from 'react'
import { useTranslation } from 'react-i18next';
import Header from '../../../components/Header/Header';
import RowItemView from '../../../components/RowItem';
import { TMP_URL } from '../../../env';
import useRootStore from '../../../hooks/useRootStore';
import { data } from '../../../store/dataBase';

const ChannelSetting = () => {
    const { t } = useTranslation()
    const { getChannelUsersData, delateUserFromChannel, channelData } = useRootStore().channelStore
    const { user } = useRootStore().authStore
    const { closeModal } = useRootStore().routerStore
    return (
        <div
            style={{
                backgroundColor: "#fff",
                width: "100%",
                height: "100vh",
                overflowY: "scroll",
            }}
        >
            <Header
                text={`${t("settings")}`}
                leftIcon="close"
                onLeftIconPress={() => closeModal()}
            />
            <div>
                {getChannelUsersData.filter((e) => e.id !== user.id).map((e, index) => {
                    return (
                        <>
                            <div
                                key={index}
                            >
                                <RowItemView
                                    loading={false}
                                    rightButton={true}
                                    color={e.color ? `linear-gradient(25deg, ${e.color} 30%, #ddd 100%)` : "linear-gradient(#ddd, #666)"}
                                    imageUrl={e.avatar ? `${TMP_URL}/${e.avatar}` : ""}
                                    text={e.username}
                                    title={`${t("delete")}`}
                                    className="component_pick_btn"
                                    onButtonPress={() => delateUserFromChannel(channelData.hashId, e.id)}
                                />
                            </div>
                            {/* <div style={{ display: isRelevance[index] ? "block" : "none" }}>
                              <RangeSilderComponent
                                  friendId={e.id}
                                  friendRelevance={e.relevance as number}
                              />
                          </div> */}
                        </>
                    );
                })}
            </div>
        </div>
    )
}

export default observer(ChannelSetting)
