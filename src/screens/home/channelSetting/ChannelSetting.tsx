import { Slider } from "antd";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiCheck, BiPlus } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import {
    IoIosCheckmarkCircleOutline,
    IoIosCloseCircleOutline,
} from "react-icons/io";
import Header from "../../../components/Header/Header";
import MenuItem from "../../../components/MenuItem/MenuItem";
import RowItemView from "../../../components/RowItem";
import SearchInput from "../../../components/SearchInput/SearchInput";
import SmallAvatar from "../../../components/SmallAvatar/smallAvatar";
import Text from "../../../components/Text/Text";
import { TMP_URL } from "../../../env";
import useRootStore from "../../../hooks/useRootStore";
import Colors from "../../../utils/colors";
import styles from "./ChannelSetting.module.css";

const ChannelSetting = () => {
    const { t } = useTranslation();

    const {
        delateUserFromChannel,
        channelData,
        adminId,
        getOneMember,
        channelUsers,
        updateMemberRelevance,
        relevanceData,
        setSearchChannelUsers,
    } = useRootStore().channelStore;
    const { createFriend } = useRootStore().friendsStore;
    const { getFriendDetails } = useRootStore().usersStore;
    const { closeModal, toRouterManageCh } = useRootStore().routerStore;
    console.log("relevanceData", toJS(relevanceData));

    const getUser = (id: number) => {
        getOneMember(id);
    };

    const FriendDetails = (friendId: number) => {
        getFriendDetails(friendId);
        toRouterManageCh("channelInUser");
    };

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
                text={`${t("members")}`}
                leftIcon="arrowRight"
                onLeftIconPress={() => closeModal("right")}
            />
            <div className={styles.searchBox}>
                <SearchInput
                    onChange={(e) => setSearchChannelUsers(e)}
                    placeholder={`${t("searchPlaceholder")}`}
                />
            </div>
            <div className={styles.membersBox}>
                {channelUsers
                    .filter((e) => e?.id !== adminId)
                    .map((e, index) => {
                        return (
                            <div key={index}>
                                <MenuItem
                                    icon={
                                        <SmallAvatar
                                            imageUrl={
                                                e.avatar
                                                    ? `${TMP_URL}/${e.avatar}`
                                                    : ""
                                            }
                                            color={
                                                e.color
                                                    ? `linear-gradient(25deg, ${e.color} 30%, #ddd 100%)`
                                                    : "linear-gradient(#ddd, #666)"
                                            }
                                        />
                                    }
                                    title={e.username}
                                    right={
                                        <div
                                            className={
                                                styles.userRelevanceBox
                                            }
                                        >
                                            <Text
                                                children={e.relevance}
                                                handleLink={() =>
                                                    getUser(e.id)
                                                }
                                            />
                                            {e.isFriend ? null : (
                                                <span
                                                    onClick={() =>
                                                        createFriend(e.id)
                                                    }
                                                >
                                                    <BiPlus
                                                        size={24}
                                                        style={{
                                                            padding: "2px",
                                                        }}
                                                    />
                                                </span>
                                            )}
                                        </div>
                                    }
                                    onTitlePress={() => FriendDetails(e.id)}
                                />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default observer(ChannelSetting);
