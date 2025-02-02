import { DataObject } from '../types';
import { Hashtag } from '../types/channel';

export const hashtagExists = (text: string, hashtags: Hashtag[]) => {
    if (text !== '') {
        for (let i = 0; i < hashtags.length; i++) {
            if (hashtags[i].text === text) {
                return true;
            }
        }
    }
    return false;
};

export function extractHourMinute(dateTimeString: Date) {
    // Convert the provided date string to a Date object
    const dateTime = new Date(dateTimeString);

    // Get the hour and minute components from the Date object
    const hour = dateTime.getUTCHours();
    const minute = dateTime.getUTCMinutes();

    return `${hour}:${minute}`;
}

export const parseJsonData = (jsonData: string): DataObject => {
    try {
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('JSON parsing error:', error);
        return {};
    }
};
