import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AvatarUpload from '../../../components/AvatarUpload/AvatarUpload';
import Header from '../../../components/Header/Header';
import MessageBox from '../../../components/MessageBox';
import RowItemView from '../../../components/RowItem';
import Text from '../../../components/Text/Text';
import { friendDetails, weChanels } from '../../../store/dataBase';
import styles from "./FriendDetail.module.css"

const FriendDetail = () => {
    const navigation = useNavigate()
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
                            ? friendDetails.avatar
                            : ""
                    }
                    upload={false}
                    color={friendDetails.color}
                />
                <Text text={friendDetails.username} />
                <Text children="My Judgement in groups" />
            </div>
            {weChanels?.length !== 0 ?
                weChanels?.map((e, index) => {
                    return (
                        <div key={index}>
                            <RowItemView
                                color={e.color}
                                imageUrl={e.avatar ? e.avatar : ""}
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

export default FriendDetail
