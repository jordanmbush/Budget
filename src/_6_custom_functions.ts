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

  const accountRowIndex =
    RecurringTransactionsTableInstance.getTransactionRecordIndex(inputDescription);
  const { amount, date, days, frequency } =
    RecurringTransactionsTableInstance.geTransactionDataByIndex(accountRowIndex);

  return isDateInFrequency(inputDate, frequency, date, days) ? amount : 0;
}

/**
 * @param {string} inputDate
 * @customFunction
 */
function GET_DAILY_EXPENSES(inputDate: string) {
  const descriptions = RecurringTransactionsTableInstance.getTransactionsColumnData(
    "description"
  ) as string[];
  const notes: string[] = [];
  const amount = descriptions.reduce((totalExpenses, description) => {
    if (!description || description.toLowerCase().includes("income")) {
      return totalExpenses;
    }
    const expenseAmount = GET_BUDGET_ITEM(inputDate, description);
    expenseAmount !== 0 && notes.push(`${description}: ${currencyFormatter.format(expenseAmount)}`);
    return totalExpenses + expenseAmount;
  }, 0);

  return { amount, note: notes.join("\n") };
}

/**
 * @param {string} inputDate
 * @customFunction
 */
function GET_INCOME_FOR_DAY(inputDate: string) {
  const descriptions = RecurringTransactionsTableInstance.getTransactionsColumnData(
    "description"
  ) as string[];
  const notes: string[] = [];
  const amount = descriptions.reduce((totalExpenses, description) => {
    if (description && description.toLowerCase().includes("income")) {
      const incomeAmount = GET_BUDGET_ITEM(inputDate, description);
      incomeAmount !== 0 && notes.push(`${description}: ${currencyFormatter.format(incomeAmount)}`);
      return totalExpenses + incomeAmount;
    }
    return totalExpenses;
  }, 0);

  return { amount, note: notes.join("\n") };
}
