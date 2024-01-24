import { ErrorMessage, useField } from "formik";
import { observer } from "mobx-react-lite";
import { BiHide, BiShow } from "react-icons/bi";
import useRootStore from "../../hooks/useRootStore";
import styles from "./TextField.module.css";

const TextFieldd = ({ label, showClick, icon, ...props }: any) => {
    const [field, meta] = useField(props);
    const { visible } = useRootStore().visibleStore;

    return (
        <div className={styles.textFieldContainer}>
            <label className={styles.label} htmlFor={field.name}>
                {label}
            </label>
            <div className={styles.passwordInput}>
                <div className={styles.iconBox}>{icon}</div>
                <input
                    className={`${styles.validationInput} ${meta.touched && meta.error && styles.isInValid
                        }`}
                    style={{ ...props }}
                    {...field}
                    {...props}
                    autoComplete="off"
                />
                {props.visibility ? (
                    visible.showPass ? (
                        <BiShow
                            className={styles.showHide}
                            onClick={showClick}
                        />
                    ) : (
                        <BiHide
                            className={styles.showHide}
                            onClick={showClick}
                        />
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
