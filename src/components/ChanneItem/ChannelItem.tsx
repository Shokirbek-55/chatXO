import { motion } from "framer-motion";
import { CSSProperties, FC } from "react";
import ChannelAvatar from "../ChannelAvatar/channelAvatar";

interface Props {
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

  return (
    <motion.div
      id="map-dev"
      initial={{ scale: 1 }}
      onClick={() => onPress && onPress(item?.hashId || "")}>
      <ChannelAvatar
        name={name}
        imageUrl={imageUrl}
        color={color ? color : "linear-gradient(#ddd, #666)"}
        time={"2334"}
      />
    </motion.div>
  );
};

export default ChannelRowItem;
