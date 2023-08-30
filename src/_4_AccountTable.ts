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
 * @returns {AccountTable}
 */
class AccountTable {
  tableData: AccountTableData;

  constructor() {
    this.tableData = AccountTable.getAccountsTableData();
  }

  static getAccountsTableData() {
    const tableData: AccountTableData = AccountsTableRange.getValues() as AccountTableData;
    return tableData;
  }

  getAccountRecordIndex(description: string) {
    const descriptions = this.getDataByColumn("description");
    return descriptions.indexOf(description);
  }

  getRecordDataByIndex(index: number) {
    const recordRow = this.tableData[index];
    const [description, amount, frequency, date, days] = recordRow;
    return { amount, date, days, description, frequency } as AccountRecord;
  }

  getDataByColumn(columnName: ColumnKey) {
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
