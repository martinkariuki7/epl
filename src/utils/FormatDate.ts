/**
 * Format date: source: ChatGPT
 * @param dateString
 * @returns new date format 'Day, date, month'
 */
const formatDate = (dateString: string) => {
  const year = parseInt(dateString.substring(0, 4));
  const month = parseInt(dateString.substring(4, 6)) - 1;
  const day = parseInt(dateString.substring(6, 8));
  const date = new Date(year, month, day);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "long",
  } as Intl.DateTimeFormatOptions; // Use type assertion to specify the type of options
  return date.toLocaleString("en-US", options);
};

export { formatDate };
