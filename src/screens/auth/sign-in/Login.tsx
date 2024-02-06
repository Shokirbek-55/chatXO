import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
    FacebookIcon,
    GoogleIcon,
    SearchIcon,
} from "../../../assets/icons/icons";
import Header from "../../../components/Header/Header";
import Text from "../../../components/Text/Text";
import TextFieldd from "../../../components/TextField/TextField";
import { auth, providerFC, providerOAuth } from "../../../helper/firebase";
import useRootStore from "../../../hooks/useRootStore";
import { ButtonComponent } from "../../../utils/button";
import Colors from "../../../utils/colors";
import SocialBtn from "../../../utils/socialBtn";
import styles from "./Login.module.css";

const Login = () => {
    const { t } = useTranslation();
    const navigation = useNavigate();
    const { loginEmailWithPassword, loginOAuth2 } = useRootStore().authStore;
    const { toglevisible, visible } = useRootStore().visibleStore;

    const visibility = () => {
        toglevisible("showPass");
    };

    const handleGoogleSignIn = async () => {
        await signInWithPopup(auth, providerOAuth)
            .then((result: any) => {
                loginOAuth2({
                    authType: "googleToken",
                    oAuth2token: result._tokenResponse.oauthIdToken,
                    email: result.user.email,
                    userName: result.user.email,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleFacebookLogin = () => {
        signInWithPopup(auth, providerFC)
            .then((result) => {
                const credential =
                    FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential!.accessToken;
                console.log("facebook login success", result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const validate = yup.object({
        email: yup
            .string()
            .trim()
            .required(`${t("error_message_email_req")}`)
            .email(`${t("error_message_email_form")}`),
        password: yup
            .string()
            .trim()
            .required(`${t("error_message_password_req")}`)
            // .matches(
            //     Regex.PasswordLogin,
            //     `${t("error_message_password_regex")}`
            // )
            .min(8, `${t("error_message_password_min")}`),
    });

    return (
        <div className={styles.headerBox}>
            <Header
                leftIcon="arrowLeft"
                text={`${t("Sign In")}`}
                onLeftIconPress={() => navigation("/auth/welcome")}
            />
            <div className={styles.login_container}>
                <div className={styles.formsContent}>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        validationSchema={validate}
                        onSubmit={(values) => {
                            console.log(values);
                            loginEmailWithPassword(values);
                        }}
                    >
                        {(formik) => (
                            <div>
                                <Form>
                                    <TextFieldd
                                        name="email"
                                        type="email"
                                        placeholder="Your email"
                                        icon={<SearchIcon />}
                                    />
                                    <TextFieldd
                                        name="password"
                                        type={
                                            visible.showPass
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Your password"
                                        showClick={visibility}
                                    />
                                    <div className={styles.forgotBox}>
                                        <Text
                                            children={t("forgot_pass")}
                                            color={Colors.Black}
                                            fontFamily="Montserrat"
                                            fontWeight={400}
                                            fontSize="14px"
                                            handleLink={() =>
                                                navigation("/auth/forgot-pass")
                                            }
                                        />
                                    </div>
                                    <ButtonComponent
                                        type={"submit"}
                                        width="100%"
                                        text="Login"
                                        height="45px"
                                    />
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
                <Text
                    children={t("or Login with")}
                    color={Colors.Black}
                    fontFamily="Montserrat"
                    fontWeight={400}
                    fontSize="14px"
                    margin="100px 0 0px 0"
                />
                <div className={styles.socialContent}>
                    <SocialBtn
                        icon={<FacebookIcon />}
                        title={`${t("login_fb")}`}
                        onClick={handleFacebookLogin}
                    />
                    <SocialBtn
                        icon={<GoogleIcon />}
                        title={`${t("login_google")}`}
                        margin="20px 0 0 0"
                        onClick={handleGoogleSignIn}
                    />
                </div>
            </div>
        </div>
    );
};

export default observer(Login);
