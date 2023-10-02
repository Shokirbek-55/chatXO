import React from "react";
import { ErrorMessage, useField } from "formik";
import styles from "./TextField.module.css";
import { BiHide, BiShow } from "react-icons/bi";
import useRootStore from "../../hooks/useRootStore";
import { observer } from "mobx-react-lite";

const TextFieldd = ({ label, onClick, ...props }: any) => {
    const [field, meta] = useField(props);
    const { visible } = useRootStore().visibleStore;

    return (
        <div className={styles.textFieldContainer}>
            <label className={styles.label} htmlFor={field.name}>
                {label}
            </label>
            <div className={styles.passwordInput}>
                <input
                    className={`${styles.validationInput} ${
                        meta.touched && meta.error && styles.isInValid
                    }`}
                    {...field}
                    {...props}
                    autoComplete="off"
                />
                {props.visibility ? (
                    visible.showPass ? (
                        <BiShow className={styles.showHide} onClick={onClick} />
                    ) : (
                        <BiHide className={styles.showHide} onClick={onClick} />
                    )
                ) : null}
            </div>
            {/* @ts-ignore */}
            <ErrorMessage
                component="div"
                name={field.name}
                className={styles.error}
            />
        </div>
    );
};

export default observer(TextFieldd);
