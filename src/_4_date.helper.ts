function getDateAsIsoDateString_(date: Date) {
  return (
    `${date.getFullYear()}-` +
    `${`0${date.getMonth() + 1}`.slice(-2)}-` +
    `${`0${date.getDate()}`.slice(-2)}`
  );
}

const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;
const getDiffInDays = (date1: Date, date2: Date) =>
  Math.abs((date1.getTime() - date2.getTime()) / MILLISECONDS_IN_DAY);

function isDateInFrequency(
  dateStr: string,
  frequency: Frequency,
  checkDateStr: string,
  interval?: number
) {
  if (!dateStr) {
    return false; // Return false if dateStr is null or undefined
  }

  const date = new Date(dateStr);
  const checkDate = new Date(checkDateStr);

  switch (frequency) {
    case FREQUENCY_TYPE.DAYS:
      return getDiffInDays(date, checkDate) % Number(interval) === 0;

    case FREQUENCY_TYPE.WEEKLY:
      return date.getDay() === checkDate.getDay();

    case FREQUENCY_TYPE.BI_WEEKLY:
      return getDiffInDays(date, checkDate) % 14 === 0;

    case FREQUENCY_TYPE.BI_MONTHLY:
      return (
        date.getDate() === checkDate.getDate() && date.getMonth() % 2 === checkDate.getMonth() % 2
      );

    case FREQUENCY_TYPE.MONTHLY:
      return date.getDate() === checkDate.getDate();

    case FREQUENCY_TYPE.QUARTERLY:
      return (
        date.getDate() === checkDate.getDate() &&
        Math.abs(date.getMonth() - checkDate.getMonth()) % 3 === 0
      );

    case FREQUENCY_TYPE.ANNUALLY:
      return (
        getDateAsIsoDateString_(date).substring(0, 7) ===
        getDateAsIsoDateString_(checkDate).substring(0, 7)
      );

    case FREQUENCY_TYPE.LAST_DAY_OF_MONTH:
      const nextDay = new Date(dateStr);
      nextDay.setDate(nextDay.getDate() + 1);

      return nextDay.getMonth() !== date.getMonth();

    default:
      return false;
  }
}
