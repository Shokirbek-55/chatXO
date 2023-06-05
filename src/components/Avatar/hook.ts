import { useEffect, useState } from "react";

const randomColors = [
  "#0fbcf9",
  "#ff5e57",
  "#05c46b",
  "#0be881",
  "#ffa801",
  "#fd79a8",
  "#fdcb6e",
  "#55efc4",
  "#badc58",
  "#F8EFBA",
];

export const AvatarHook = () => {
  const [randomColorm, setRandomColor] = useState("");
  useEffect(() => {
    const random = Math.round(Math.random() * 10);
    setRandomColor(randomColors[random]);
  }, []);
  return { randomColorm };
};
