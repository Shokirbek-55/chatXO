import React from 'react'
import { useTranslation } from 'react-i18next';
import Header from '../../../components/Header/Header';
import MessageBox from '../../../components/MessageBox';
import RowItemView from '../../../components/RowItem';
import { blockedUser, friend } from '../../../store/dataBase';

const BlockUser = () => {
    const { t } = useTranslation()
    const loading = true
    return (
        <div>
            <Header
                text={t("block_user_button")}
                leftIcon="close"
            />
            <div>
                {friend.map((e, index) => {
                    return (
                        <RowItemView
                            key={index}
                            loading={false}
                            color={e.color ? e.color : "linear-gradient(#ddd, #666)"}
                            imageUrl={e.avatar ? e.avatar : ""}
                            text={e.username}
                            rightButton={true}
                            title={`${t("block_user_button")}`}
                            className="component_pick_btn"
                        />
                    );
                })}
                {loading ?
                    (
                        Object.values(blockedUser as [])?.map((e: any, index) => {
                            return (
                                <RowItemView
                                    key={index}
                                    loading={false}
                                    color={e.color ? e.color : "linear-gradient(#ddd, #666)"}
                                    imageUrl={e.avatar ? e.avatar : ""}
                                    text={e.username}
                                    rightButton={true}
                                    title={`${t("unblock_user_button")}`}
                                    className="unblock_user_btn"
                                />
                            );
                        })
                    ) : (
                        <MessageBox title={`${t("no_blocked_users")}`} />
                    )}
            </div>
        </div>
    )
}

export default BlockUser
