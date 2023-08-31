const calculateExpensesForActiveRange = () => {
  const a1Notation = SpreadSheet.getActiveRange()?.getA1Notation();
  const dateRange = SpreadSheet.getRangeByName(NAMED_RANGES.DATE_COLUMN);
  const billRange = SpreadSheet.getActiveRange();

  const datesForSelectedExpenseRows = billRange?.offset(
    0,
    (dateRange?.getColumn() || 0) - (billRange.getColumn() || 0)
  );

  try {
    const expenseData = datesForSelectedExpenseRows?.getValues()?.map(([date]) => {
      return GET_DAILY_EXPENSES(date);
    });

    const expenseValues = expenseData?.map((data) => {
      return [data.amount];
    });
    const notes = expenseData?.map((data) => {
      return [data.note];
    });

    billRange?.setValues(expenseValues || []);
    billRange?.setNotes(notes || []);
  } catch (error) {
    return (error as Error).message;
  }

  return a1Notation;
};

const calculateIncomeForActiveRange = () => {
  const a1Notation = SpreadSheet.getActiveRange()?.getA1Notation();
  const dateRange = SpreadSheet.getRangeByName(NAMED_RANGES.DATE_COLUMN);
  const incomeRange = SpreadSheet.getActiveRange();

  const datesForSelectedIncomeRows = incomeRange?.offset(
    0,
    (dateRange?.getColumn() || 0) - (incomeRange.getColumn() || 0)
  );

  try {
    const incomeData = datesForSelectedIncomeRows?.getValues()?.map(([date]) => {
      return GET_INCOME_FOR_DAY(date);
    });

    const incomeValues = incomeData?.map((data) => {
      return [data.amount];
    });
    const notes = incomeData?.map((data) => {
      return [data.note];
    });

    incomeRange?.setValues(incomeValues || []);
    incomeRange?.setNotes(notes || []);
  } catch (error) {
    return (error as Error).message;
  }

  return a1Notation;
};
