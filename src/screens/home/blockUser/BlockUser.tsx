import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../../components/Header/Header";
import MessageBox from "../../../components/MessageBox/MessageBox";
import RowItemView from "../../../components/RowItem";
import SearchInput from "../../../components/SearchInput/SearchInput";
import { TMP_URL } from "../../../env";
import useRootStore from "../../../hooks/useRootStore";
import styles from "./BlockUser.module.css";

const BlockUser = () => {
    const { t } = useTranslation();
    const {
        unblockUser,
        getBlockedUser,
        channelData,
        blockUser,
        channelUsers,
        adminId,
    } = useRootStore().channelStore;
    const { user } = useRootStore().authStore;
    const { closeModal } = useRootStore().routerStore;

    const UnBlockUser = (id) => {
        unblockUser(channelData.hashId, id);
    };

    return (
        <div>
            <Header
                text={t("block_user_button")}
                leftIcon="arrowLeft"
                onLeftIconPress={() => closeModal("right")}
            />
            <div className={styles.searchBox}>
                <SearchInput
                    onChange={() => {}}
                    placeholder={`${t("searchPlaceholder")}`}
                />
            </div>
            <div>
                {Object.values(getBlockedUser).length !== 0 ? (
                    Object.values(getBlockedUser)
                        .filter((e) => e.id !== adminId)
                        .map((e, index) => {
                            return (
                                <RowItemView
                                    key={index}
                                    loading={false}
                                    color={
                                        e.color
                                            ? `linear-gradient(25deg, ${e.color} 30%, #ddd 100%)`
                                            : "linear-gradient(#ddd, #666)"
                                    }
                                    imageUrl={
                                        e.avatar ? `${TMP_URL}${e.avatar}` : ""
                                    }
                                    onButtonPress={() => UnBlockUser(e.id)}
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
    );
};

export default observer(BlockUser);
