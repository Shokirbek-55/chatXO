import React, { CSSProperties, FC, useState } from "react";
import { useTranslation } from "react-i18next";
import Text from "../Text/Text";
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
  const [isToggled, setIsToggled] = useState(!!switchValue);
  const onToggled = () => setIsToggled(!isToggled);
  const { t } = useTranslation();
  return (
    <>
      <div className={styles.header}>
        <Text children={t("type_group")} />
        <p
          style={{
            fontSize: "16px",
            fontFamily: "Montserrat",
            fontWeight: 800,
          }}
        >
          {title} <span>{isToggled ? onOpen : offOpen}</span>
        </p>
      </div>
      <label className={styles.toggleSwitch}>
        <input
          type="checkbox"
          checked={isToggled}
          onClick={onToggled}
          onChange={(e) => isPrivate(e.currentTarget.checked)}
        />
        <span className={styles.switch} />
      </label>
      <p className={styles.modifyText}>{isToggled ? onText : offText}</p>
    </>
  );
};

export default SimpleSwitch;
