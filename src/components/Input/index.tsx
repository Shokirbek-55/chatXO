import { FC, CSSProperties } from "react";
import { Search } from "react-router-dom";
import styles from "./index.module.css";

interface Props {
  placeholder?: string;
  style?: CSSProperties;
  borderred?: boolean;
  setUserName?: (e: string) => void;
  value?: string;
  name?: string;
  onChange?: any;
  type?: Search;
}

const Input: FC<Props> = ({
  style = {},
  placeholder,
  borderred,
  setUserName,
  value,
  name,
  onChange,
  type,
}) => (
  <input
    onChange={(e) => setUserName && setUserName(e.target.value)}
    placeholder={placeholder}
    type={type}
    style={{
      ...style,
    }}
    value={value}
    name={name}
    className={borderred ? styles.borderred : styles.NotBorderred}
  />
);

export default Input;
