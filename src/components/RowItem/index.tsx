import { CSSProperties, FC } from "react";
import { useTranslation } from "react-i18next";
import { SearchIcon } from "../../utils/icons";
import { Channel } from "../../types/channel";
import { Friend } from "../../types/friend";
import Text from "../Text";
import styles from "./index.module.css";
import ButtonView from "../Button";
import AvatarView from "../Avatar";

interface Props {
  item?: Friend;
  groupItem?: Channel;
  text?: any;
  title?: string;
  rightButton?: boolean;
  imageUrl?: string;
  style?: CSSProperties;
  value?: any;
  color?: string;
  loading: boolean;
  uploadAvatar?: boolean;
  onNamePress?: (id: any) => void;
  onGroupPress?: (hashId: string) => void;
  onButtonPress?: () => void;
  onClick?: () => void;
  matches?: any;
  icon?: string;
  className?: any;
}

function chsUser(username: string) {
  if (username.length <= 9) return username;

  return username.slice(0, 10) + "...";
}

const RowItemView: FC<Props> = ({
  item,
  groupItem,
  text,
  rightButton,
  matches,
  style,
  title,
  onNamePress,
  onGroupPress,
  value,
  uploadAvatar,
  onButtonPress,
  loading,
  color,
  imageUrl,
  onClick,
  icon,
  className,
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      {text ? (
        <div
          className={styles.card}
          onClick={() => onGroupPress && onGroupPress(groupItem?.hashId || "")}
        >
          <AvatarView
            style={style}
            upload={uploadAvatar}
            url={imageUrl}
            value={value}
            color={color}
            loading={loading}
          />
          <div
            className={styles.headerTitle}
            onClick={() => onNamePress && onNamePress(item?.id || "")}
          >
            <Text
              style={{
                marginLeft: "5px",
                fontFamily: "Montserrat6",
              }}
              text={chsUser(text)}
            />
            <Text
              style={{
                marginLeft: "5px",
                fontSize: "10px",
                marginTop: "-7px",
              }}
              text={item?.username}
            />
          </div>
        </div>
      ) : null}
      <div className={styles.rightbarBox}>
        {rightButton ? (
          <ButtonView
            rounded
            className={className}
            title={title}
            color="danger"
            onClickbutton={onButtonPress}
            onRefreshbutton={onClick}
          />
        ) : null}
        {icon === "search" ? <SearchIcon size={21} /> : null}
      </div>
    </div>
  );
};

export default RowItemView;
