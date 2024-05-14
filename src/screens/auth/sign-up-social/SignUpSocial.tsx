import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Assets from "../../../utils/requireAssets";
import styles from "./SignUpSocial.module.css";
import Header from "../../../components/Header/Header";

const SignUpSocial = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();

  return (
    <div className={styles.newAccountBox}>
      <Header
        leftIcon="arrowLeft"
        onLeftIconPress={() => navigation("/auth/welcome")}
        text={`${t("create_account")}`}
      />
      <div className={styles.newAccountContainer}>
        <div className={styles.NewAccountBoxTwo}>
          <div className={styles.NewAccountButtonBox}>
            <button className={styles.loginButton}>
              {
                <img
                  style={{
                    paddingRight: "10px",
                  }}
                  src={Assets.f_logo}
                  alt=""
                />
              }
              {t("login_fb")}
            </button>

            <button className={styles.loginButton}>
              {
                <img
                  style={{
                    paddingRight: "10px",
                  }}
                  src={Assets.g_logo}
                  alt=""
                />
              }
              {t("login_fb")}
            </button>
          </div>
          <p>Or</p>
          <Link
            to={"/auth/sign-up"}
            style={{ display: "flex", textDecoration: "none" }}
          >
            <button className={styles.NewAccountButtonB}>
              {t("sign_up_email")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpSocial;
