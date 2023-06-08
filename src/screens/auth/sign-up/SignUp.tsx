import React from 'react'
import { useTranslation } from 'react-i18next';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import styles from "./SignUp.module.css"
import TextFieldd from '../../../components/TextField/TextField';
import { Form, Formik } from 'formik';
import Colors from '../../../utils/colors';
import Regex from '../../../utils/regax';
import Header from '../../../components/Header/Header';
import useRootStore from '../../../hooks/useRootStore';

function SignUp() {

  const {register} = useRootStore().authStore
  const { t } = useTranslation();
  const navigation = useNavigate()

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
      <Header text={`${t("sign_up_header")}`} leftIcon="arrowLeft" onLeftIconPress={() => navigation("/auth/sign-up-social")} />
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
                  <TextFieldd label="User Name" name="username" type="text" />
                  <TextFieldd label="Email" name="email" type="email" />
                  <TextFieldd
                    label="Password"
                    name="password"
                    type="password"
                  />
                  <TextFieldd
                    label="Confirm Password"
                    name="passwordConfirm"
                    type="password"
                  />
                  <button
                    type="submit"
                    className={styles.SignUpBtn}
                    style={{ background: Colors.Blue }}
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
  )
}

export default SignUp;