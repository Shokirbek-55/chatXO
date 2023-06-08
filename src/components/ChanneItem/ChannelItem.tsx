import { CSSProperties, FC } from "react";
import { useTranslation } from "react-i18next";
import { Channel } from "../../types/channel";
import ChannelAvatar from "../ChannelAvatar/channelAvatar";

interface Props {
  text?: string;
  imageUrl?: string;
  color?: string;
  item: any;
  onPress?: (hashId: string) => void;
  style?: CSSProperties;
  number?: number;
  natification?: any;
  name?: string;
}

const ChannelRowItem: FC<Props> = ({
  name,
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
      <ChannelAvatar
        name={name}
        imageUrl={imageUrl}
        color={color ? color : "linear-gradient(#ddd, #666)"}
        time={"2334"}
      />
    </div>
  );
};

export default ChannelRowItem;
