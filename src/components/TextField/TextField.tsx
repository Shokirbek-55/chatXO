import React from "react";
import { ErrorMessage, useField } from "formik";
import styles from "./TextField.module.css";

const TextFieldd = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.textFieldContainer}>
      <label className={styles.label} htmlFor={field.name}>{label}</label>
      <input
        className={`${styles.validationInput} ${meta.touched && meta.error && styles.isInValid
          }`}
        {...field}
        {...props}
        autoComplete="off"
      />
      {/* @ts-ignore */}
      <ErrorMessage
        component="div"
        name={field.name}
        className={styles.error}
      />
    </div>
  );
};

export default TextFieldd;