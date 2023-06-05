import React, { CSSProperties, FC } from "react";
import Colors from "../utils/colors";

interface Props {
  width?: number | string;
  height?: number | string;
  src?: string;
  style?: CSSProperties;
  color?: string;
  onClick?: () => void;
}

const Icon: FC<Props> = ({
  width = 30,
  height = 30,
  src = "empty",
  color = Colors.Heather,
  style = {},
  onClick,
}) => (
  <div
    onClick={onClick}
    style={{
      width,
      height,
      backgroundColor: color,
      maskImage: `url(${src})`,
      WebkitMaskImage: `url(${src})`,
      maskPosition: "center",
      WebkitMaskPosition: "center",
      maskSize: "contain",
      WebkitMaskSize: "contain",
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
      ...style,
    }}
  />
);

export default Icon;
