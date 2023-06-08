import React, { CSSProperties, FC, useState } from "react";
import styles from "./switch.module.css";

interface Props {
  switchValue?: boolean;
  title?: string;
  style?: CSSProperties;
  onText?: string;
  offText?: string;
  onOpen?: string;
  offOpen?: string;
  isPrivate: (e: boolean) => void;
}

const SimpleSwitch: FC<Props> = ({
  switchValue,
  title,
  onText,
  offText,
  onOpen,
  offOpen,
  isPrivate,
}) => {
  const [isToggled, setIsToggled] = useState(switchValue);
  const onToggled = () => setIsToggled(!isToggled);

  return (
    <>
      <p style={{ fontSize: "14px", fontFamily: "Montserrat5" }}>
        {title} <span>{isToggled ? onOpen : offOpen}</span>
      </p>
      <label className={styles.toggleSwitch}>
        <input
          type="checkbox"
          checked={isToggled}
          onClick={onToggled}
          onChange={(e) => isPrivate(e.target.checked)}
        />
        <span className={styles.switch} />
      </label>
      <p className={styles.modifyText}>{isToggled ? onText : offText}</p>
    </>
  );
};

export default SimpleSwitch;
