import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ButtonView from "../../../components/Button";
import Header from "../../../components/Header/Header";
import Input from "../../../components/Input";
import Text from "../../../components/Text/Text";
import useRootStore from "../../../hooks/useRootStore";
import styles from "./ConnectWithChannel.module.css";

const ConnectWithChannel = () => {
    const { t } = useTranslation();
    const { toRouter } = useRootStore().routerStore;
    const { forJoinChannelId } = useRootStore().usersStore;
    const [gNumber, setGNumber] = useState("");

    const { returnGroupByNumber, joinUserToChannel } =
        useRootStore().usersStore;

    const JoinChannel = async () => {
        returnGroupByNumber(gNumber);
    };

    return (
        <div className={styles.container}>
            <Header text="Connect" />
            <div className={styles.main}>
                <div className={styles.connectBox}>
                    <div className={styles.connect}>
                        <Text text={`${t("groupsNumber")}`} margin="2px 6px" />
                        <Input
                            borderred
                            value={gNumber}
                            placeholder="Enter group number"
                            setUserName={(e) => setGNumber(e)}
                        />
                        <ButtonView
                            title={`${t("join_group")}`}
                            style={{
                                display: "flex",
                                fontSize: "18px",
                                width: "100%",
                                marginTop: "20px",
                            }}
                            onClickbutton={() => JoinChannel()}
                        />
                    </div>
                    <div>
                        <h2
                            style={{
                                textAlign: "center",
                                color: "#404d66",
                                fontFamily: "Montserrat6",
                            }}
                        >
                            {t("or")}
                        </h2>
                    </div>
                    <ButtonView
                        title={`${t("createGroup")}`}
                        onClickbutton={() => toRouter("createChannel")}
                        style={{
                            display: "flex",
                            fontSize: "18px",
                            width: "100%",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default observer(ConnectWithChannel);
