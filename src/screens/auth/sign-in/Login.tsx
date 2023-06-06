import TextFieldd from '../../../components/TextField/TextField'

import { Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import * as yup from "yup"
import Header from '../../../components/Header/Header'
import useRootStore from '../../../hooks/useRootStore'
import Colors from '../../../utils/colors'
import Regex from '../../../utils/regax'
import Assets from '../../../utils/requireAssets'
import styles from "./Login.module.css"

const Login = () => {

  const { loginEmailWithPassword } = useRootStore().authStore
  const navigation = useNavigate()
  const { t } = useTranslation()
 
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
                loginEmailWithPassword(values)
              }}
            >
              {(formik) => (
                <div>
                  <Form>
                    <TextFieldd label="Email" name="email" type="email" />
                    <TextFieldd
                      label="Password"
                      name="password"
                      type="password"
                    />
                    <div className={styles.forgotBox}>
                      <a style={{
                        color: Colors.Blue,
                      }} onClick={() => navigation("")}>{t("forgot_pass")}</a>
                    </div>
                    <button
                      type="submit"
                      className={styles.SignUpBtn}
                      style={{
                        background: Colors.Blue,
                      }}
                      onClick={() => navigation("/")}
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
  )
}

export default observer(Login)