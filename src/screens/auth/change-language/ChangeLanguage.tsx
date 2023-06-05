import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import HeaderView from "../../../components/Header";
import styles from "./ChangeLanguage.module.css";
import i18n from '../../../translations/index';

const ChangeLanguageView = () => {
  const navigation = useNavigate();
  const { t } = useTranslation();

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

  // const changeLanguageColor = (e, index) => {
  //   const radio = document.querySelectorAll('.radio')
  //   console.log(radio, index);

  // }

  return (
    <div className={styles.container}>
      <HeaderView
        text={`${t("change_language")}`}
        leftIcon="arrowLeft"
        onLeftIconPress={() => navigation("/auth/welcome")}
      />
      <div className={styles.contentBox}>
        <div>
          {Object.keys(lngs).map((lng, index) => (
            <div className={styles.language} key={index}>
              <input
                className={styles.radio}
                type="radio"
                name="radio"
                id={`${index}`}
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

export default ChangeLanguageView;
