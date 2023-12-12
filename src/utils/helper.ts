export function extractHourMinute(dateTimeString: Date) {
    // Convert the provided date string to a Date object
    const dateTime = new Date(dateTimeString);

    // Get the hour and minute components from the Date object
    const hour = dateTime.getUTCHours();
    const minute = dateTime.getUTCMinutes();

    return `${hour}:${minute}`
}