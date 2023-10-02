import TextFieldd from "../../../components/TextField/TextField";
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Header from "../../../components/Header/Header";
import useRootStore from "../../../hooks/useRootStore";
import Colors from "../../../utils/colors";
import Regex from "../../../utils/regax";
import Assets from "../../../utils/requireAssets";
import styles from "./Login.module.css";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, providerOAuth, providerFC } from "../../../helper/firebase";
import { toJS } from "mobx";

const Login = () => {
    const { loginEmailWithPassword, loginOAuth2 } = useRootStore().authStore;
    const { toglevisible, visible } = useRootStore().visibleStore;
    const navigation = useNavigate();
    const { t } = useTranslation();
    console.log("visible", toJS(visible.showPass));

    const visibility = () => {
        toglevisible("showPass");
    };

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, providerOAuth)
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
            .matches(Regex.Password, `${t("error_message_password_regex")}`)
            .min(8, `${t("error_message_password_min")}`),
    });

    return (
        <div className={styles.headerBox}>
            <Header
                leftIcon="arrowLeft"
                text={`${t("login")}`}
                onLeftIconPress={() => navigation("/auth/welcome")}
            />
            <div className={styles.login_container}>
                <div className={styles.buttonContent}>
                    <button
                        className={styles.loginButton}
                        onClick={handleFacebookLogin}
                    >
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

                    <button
                        onClick={handleGoogleSignIn}
                        className={styles.loginButton}
                    >
                        {
                            <img
                                style={{
                                    paddingRight: "10px",
                                }}
                                src={Assets.g_logo}
                                alt=""
                            />
                        }
                        {t("login_google")}
                    </button>
                </div>
                <h3 className={styles.loginTitleOr}>{t("or")}</h3>
                <div className={styles.inputContent}>
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
                                            label="Email"
                                            name="email"
                                            type="email"
                                            placeholder="Your email"
                                            visibility={false}
                                        />
                                        <TextFieldd
                                            label="Password"
                                            name="password"
                                            type={
                                                visible.showPass
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Your password"
                                            visibility={true}
                                            onClick={visibility}
                                        />
                                        <div className={styles.forgotBox}>
                                            <a
                                                style={{
                                                    color: Colors.Blue,
                                                }}
                                                onClick={() =>
                                                    navigation(
                                                        "/auth/forgot-pass"
                                                    )
                                                }
                                            >
                                                {t("forgot_pass")}
                                            </a>
                                        </div>
                                        <button
                                            type="submit"
                                            className={styles.SignUpBtn}
                                            style={{
                                                background: Colors.Blue,
                                            }}
                                        >
                                            {t("sign_up_email")}
                                        </button>
                                    </Form>
                                </div>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(Login);
