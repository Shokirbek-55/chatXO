import { FC } from "react";
import styles from "./index.module.css";

interface Props {
  onClickButton?: () => void;
  accept?: "image/*" | "video/*" | "audio/*" | "application/*" | string;
  onChange?: (e: any) => void;
  children: any;
}

const ToolbarIcon: FC<Props> = ({
  onClickButton = () => {},
  accept,
  onChange,
  children,
}) => {
  const checkInput = (e: any) => {
    if (e === null || e === undefined) {
      console.log("error");
      return;
    }
    onChange && onChange(e);
  };

  return (
    <>
      {!!accept ? (
        <label className={styles.container}>
          {children}
          <input
            type="file"
            accept={accept}
            style={{ display: "none" }}
            onChange={(e: any) => {
              checkInput(e.target?.files[0]);
            }}
          />
        </label>
      ) : (
        <div className={styles.container} onClick={onClickButton}>
          {children}
        </div>
      )}
    </>
  );
};

export default ToolbarIcon;
