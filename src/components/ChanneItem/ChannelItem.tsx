import { CSSProperties, FC } from "react";
import Avatar from "../Avatar";
// import { TMP_URL } from "../../../env";
// import styles from "./index.module.css";
import { useTranslation } from "react-i18next";
import { Channel } from "../../types/channel";

interface Props {
  text?: string;
  imageUrl?: string;
  color?: string;
  item: any;
  onPress?: (hashId: string) => void;
  style?: CSSProperties;
  number?: number;
  natification?: any
}

const ChannelRowItem: FC<Props> = ({
  text,
  imageUrl,
  color,
  style,
  item,
  onPress,
  number,
  natification
}) => {
  const { t } = useTranslation();

  const messageTimestamp = item.lastMessageTimestamp;

  return (
    <div onClick={() => onPress && onPress(item?.hashId || "")}>
      <Avatar
        text={text}
        url={imageUrl}
        color={color}
        natification={natification}
        number={2334}
        onPreview={() => onPress && onPress(item?.hashId || "")}
        large
        style={{
          cursor: "pointer",
          backgroundBlendMode: "darken",
        }}
        loading={false}
      />
    </div>
  );
};

export default ChannelRowItem;
