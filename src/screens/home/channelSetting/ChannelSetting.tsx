import React from 'react'
import { useTranslation } from 'react-i18next';
import Header from '../../../components/Header/Header';
import RowItemView from '../../../components/RowItem';
import { data } from '../../../store/dataBase';

const ChannelSetting = () => {
    const { t } = useTranslation()
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
            />
            <div>
                {data?.users?.map((e, index) => {
                    return (
                        <>
                            <div
                                key={index}
                            >
                                <RowItemView
                                    key={index}
                                    loading={false}
                                    rightButton={true}
                                    color={e.color ? e.color : "linear-gradient(#ddd, #666)"}
                                    imageUrl={e.avatar ? e.avatar : ""}
                                    text={e.username}
                                    title={`${t("delete")}`}
                                    className="component_pick_btn"
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

export default ChannelSetting
