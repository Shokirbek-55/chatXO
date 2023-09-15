import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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
    const { closeModal, toRouter } = useRootStore().routerStore;
    const { createChannel, setCreateChannelState, setCreateChannelData } =
        useRootStore().channelStore;

    const randomChannelColor = (Color: string) => {
        setCreateChannelState("color", Color);
    };

    const CreateChannel = () => {
        createChannel(setCreateChannelData);
        toRouter("editChannel");
    };

    return (
        <div className={styles.container}>
            <Header
                text={t("createGroup")}
                leftIcon={"arrowLeft"}
                onLeftIconPress={() => closeModal()}
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
                        text="Random color"
                        handleLink={() => randomChannelColor(getRandomColor())}
                    />
                </div>
                <div className={styles.contentBottom}>
                    <Text
                        children={t("groupsName")}
                        style={{
                            paddingLeft: "15px",
                            paddingBottom: "5px",
                            fontFamily: "Montserrat4",
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
