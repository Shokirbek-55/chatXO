import { DataObject } from "../types";
import { Hashtag } from "../types/channel";

export const hashtagExists = (text: string, hashtags: Hashtag[]) => {
  if (text !== "") {
    for (let i = 0; i < hashtags.length; i++) {
      if (hashtags[i].text === text) {
        return true;
      }
    }
  }
  return false;
};

export const parseJsonData = (jsonData: string): DataObject => {
  try {
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("JSON parsing error:", error);
    return {};
  }
};

