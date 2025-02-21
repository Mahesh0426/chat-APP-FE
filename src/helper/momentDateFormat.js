import moment from "moment";

export const formatDate = (date) => {
  const now = moment().startOf("day");
  const msgDate = moment(date).startOf("day");
  const diffDays = now.diff(msgDate, "days");

  if (diffDays === 0) {
    // Today -> Show time (e.g., "12:34 PM")
    return moment(date).format("hh:mm A");
  } else if (diffDays === 1) {
    // Yesterday
    return "Yesterday";
  } else if (diffDays < 7) {
    // Within the last week -> Show day name (e.g., "Monday")
    return moment(date).format("dddd");
  } else {
    // Older than a week -> Show date (e.g., "23/2/2025")
    return moment(date).format("D/M/YYYY");
  }
};
