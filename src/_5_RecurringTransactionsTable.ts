type Frequency = keyof typeof FREQUENCY_TYPE;
type DescriptionCell = string;
type AmountCell = number;
type FrequencyCell = Frequency;
type DateCell = string;
type DaysCell = number;

type AccountRecordRow = [DescriptionCell, AmountCell, FrequencyCell, DateCell, DaysCell];

type AccountTableData = AccountRecordRow[];
const ColumnKeys = ["description", "amount", "frequency", "date", "days"] as const;

type ColumnKey = (typeof ColumnKeys)[number];
type AccountRecord = {
  amount: number;
  date: string;
  days: number;
  description: string;
  frequency: Frequency;
};

/**
 * @returns {RecurringTransactionsTable}
 */
class RecurringTransactionsTable {
  tableData: AccountTableData;

  constructor() {
    this.tableData = RecurringTransactionsTable.getTableData();
  }

  static getTableData() {
    const tableData: AccountTableData = RecurringTransactionsRange.getValues() as AccountTableData;
    return tableData;
  }

  getTransactionRecordIndex(description: string) {
    const descriptions = this.getTransactionsColumnData("description");
    return descriptions.indexOf(description);
  }

  geTransactionDataByIndex(index: number) {
    const recordRow = this.tableData[index];
    const [description, amount, frequency, date, days] = recordRow;
    return { amount, date, days, description, frequency } as AccountRecord;
  }

  getTransactionsColumnData(columnName: ColumnKey) {
    return this.tableData.map((row) => {
      const columnIndex = ColumnKeys.indexOf(columnName);
      const columnCell = row[columnIndex];
      return columnCell;
    });
  }

  static isSingleCell(range: GoogleAppsScript.Spreadsheet.Range) {
    return range.getNumColumns() === 1 && range.getNumRows() === 1;
  }
}

const RecurringTransactionsTableInstance = new RecurringTransactionsTable();
