import React, { FC } from "react";
import styles from "./index.module.css";
import Text from "../Text/Text";

interface Props {
  onClick?: () => void;
  selected?: boolean;
  children: any;
  style?: any;
}
const RadioButton: FC<Props> = ({ onClick, selected, children, style }) => {
  return (
    <div
      onClick={onClick}
      className={!selected ? styles.radioButtonContainer : styles.afterVote}
    >
      <div className={styles.radioButton}>
        {selected && <div className={styles.radioButtonIcon} />}
      </div>
      <div className={styles.clickableArea}>
        <Text style={{ fontWeight: selected ? "bold" : "normal" }}>
          {children}
        </Text>
      </div>
    </div>
  );
};

export default RadioButton;
