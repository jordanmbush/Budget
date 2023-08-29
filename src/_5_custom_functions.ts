/**
 * @param {string} date
 * @param {string} description
 * @returns {number}
 * @customFunction
 */
function GET_BUDGET_ITEM(date: string, ...descriptions: string[]): number {
  if (descriptions.length > 1) {
    return descriptions.reduce((total, description) => {
      return total + GET_BUDGET_ITEM(date, description);
    }, 0);
  }

  const description = descriptions[0];

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
  const frequency = frequencyCell.getValue() as string;
  const dateCell = AccountsTableDate.getCell(accountRowIndex - tableRowOffset, 1);
  const daysInterVal = AccountsTableDaysInterval.getCell(
    accountRowIndex - tableRowOffset,
    1
  ).getValue();
  const amountCell = AccountsTableAmount.getCell(accountRowIndex - tableRowOffset, 1);

  return isDateInFrequency(date, frequency, dateCell.getValue(), daysInterVal)
    ? amountCell.getValue()
    : 0;
}

/**
 * @param {string} date
 * @customFunction
 */
function GET_DAILY_EXPENSES(date: string) {
  const amount = AccountsTableDescription.getValues().reduce((totalExpenses, row) => {
    return (
      row.reduce((subTotal, description) => {
        if (!description || description.toLowerCase().includes("income")) {
          return 0;
        }
        return subTotal + GET_BUDGET_ITEM(date, description);
      }, 0) + totalExpenses
    );
  }, 0);

  return amount;
}

/**
 * @param {string} date
 * @customFunction
 */
function GET_INCOME_FOR_DAY(date: string) {
  const amount = AccountsTableDescription.getValues().reduce((totalExpenses, row) => {
    return (
      row.reduce((subTotal, description) => {
        if (description.toLowerCase().includes("income")) {
          return subTotal + GET_BUDGET_ITEM(date, description);
        }

        return 0;
      }, 0) + totalExpenses
    );
  }, 0);

  return amount;
}
