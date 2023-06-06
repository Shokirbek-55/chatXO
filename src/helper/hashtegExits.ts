import { Hashtag } from "../types/channel";

const hashtagExists = (text: string, hashtags: Hashtag[]) => {
  if (text !== "") {
    for (let i = 0; i < hashtags.length; i++) {
      if (hashtags[i].text === text) {
        return true;
      }
    }
  }
  return false;
};

export default hashtagExists;
