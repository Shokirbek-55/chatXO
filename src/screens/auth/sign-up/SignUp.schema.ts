import * as yup from "yup";
import { getI18n } from "react-i18next";
import Regex from "../../../utils/regax";
const { t } = getI18n();

export const signUpSchema = yup.object({
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
