const calculateExpensesForActiveRange = () => {
  const activeRange = SpreadSheet.getActiveRange();
  const billsRangeRowOffset = BillsRange.getRow();

  if (!activeRange) {
    return "Range not selected";
  }

  const datesForSelectedExpenseRows = ActiveSheet.getRange(
    activeRange?.getRow(),
    DateRange?.getColumn(),
    BillsRange.getNumRows() - activeRange.getRow() + billsRangeRowOffset,
    BillsRange.getNumColumns()
  );

  try {
    const expenseData = datesForSelectedExpenseRows?.getValues()?.map(([date]) => {
      return GET_DAILY_EXPENSES(date);
    });

    const billsRange = ActiveSheet.getRange(
      datesForSelectedExpenseRows.getRow(),
      BillsRange.getColumn(),
      datesForSelectedExpenseRows.getNumRows(),
      BillsRange.getNumColumns()
    );
    billsRange.setValues(expenseData);

    ActiveSheet.setActiveRange(billsRange);
    return billsRange.getA1Notation();
  } catch (error) {
    return (error as Error).message;
  }
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
