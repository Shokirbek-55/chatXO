import React, { CSSProperties, FC } from "react";

import styles from "./index.module.css";
import {
  CoppyIcon,
  EditIcon,
  SearchIcon,
  ShareIcon,
  UsersBlock,
  UsersInfo,
} from "../../utils/icons";

interface Props {
  icon: string;
  text: string;
  textSize?: number;
  iconSize?: number;
  link?: string;
  disable?: boolean;
  onClickItem?: () => void;
  style?: CSSProperties;
}

const ChannelItems: FC<Props> = ({
  text,
  icon,
  link,
  disable,
  iconSize = 18,
  textSize = 15,
  onClickItem,
}) => {
  return (
    <div className={styles.container} onClick={onClickItem}>
      {icon === "share" ? (
        <ShareIcon size={iconSize} hoverActive={false} />
      ) : icon === "copy" ? (
        <CoppyIcon size={iconSize} hoverActive={false} />
      ) : icon === "edit" ? (
        <EditIcon size={iconSize} hoverActive={false} />
      ) : icon === "info" ? (
        <UsersInfo size={iconSize} hoverActive={false} />
      ) : icon === "block" ? (
        <UsersBlock size={iconSize} hoverActive={false} />
      ) : (
        <SearchIcon size={iconSize} hoverActive={false} />
      )}
      <span style={{ fontSize: `${textSize}px` }}>{text}</span>
    </div>
  );
};

export default ChannelItems;
