import React from 'react'
import { useTranslation } from 'react-i18next';
import Header from '../../../components/Header/Header';
import MessageBox from '../../../components/MessageBox';
import RowItemView from '../../../components/RowItem';
import { friend } from '../../../store/dataBase';

const AddUserToChannel = () => {
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
                text={`${t("addParticipant")}`}
                leftIcon="close"
            />
            <div style={{ marginTop: "5px" }}>
                {friend?.length !== 0 ?
                    friend?.map((e, index) => {
                        return (
                            <RowItemView
                                key={index}
                                text={e.username}
                                loading={false}
                                imageUrl={e.avatar ? e.avatar : ""}
                                color={e.color ? e.color : "linear-gradient(#ddd, #666)"}
                                rightButton={true}
                                title={`${t("add")}`}
                            />
                        );
                    }) :
                    <MessageBox title={`${t("no_avalible_friends")}`} />
                }
            </div>
        </div>
    )
}

export default AddUserToChannel
