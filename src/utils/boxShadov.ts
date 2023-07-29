import { message } from 'antd';

import { RawMessage } from "../types/channel";

// export const relevanceFuniction = (message: RawMessage) => {
//   const relevenceOwnStyle = {
//     relevance100: {
//       boxShadow: `-16px 24px 96px 32px ${message?.color}`,
//       fontSize: "18px",
//       fontWeight: "900",
//       lineHeight: "25px",
//     },
//     relevance90: {
//       boxShadow: `-16px 24px 96px 24px ${message?.color}`,
//       fontSize: "18px",
//       fontWeight: "800",
//       lineHeight: "25px",
//     },
//     relevance80: {
//       boxShadow: `-12px 20px 88px 16px ${message?.color}`,
//       fontSize: "18px",
//       fontWeight: "700",
//       lineHeight: "25px",
//     },
//     relevance70: {
//       boxShadow: `-8px 16px 80px 8px ${message?.color}`,
//       fontSize: "16px",
//       fontWeight: "600",
//       lineHeight: "22px",
//     },
//     relevance60: {
//       boxShadow: `-8px 16px 72px 2px ${message?.color}`,
//       fontSize: "16px",
//       fontWeight: "600",
//       lineHeight: "22px",
//     },
//     relevance50: {
//       boxShadow: `-8px 16px 64px 0px ${message?.color}`,
//       fontSize: "14px",
//       fontWeight: "500",
//       lineHeight: "20px",
//     },
//     relevance40: {
//       boxShadow: `-8px 12px 56px 0px ${message?.color}`,
//       fontSize: "14px",
//       fontWeight: "400",
//       lineHeight: "20px",
//     },
//     relevance30: {
//       boxShadow: `-8px 12px 48px 0px ${message?.color}`,
//       fontSize: "12px",
//       fontWeight: "400",
//       lineHeight: "17px",
//     },
//     relevance20: {
//       boxShadow: `-8px 4px 40px 0px ${message?.color}`,
//       fontSize: "10px",
//       fontWeight: "400",
//       lineHeight: "14px",
//     },
//     relevance10: {
//       boxShadow: `-8px 4px 32px 0px ${message?.color}`,
//       fontSize: "10px",
//       fontWeight: "300",
//       lineHeight: "14px",
//     },
//     relevance0: {
//       boxShadow: `-8px 4px 24px 0px ${message?.color}`,
//       fontSize: "10px",
//       fontWeight: "200",
//       lineHeight: "14px",
//     },
//   };
//   const relevenceStyle = {
//     relevance100: {
//       boxShadow: `16px 24px 96px 32px ${message?.color} `,
//       fontSize: "18px",
//       fontWeight: "900",
//       lineHeight: "25px",
//     },
//     relevance90: {
//       boxShadow: `16px 24px 96px 24px ${message?.color}`,
//       fontSize: "18px",
//       fontWeight: "800",
//       lineHeight: "25px",
//     },
//     relevance80: {
//       boxShadow: `12px 20px 88px 16px ${message?.color}`,
//       fontSize: "18px",
//       fontWeight: "700",
//       lineHeight: "25px",
//     },
//     relevance70: {
//       boxShadow: `8px 16px 80px 8px ${message?.color}`,
//       fontSize: "16px",
//       fontWeight: "600",
//       lineHeight: "22px",
//     },
//     relevance60: {
//       boxShadow: `8px 16px 72px 2px ${message?.color}`,
//       fontSize: "16px",
//       fontWeight: "600",
//       lineHeight: "22px",
//     },
//     relevance50: {
//       boxShadow: `8px 16px 64px 0px ${message?.color}`,
//       fontSize: "14px",
//       fontWeight: "500",
//       lineHeight: "20px",
//     },
//     relevance40: {
//       boxShadow: `8px 12px 56px 0px ${message?.color}`,
//       fontSize: "14px",
//       fontWeight: "400",
//       lineHeight: "20px",
//     },
//     relevance30: {
//       boxShadow: `8px 12px 48px 0px ${message?.color}`,
//       fontSize: "12px",
//       fontWeight: "400",
//       lineHeight: "17px",
//     },
//     relevance20: {
//       boxShadow: `8px 4px 40px 0px ${message?.color}`,
//       fontSize: "10px",
//       fontWeight: "400",
//       lineHeight: "14px",
//     },
//     relevance10: {
//       boxShadow: `8px 4px 32px 0px ${message?.color}`,
//       fontSize: "10px",
//       fontWeight: "300",
//       lineHeight: "14px",
//     },
//     relevance0: {
//       boxShadow: `8px 4px 24px 0px ${message?.color}`,
//       fontSize: "10px",
//       fontWeight: "200",
//       lineHeight: "14px",
//     },
//   };

//   const positionMessage = message?.userId === 1

//   const messageRelevace = message?.relevance as number;

//   if (!!positionMessage) {
//     if (messageRelevace <= 100 && messageRelevace > 90) {
//       return relevenceOwnStyle.relevance100;
//     }
//     if (messageRelevace <= 100 && messageRelevace > 90) {
//       return relevenceOwnStyle.relevance90;
//     }
//     if (messageRelevace <= 90 && messageRelevace > 80) {
//       return relevenceOwnStyle.relevance80;
//     }
//     if (messageRelevace <= 80 && messageRelevace > 70) {
//       return relevenceOwnStyle.relevance70;
//     }
//     if (messageRelevace <= 70 && messageRelevace > 60) {
//       return relevenceOwnStyle.relevance60;
//     }
//     if (messageRelevace <= 60 && messageRelevace > 50) {
//       return relevenceOwnStyle.relevance50;
//     }
//     if (messageRelevace <= 50 && messageRelevace > 40) {
//       return relevenceOwnStyle.relevance40;
//     }
//     if (messageRelevace <= 40 && messageRelevace > 30) {
//       return relevenceOwnStyle.relevance30;
//     }
//     if (messageRelevace <= 30 && messageRelevace > 20) {
//       return relevenceOwnStyle.relevance20;
//     }
//     if (messageRelevace <= 20 && messageRelevace > 10) {
//       return relevenceOwnStyle.relevance10;
//     }
//     if (messageRelevace <= 10) {
//       return relevenceOwnStyle.relevance0;
//     }
//   } else {
//     if (messageRelevace <= 100 && messageRelevace > 90) {
//       return relevenceStyle.relevance100;
//     }
//     if (messageRelevace <= 100 && messageRelevace > 90) {
//       return relevenceStyle.relevance90;
//     }
//     if (messageRelevace <= 90 && messageRelevace > 80) {
//       return relevenceStyle.relevance80;
//     }
//     if (messageRelevace <= 80 && messageRelevace > 70) {
//       return relevenceStyle.relevance70;
//     }
//     if (messageRelevace <= 70 && messageRelevace > 60) {
//       return relevenceStyle.relevance60;
//     }
//     if (messageRelevace <= 60 && messageRelevace > 50) {
//       return relevenceStyle.relevance50;
//     }
//     if (messageRelevace <= 50 && messageRelevace > 40) {
//       return relevenceStyle.relevance40;
//     }
//     if (messageRelevace <= 40 && messageRelevace > 30) {
//       return relevenceStyle.relevance30;
//     }
//     if (messageRelevace <= 30 && messageRelevace > 20) {
//       return relevenceStyle.relevance20;
//     }
//     if (messageRelevace <= 20 && messageRelevace > 10) {
//       return relevenceStyle.relevance10;
//     }
//     if (messageRelevace <= 10) {
//       return relevenceStyle.relevance0;
//     }
//   }
// };


export const relevanceFuniction = (message?: RawMessage, relevance?: number) => {
  const relevenceStyle = {
    relevance0_9: {
      boxShadow: `4px 4px 24px 0px ${message?.color}`,
      fontSize: "10px",
      fontWeight: "200",
      lineHeight: '14px'
    },
    relevance10_19: {
      boxShadow: `4px 4px 32px 0px ${message?.color}`,
      fontSize: "10px",
      fontWeight: "300",
      lineHeight: '14px'
    },
    relevance20_29: {
      boxShadow: `4px 8px 40px 0px ${message?.color}`,
      fontSize: "10px",
      fontWeight: "400",
      lineHeight: '14px'
    },
    relevance30_39: {
      boxShadow: `8px 12px 48px 0px ${message?.color}`,
      fontSize: "12px",
      fontWeight: "400",
      lineHeight: '17px'
    },
    relevance40_49: {
      boxShadow: `8px 12px 56px 0px ${message?.color}`,
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: '20px'
    },
    relevance50_59: {
      boxShadow: `8px 16px 64px 0px ${message?.color}`,
      fontSize: "14px",
      fontWeight: "500",
      lineHeight: '20px'
    },
    relevance60_69: {
      boxShadow: `8px 16px 72px 2px ${message?.color}`,
      fontSize: "16px",
      fontWeight: "600",
      lineHeight: '22px'
    },
    relevance70_79: {
      boxShadow: `8px 16px 80px 8px ${message?.color}`,
      fontSize: "16px",
      fontWeight: "700",
      lineHeight: '22px'
    },
    relevance80_89: {
      boxShadow: `12px 20px 88px 16px ${message?.color}`,
      fontSize: "18px",
      fontWeight: "700",
      lineHeight: '25px'
    },
    relevance90_99: {
      boxShadow: `16px 24px 96px 24px ${message?.color}`,
      fontSize: "18px",
      fontWeight: "800",
      lineHeight: '25px'
    },
    relevance100: {
      boxShadow: `16px 24px 96px 32px ${message?.color}`,
      fontSize: "18px",
      fontWeight: "900",
      lineHeight: '25px'
    }
  };

  const messageRelevace = message?.relevance || relevance as number
  
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