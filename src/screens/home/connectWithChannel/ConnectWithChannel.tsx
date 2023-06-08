import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ButtonView from '../../../components/Button';
import Header from '../../../components/Header/Header';
import Input from '../../../components/Input';
import Text from '../../../components/Text/Text';
import styles from "./ConnectWithChannel.module.css"

const ConnectWithChannel = () => {
    const { t } = useTranslation()
    const navigation = useNavigate()
    return (
        <div className={styles.container}>
            <Header text="Connect" />
            <div className={styles.main}>
                <div className={styles.connectBox}>
                    <div className={styles.connect}>
                        <Text text={`${t("groupsNumber")}`} margin="2px 6px" />
                        <Input
                            borderred
                        />
                        <ButtonView
                            title={`${t("Join group")}`}
                            style={{
                                display: "flex",
                                fontSize: "18px",
                                width: "100%",
                                marginTop: "20px",
                            }}
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
                        onClickbutton={() => navigation("")}
                        style={{
                            display: "flex",
                            fontSize: "18px",
                            width: "100%",
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default ConnectWithChannel
