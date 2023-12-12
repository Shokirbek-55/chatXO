import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { generatePath, useNavigate } from "react-router-dom";
import AvatarUpload from "../../../components/AvatarUpload/AvatarUpload";
import ButtonView from "../../../components/Button";
import Header from "../../../components/Header/Header";
import Input from "../../../components/Input";
import Text from "../../../components/Text/Text";
import useRootStore from "../../../hooks/useRootStore";
import { getRandomColor } from "../../../utils/randomColor";
import styles from "./CreateChannel.module.css";

const CreateChannel = () => {
    const { t } = useTranslation();
    const navigation = useNavigate();
    const { closeModal, openRightSideBar, toRouterManageCh, setCurrentRoute } =
        useRootStore().routerStore;
    const { createChannel, setCreateChannelState, setCreateChannelData } =
        useRootStore().channelStore;

    const randomChannelColor = (Color: string) => {
        setCreateChannelState("color", Color);
    };

    const callbackHandle = (e) => {
        const target = (e) =>
            generatePath(`/:name`, {
                name: `@${e}`,
            });
        setCurrentRoute("channels");
        closeModal("left");
        navigation(target(e));
        openRightSideBar();
        toRouterManageCh("editChannel");
    };
    const CreateChannel = () => {
        createChannel(setCreateChannelData, (e) => callbackHandle(e));
    };

    return (
        <div className={styles.container}>
            <Header
                text={t("createGroup")}
                leftIcon={"arrowLeft"}
                onLeftIconPress={() => closeModal("left")}
            />
            <div className={styles.contentBox}>
                <div className={styles.contentTop}>
                    <AvatarUpload
                        style={{
                            width: "140px",
                            height: "140px",
                            borderRadius: "50%",
                        }}
                        color={
                            setCreateChannelData.color
                                ? setCreateChannelData.color
                                : "linear-gradient(#ddd, #666)"
                        }
                        upload={false}
                    />
                    <Text
                        children={t("random_color")}
                        handleLink={() => randomChannelColor(getRandomColor())}
                    />
                </div>
                <div className={styles.contentBottom}>
                    <Text
                        children={t("groupsName")}
                        style={{
                            paddingLeft: "15px",
                            paddingBottom: "5px",
                            fontFamily: "Montserrat",
                            fontWeight: 500
                        }}
                    />
                    <Input
                        borderred
                        placeholder="Enter name for channel"
                        value={setCreateChannelData.name}
                        setUserName={(e) => setCreateChannelState("name", e)}
                    />
                    <div className={styles.switchBox}>
                        <textarea
                            className={styles.description}
                            rows={4}
                            placeholder="Enter description"
                            value={setCreateChannelData.description}
                            onChange={(e) =>
                                setCreateChannelState(
                                    "description",
                                    e.target.value
                                )
                            }
                        />
                    </div>
                    <ButtonView
                        onClickbutton={CreateChannel}
                        title={`${t("create")}`}
                    />
                </div>
            </div>
        </div>
    );
};

export default observer(CreateChannel);
