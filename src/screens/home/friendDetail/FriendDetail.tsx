import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AvatarUpload from '../../../components/AvatarUpload/AvatarUpload';
import Header from '../../../components/Header/Header';
import MessageBox from '../../../components/MessageBox';
import RowItemView from '../../../components/RowItem';
import Text from '../../../components/Text/Text';
import { TMP_URL } from '../../../env';
import useRootStore from '../../../hooks/useRootStore';
import styles from "./FriendDetail.module.css"
import { observer } from 'mobx-react-lite';

const FriendDetail = () => {
    const navigation = useNavigate()
    const { friendDetails, weChannels } = useRootStore().usersStore
    const { t } = useTranslation()
    return (
        <div className={styles.container}>
            <Header
                text={`${t("update_relevance")}`}
                leftIcon="arrowLeft"
                onLeftIconPress={() => navigation(-1)}
            />
            <div className={styles.contentBox}>
                <AvatarUpload
                    imageUrl={
                        friendDetails.avatar
                            ? `${TMP_URL}/${friendDetails.avatar}`
                            : ""
                    }
                    upload={false}
                    color={friendDetails.color ? friendDetails.color : "linear-gradient(#ddd, #666)"}
                />
                <Text text={friendDetails.username ? friendDetails.username : "User"} />
                <div className={styles.judgementText}>
                    <Text children="My Judgement" />
                    <Text color="yellowgreen" children="in groups" />
                </div>
            </div>
            {weChannels?.length !== 0 ?
                weChannels?.map((e, index) => {
                    return (
                        <div key={index}>
                            <RowItemView
                                color={e.color ? `linear-gradient(25deg, ${e.color} 30%, #ddd 100%)` : "linear-gradient(#ddd, #666)"}
                                imageUrl={e.avatar ? `${TMP_URL}/${e.avatar}` : ""}
                                text={e.name}
                                loading={false}
                            />
                        </div>
                    );
                }) :
                <MessageBox size="12px" title={`${t("no_avalible_groups")}`} />
            }
        </div>
    )
}

export default observer(FriendDetail)
