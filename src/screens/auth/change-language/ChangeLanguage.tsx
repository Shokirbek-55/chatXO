import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Text from "../../../components/Text/Text";
import LanguageSelect from "../../../components/languageSelect/LanguageSelect";
import i18n from "../../../translations/index";
import Assets from "../../../utils/requireAssets";
import styles from "./ChangeLanguage.module.css";

const ChangeLanguageView = () => {
    const navigation = useNavigate();
    const { t } = useTranslation();

    const lngs = {
        en: {
            nativeName: t("english_language"),
            flag: Assets.EngIcon,
        },
        de: {
            nativeName: t("german_language"),
            flag: Assets.GerIcon,
        },
        es: {
            nativeName: t("spanish_language"),
            flag: Assets.SpIcon,
        },
        fr: {
            nativeName: t("french_language"),
            flag: Assets.FrIcon,
        },
        it: {
            nativeName: t("italian_language"),
            flag: Assets.ItIcon,
        },
        pt: {
            nativeName: t("portuguese_language"),
            flag: Assets.Poricon,
        },
    };

    return (
        <div className={styles.container}>
            <Header
                text={`${t("change_language")}`}
                leftIcon="arrowLeft"
                onLeftIconPress={() => navigation("/auth/welcome")}
            />
            <div className={styles.contentBox}>
                <Text
                    fontSize="14px"
                    children="Please select your language to continue."
                />
                {Object.keys(lngs).map((lng, index) => (
                    <LanguageSelect
                        onPress={(e) => i18n.changeLanguage(lng)}
                        key={index}
                        language={lngs[lng as keyof typeof lngs].nativeName}
                        flag={lngs[lng as keyof typeof lngs].flag}
                        isCheck={lng === i18n.language}
                    />
                ))}
            </div>
        </div>
    );
};

export default ChangeLanguageView;
