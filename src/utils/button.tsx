import React from "react";
import {
  AdminAddIcon,
  BsFillPersonPlusFillIcon,
  DeleteIcon,
  MdGroupAddIcon,
  PasswordIcon,
  SettingIcon,
  UpdateIcon,
} from "./icons";
import styles from "./index.module.css";

interface Buttun {
  text?: string;
  textSize?: number;
  padding?: string;
  color?: string;
  backColor?: string;
  radius?: number;
  icon?: string;
  iconColor?: string;
  iconSize?: number;
  clickMe?: () => void;
  width?: string;
  height?: string;
}

export const ButtonComponent = ({
  text,
  textSize = 14,
  padding = "5px 15px",
  color = "#fff",
  backColor = "dodgerblue",
  radius = 8,
  icon,
  iconColor = "#fff",
  iconSize = 16,
  clickMe,
  width = "48%",
  height = "35px",
}: Buttun) => {
  return (
    <div
      onClick={clickMe}
      className={styles.buttonHoverAndActive}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: `${textSize}px`,
        color: `${color}`,
        backgroundColor: `${backColor}`,
        padding: `${padding}`,
        borderRadius: `${radius}px`,
        cursor: "pointer",
        width: `${width}`,
        height: `${height}`,
      }}
    >
      {icon === "admin" ? (
        <MdGroupAddIcon
          hoverActive={false}
          color={iconColor}
          size={iconSize}
          padding={8}
        />
      ) : icon === "delete" ? (
        <DeleteIcon
          hoverActive={false}
          color={iconColor}
          size={iconSize}
          padding={8}
        />
      ) : icon === "new" ? (
        <BsFillPersonPlusFillIcon
          hoverActive={false}
          color={iconColor}
          size={iconSize}
          padding={8}
        />
      ) : icon === "password" ? (
        <PasswordIcon
          hoverActive={false}
          color={iconColor}
          size={iconSize}
          padding={8}
        />
      ) : icon === "update" ? (
        <UpdateIcon
          hoverActive={false}
          color={iconColor}
          size={iconSize}
          padding={8}
        />
      ) : icon === "adminPlus" ? (
        <AdminAddIcon
          hoverActive={false}
          color={iconColor}
          size={iconSize}
          padding={8}
        />
      ) : (
        <div></div>
      )}
      {text}
    </div>
  );
};
