function getDateAsIsoDateString_(date: Date) {
  return (
    `${date.getFullYear()}-` +
    `${`0${date.getMonth() + 1}`.slice(-2)}-` +
    `${`0${date.getDate()}`.slice(-2)}`
  );
}

const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;
