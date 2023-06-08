import { useTranslation } from 'react-i18next';
import Header from '../../../components/Header/Header';
import RowItemView from '../../../components/RowItem';
import { data } from '../../../store/dataBase';

const NewAdmin = () => {
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
                leftIcon="close"
                text={t("newAdmin")}
            />
            <div>
                {data
                    ? data.users?.map((e, index) => {
                        return (
                            <RowItemView
                                key={index}
                                loading={false}
                                color={e.color ? e.color : "linear-gradient(#ddd, #666)"}
                                imageUrl={e.avatar ? e.avatar : ""}
                                text={e.username}
                                className="component_pick_btn"
                                title={`${t("newAdmin")}`}
                            />
                        );
                    })
                    : null}
            </div>
        </div>
    )
}

export default NewAdmin
