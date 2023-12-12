
import { RawMessage } from "../types/channel";

export const relevanceFuniction = (message: RawMessage) => {
  const relevenceStyle = {
    relevance0_9: {
      boxShadow: `4px 4px 24px 0px ${message?.color}`,
      fontSize: "10px",
      fontWeight: 400,
      lineHeight: '14px'
    },
    relevance10_19: {
      boxShadow: `4px 4px 32px 0px ${message?.color}`,
      fontSize: "10px",
      fontWeight: 500,
      lineHeight: '14px'
    },
    relevance20_29: {
      boxShadow: `4px 8px 40px 0px ${message?.color}`,
      fontSize: "10px",
      fontWeight: 500,
      lineHeight: '14px'
    },
    relevance30_39: {
      boxShadow: `8px 12px 48px 0px ${message?.color}`,
      fontSize: "12px",
      fontWeight: 500,
      lineHeight: '17px'
    },
    relevance40_49: {
      boxShadow: `8px 12px 56px 0px ${message?.color}`,
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: '20px'
    },
    relevance50_59: {
      boxShadow: `8px 16px 64px 0px ${message?.color}`,
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: '20px'
    },
    relevance60_69: {
      boxShadow: `8px 16px 72px 2px ${message?.color}`,
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: '22px'
    },
    relevance70_79: {
      boxShadow: `8px 16px 80px 8px ${message?.color}`,
      fontSize: "16px",
      fontWeight: 700,
      lineHeight: '22px'
    },
    relevance80_89: {
      boxShadow: `12px 20px 88px 16px ${message?.color}`,
      fontSize: "18px",
      fontWeight: 700,
      lineHeight: '25px'
    },
    relevance90_99: {
      boxShadow: `16px 24px 96px 24px ${message?.color}`,
      fontSize: "18px",
      fontWeight: 800,
      lineHeight: '25px'
    },
    relevance100: {
      boxShadow: `16px 24px 96px 32px ${message?.color}`,
      fontSize: "18px",
      fontWeight: 900,
      lineHeight: '25px'
    }
  };

  const messageRelevace = message?.relevance || 0
  
  switch (true) {
    case messageRelevace === 100:
      return relevenceStyle.relevance100;
    case messageRelevace <= 99 && messageRelevace >= 90:
      return relevenceStyle.relevance90_99;
    case messageRelevace <= 89 && messageRelevace >= 80:
      return relevenceStyle.relevance80_89
    case messageRelevace <= 79 && messageRelevace >= 70:
      return relevenceStyle.relevance70_79;
    case messageRelevace <= 69 && messageRelevace >= 60:
      return relevenceStyle.relevance60_69;
    case messageRelevace <= 59 && messageRelevace >= 50:
      return relevenceStyle.relevance50_59;
    case messageRelevace <= 49 && messageRelevace >= 40:
      return relevenceStyle.relevance40_49;
    case messageRelevace <= 39 && messageRelevace >= 30:
      return relevenceStyle.relevance30_39;
    case messageRelevace <= 29 && messageRelevace >= 20:
      return relevenceStyle.relevance20_29;
    case messageRelevace <= 19 && messageRelevace >= 10:
      return relevenceStyle.relevance10_19;
    default:
      return relevenceStyle.relevance0_9;
  }
};

export const lightenColor = (color:string) => {
  // Ensure the input color starts with '#'
  color = color.startsWith('#') ? color : '#' + color;

  // Parse the input color to get RGB values
  var r = parseInt(color.slice(1, 3), 16);
  var g = parseInt(color.slice(3, 5), 16);
  var b = parseInt(color.slice(5, 7), 16);

  // Calculate new RGB values by adding a percentage of white
  r = Math.round(r + (255 - r) * (67 / 100));
  g = Math.round(g + (255 - g) * (67 / 100));
  b = Math.round(b + (255 - b) * (67 / 100));

  // Format the new RGB values back to a hex color
  var newColor =
    '#' +
    (r < 16 ? '0' : '') +
    r.toString(16) +
    (g < 16 ? '0' : '') +
    g.toString(16) +
    (b < 16 ? '0' : '') +
    b.toString(16);

  return newColor;
}