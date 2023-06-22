import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import Header from '../../../components/Header/Header';
import MessageBox from '../../../components/MessageBox/MessageBox';
import RowItemView from '../../../components/RowItem';
import useRootStore from '../../../hooks/useRootStore';
import { blockedUser, friend } from '../../../store/dataBase';

const BlockUser = () => {
    const { t } = useTranslation()
    const {
        getChannelsUsersData,
        getChannelBlockedUsers,
        getBlockedUser,
        channelData,
        blockUser
    } = useRootStore().channelStore
    const { user } = useRootStore().authStore

    useEffect(() => {
        getChannelBlockedUsers(channelData.hashId)
    }, [])

    return (
        <div>
            <Header
                text={t("block_user_button")}
                leftIcon="close"
            />
            <div>
                {getChannelsUsersData.map((e, index) => {
                    return (
                        <RowItemView
                            key={index}
                            loading={false}
                            color={e.color ? `linear-gradient(25deg, ${e.color} 30%, #ddd 100%)` : "linear-gradient(#ddd, #666)"}
                            imageUrl={e.avatar ? e.avatar : ""}
                            text={e.username}
                            rightButton={user.id !== e.id}
                            title={`${t("block_user_button")}`}
                            className="component_pick_btn"
                            onButtonPress={() => blockUser(channelData.hashId, e.id)}
                        />
                    );
                })}

                {getBlockedUser.length !== 0 ?
                    getBlockedUser.map((e, index) => {
                        return (
                            <RowItemView
                                key={index}
                                loading={false}
                                color={e.color ? `linear-gradient(25deg, ${e.color} 30%, #ddd 100%)` : "linear-gradient(#ddd, #666)"}
                                imageUrl={e.avatar ? e.avatar : ""}
                                text={e.username}
                                rightButton={true}
                                title={`${t("unblock_user_button")}`}
                                className="unblock_user_btn"
                            />
                        );
                    }) :
                    <MessageBox title={`${t("no_blocked_users")}`} />
                }
            </div>
        </div>
    )
}

export default BlockUser
