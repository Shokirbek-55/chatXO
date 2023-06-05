import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Text from "../../../components/Text";
import Assets from "../../../utils/requireAssets";
import styles from "./Welcome.module.css";

const WelcomeView = () => {
  const navigation = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={styles.Register}>
      <div className={styles.registerBox}>
        <div className={styles.registerBoxTop}>
          <div className={styles.chatIcon}>
            <img className={styles.logoIcon} src={Assets.icon} alt="" />
          </div>
          <h1
            style={{
              fontFamily: "Montserrat6",
              color: "black",
            }}
          >
            {t("welcome_text")}
          </h1>
        </div>
        <div className={styles.registerBoxBottom}>
          <Link
            to={"/auth/login"}
            className={styles.loginBtn}
            style={{ textDecoration: "none" }}
          >
            {t("login")}
          </Link>
          <Link
            to={"/auth/sign-up-social"}
            className={styles.createAnAccount}
            style={{ textDecoration: "none" }}
          >
            {t("create_account")}
          </Link>
          <div className={styles.languageBox}>
            <Text
              handleLink={() => navigation("/auth/changeLanguage")}
              children={t("change_language")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeView;
