// import BushRange from "./BushRange";
// import { MILLISECONDS_IN_DAY, getDateAsIsoDateString_ } from "./date.helper";
// import {
//   AccountsTableAmount,
//   AccountsTableDate,
//   AccountsTableDescription,
//   AccountsTableFrequency,
//   FREQUENCY_MAP,
//   FREQUENCY_TYPE,
//   isValidDescription_,
// } from "./helper";

/**
 * @param {string} date
 * @param {string} description
 * @customFunction
 */
function GET_BUDGET_ITEM(date: string, description: string) {
  const inputDate = new Date(date);

  if (!isValidDescription(description)) {
    throw new Error(`Invalid description ${description} used.`);
  }

  const DescriptionRange = new BushRange(
    AccountsTableDescription as GoogleAppsScript.Spreadsheet.Range
  );

  const tableRowOffset = AccountsTableDescription.getCell(1, 1).getRowIndex() - 1;

  const descriptionCell = DescriptionRange.getCellByValue(description);
  const accountRowIndex = descriptionCell?.getRowIndex() || 1;
  const frequencyCell = AccountsTableFrequency.getCell(accountRowIndex - tableRowOffset, 1);
  const amountCell = AccountsTableAmount.getCell(accountRowIndex - tableRowOffset, 1);
  const dateCell = AccountsTableDate.getCell(accountRowIndex - tableRowOffset, 1);

  const accountStartDate = new Date(dateCell.getValue());
  const frequency = frequencyCell.getValue() as string;

  switch (frequency) {
    case FREQUENCY_TYPE["BI-WEEKLY"]:
    case FREQUENCY_TYPE.WEEKLY:
      const diffInDays = Math.abs(
        (inputDate.getTime() - accountStartDate.getTime()) / MILLISECONDS_IN_DAY
      );
      return diffInDays % Number(FREQUENCY_MAP[frequency]) === 0 ? amountCell.getValue() : 0;
      break;
    case FREQUENCY_TYPE.MONTHLY:
      const dayOfMonth = accountStartDate.getDate();
      return inputDate.getDate() === dayOfMonth ? amountCell.getValue() : 0;
      break;
    case FREQUENCY_TYPE.ANUALLY:
      const startDateString = getDateAsIsoDateString_(accountStartDate);
      const inputDateString = getDateAsIsoDateString_(inputDate);
      return startDateString.substring(0, 7) === inputDateString.substring(0, 7)
        ? amountCell.getValue()
        : 0;
  }

  return 0;
}
