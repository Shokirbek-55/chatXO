import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ChatxoLogo } from "../../../assets/icons/icons";
import Text from "../../../components/Text/Text";
import { ButtonComponent } from "../../../utils/button";
import Colors from "../../../utils/colors";
import styles from "./Welcome.module.css";

const WelcomeView = () => {
  const navigation = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={styles.Register}>
      <div className={styles.registerBox}>
        <div className={styles.registerBoxTop}>
          <div className={styles.chatIcon}>
            <ChatxoLogo />
          </div>
          <Text
            textAlign={"center"}
            fontWeight={400}
            fontFamily="Montserrat"
            color={Colors.DarkGray}
            margin="20px 0 0 0"
            children={
              "Revolutionizing group chats on a secure and user-friendly platform."
            }
          />
        </div>
        <div className={styles.registerBoxBottom}>
          <ButtonComponent
            width="200px"
            text="Sign In"
            height="40px"
            clickMe={() => navigation("/auth/login")}
          />
          <ButtonComponent
            width="200px"
            text="Create account"
            height="40px"
            backColor="transparent"
            color={Colors.Black}
            border="1px solid #000"
            margin="15px 0 0 0"
            clickMe={() => navigation("/auth/sign-up")}
          />
          <div className={styles.languageBox}>
            <Text
              fontFamily="Montserrat"
              fontWeight={400}
              color={Colors.Black}
              fontSize="14px"
              margin="15px 0 0 0"
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
