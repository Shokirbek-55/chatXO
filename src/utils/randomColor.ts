import Colors from "./colors";

export const getRandomColor = () => {
  const letters = [
    "#CDE4CF",
    "#FFBCBC",
    "#FAF0AF",
    "#056676",
    "#745C97",
    "#F5B17B",
  ];
  return letters[Math.floor(Math.random() * letters.length)];
};

export const setLighterColor = (color: string, amount: number) => {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2),
      )
  );
};

export const checkColorAndSetDefault = (color?: string) => {
  return color ? color : Colors.DoveGray;
};

export const generateGradientColors = (color?: string) => {
  return [
    setLighterColor(checkColorAndSetDefault(color), 120),
    checkColorAndSetDefault(color),
  ];
};
