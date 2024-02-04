import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import Header from "../../../components/Header/Header";
import useRootStore from "../../../hooks/useRootStore";
import styles from "./Language.style.module.css";

const Language = () => {
    const { t, i18n } = useTranslation();

    const lngs = {
        en: {
            nativeName: t("english_language"),
        },
        de: {
            nativeName: t("german_language"),
        },
        es: {
            nativeName: t("spanish_language"),
        },
        fr: {
            nativeName: t("french_language"),
        },
        it: {
            nativeName: t("italian_language"),
        },
        pt: {
            nativeName: t("portuguese_language"),
        },
    };
    const { closeModal } = useRootStore().routerStore;
    return (
        <div className={styles.container}>
            <div className={styles.contentBox}>
                <Header
                    text={t("change_language")}
                    leftIcon="arrowLeft"
                    onLeftIconPress={() => closeModal("left")}
                />
                <div>
                    {Object.keys(lngs).map((lng, index) => (
                        <div className={styles.language} key={index}>
                            <input
                                className={styles.radio}
                                type="radio"
                                name="radio"
                                id={`${index}`}
                                defaultChecked={lng == i18n.language}
                                key={lng}
                                onClick={(e) => i18n.changeLanguage(lng)}
                            />
                            <label
                                htmlFor={`${index}`}
                                style={{ cursor: "pointer" }}
                                onClick={(e) => i18n.changeLanguage(lng)}
                            >
                                <div className={styles.languagesName}>
                                    {lngs[lng as keyof typeof lngs].nativeName}
                                </div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default observer(Language);
