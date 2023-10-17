import React from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import TextFieldd from "../../../components/TextField/TextField";
import { Form, Formik } from "formik";
import Colors from "../../../utils/colors";
import Regex from "../../../utils/regax";
import Header from "../../../components/Header/Header";
import useRootStore from "../../../hooks/useRootStore";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import {
    EmailIcon,
    FacebookIcon,
    GoogleIcon,
    PasswordIcon,
    UserIcon,
} from "../../../assets/icons/icons";
import { ButtonComponent } from "../../../utils/button";
import Text from "../../../components/Text/Text";
import SocialBtn from "../../../utils/socialBtn";

function SignUp() {
    const { register } = useRootStore().authStore;
    const { t } = useTranslation();
    const navigation = useNavigate();
    const { toglevisible, visible } = useRootStore().visibleStore;
    console.log("visible", toJS(visible.showPass));

    const validate = yup.object({
        username: yup
            .string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
        email: yup
            .string()
            .trim()
            .required(`${t("error_message_email_req")}`)
            .email(`${t("error_message_email_form")}`),
        password: yup
            .string()
            .trim()
            .required(`${t("error_message_password_req")}`)
            .min(8, `${t("error_message_password_min")}`)
            .matches(Regex.Password, `${t("error_message_password_regex")}`),
        passwordConfirm: yup
            .string()
            .oneOf([yup.ref("password"), ""], "Password must match")
            .required("Confirm password is required"),
    });

    return (
        <div className={styles.CreateAnAccount}>
            <Header
                text={`${t("sign_up_header")}`}
                leftIcon="arrowLeft"
                onLeftIconPress={() => navigation("/auth/welcome")}
            />
            <div className={styles.CreateAnAccountBox}>
                <div className={styles.CreateAnAccountContent}>
                    <Formik
                        initialValues={{
                            username: "",
                            email: "",
                            password: "",
                            passwordConfirm: "",
                        }}
                        validationSchema={validate}
                        onSubmit={(value) => register(value)}
                    >
                        {(formik) => (
                            <div className={styles.formBox}>
                                <Form>
                                    <TextFieldd
                                        name="username"
                                        type="text"
                                        placeholder="Your username"
                                        icon={<UserIcon />}
                                    />
                                    <TextFieldd
                                        name="email"
                                        type="email"
                                        placeholder="Your email"
                                        icon={<EmailIcon />}
                                    />
                                    <TextFieldd
                                        name="password"
                                        placeholder="Your password"
                                        type={
                                            visible.showPass
                                                ? "text"
                                                : "password"
                                        }
                                        visibility={true}
                                        showClick={() =>
                                            toglevisible("showPass")
                                        }
                                        icon={<PasswordIcon />}
                                    />
                                    <TextFieldd
                                        name="passwordConfirm"
                                        placeholder="Password confirm"
                                        type={
                                            visible.showPass
                                                ? "text"
                                                : "password"
                                        }
                                        visibility={true}
                                        showClick={() =>
                                            toglevisible("showPass")
                                        }
                                        icon={<PasswordIcon />}
                                    />
                                    <ButtonComponent
                                        type={"submit"}
                                        width="100%"
                                        text="Registration"
                                        height="45px"
                                    />
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
                <Text
                    children={t("or sign up with")}
                    color={Colors.Black}
                    fontFamily="Montserrat3"
                    fontSize="14px"
                    margin="50px 0 50px 0"
                />
                <div className={styles.socialContent}>
                    <SocialBtn
                        icon={<FacebookIcon />}
                        title={`${t("login_fb")}`}
                        // onClick={handleFacebookLogin}
                    />
                    <SocialBtn
                        icon={<GoogleIcon />}
                        title={`${t("login_google")}`}
                        margin="20px 0 0 0"
                        // onClick={handleGoogleSignIn}
                    />
                </div>
            </div>
        </div>
    );
}

export default observer(SignUp);
