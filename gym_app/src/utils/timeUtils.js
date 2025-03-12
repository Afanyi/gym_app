// timeUtils.js
export const calculateElapsedSeconds = (startTime) => {
    const now = new Date();
    return Math.floor((now - new Date(startTime)) / 1000);
};

/**
 * Formats elapsed time given in seconds into a string in HH:MM:SS format.
 * @param {number} seconds - The total number of seconds elapsed.
 * @returns {string} - The formatted time string.
 */
export const formatElapsedTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const calculateElapsedTimeInHours = (startTime) => {
    const elapsedTimeInMilliseconds = new Date() - new Date(startTime);
    return parseFloat((elapsedTimeInMilliseconds / (1000 * 60 * 60)).toFixed(4));
};