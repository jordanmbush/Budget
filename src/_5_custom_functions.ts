/**
 * @param {string} inputDate
 * @param {Array<string>} descriptions
 * @returns {number}
 * @customFunction
 */
function GET_BUDGET_ITEM(inputDate: string, ...descriptions: string[]): number {
  if (descriptions.length > 1) {
    return descriptions.reduce((total, description) => {
      return total + GET_BUDGET_ITEM(inputDate, description);
    }, 0);
  }

  const inputDescription = descriptions[0];

  if (!isValidDescription(inputDescription)) {
    throw new Error(`Invalid description ${inputDescription} used.`);
  }

  const accountTable = new AccountTable();
  const accountRowIndex = accountTable.getAccountRecordIndex(inputDescription);
  const { amount, date, days, frequency } = accountTable.getRecordDataByIndex(accountRowIndex);

  return isDateInFrequency(inputDate, frequency, date, days) ? amount : 0;
}

/**
 * @param {string} inputDate
 * @customFunction
 */
function GET_DAILY_EXPENSES(inputDate: string) {
  const accountTable = new AccountTable();
  const descriptions = accountTable.getDataByColumn("description") as string[];
  const amount = descriptions.reduce((totalExpenses, description) => {
    if (!description || description.toLowerCase().includes("income")) {
      return totalExpenses;
    }
    return totalExpenses + GET_BUDGET_ITEM(inputDate, description);
  }, 0);

  return amount;
}

/**
 * @param {string} inputDate
 * @customFunction
 */
function GET_INCOME_FOR_DAY(inputDate: string) {
  const accountTable = new AccountTable();
  const descriptions = accountTable.getDataByColumn("description") as string[];
  const amount = descriptions.reduce((totalExpenses, description) => {
    if (description && description.toLowerCase().includes("income")) {
      return totalExpenses + GET_BUDGET_ITEM(inputDate, description);
    }
    return totalExpenses;
  }, 0);

  return amount;
}
