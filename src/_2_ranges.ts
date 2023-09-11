const App = SpreadsheetApp;
const SpreadSheet = App.getActiveSpreadsheet();
const ConfigSheet = SpreadSheet.getSheetByName(SHEETS.CONFIG) as GoogleAppsScript.Spreadsheet.Sheet;
const BudgetSheet = SpreadSheet.getSheetByName(SHEETS.BUDGET) as GoogleAppsScript.Spreadsheet.Sheet;
const ActiveSheet = SpreadSheet.getActiveSheet();

const RecurringTransactionsRange = SpreadSheet.getRangeByName(
  NAMED_RANGES.RECURRING_TRANSACTIONS_TABLE.ENTIRE_TABLE
) as GoogleAppsScript.Spreadsheet.Range;
const TableAmountRange = SpreadSheet.getRangeByName(
  NAMED_RANGES.RECURRING_TRANSACTIONS_TABLE.AMOUNT
) as GoogleAppsScript.Spreadsheet.Range;
const TableDateRange = SpreadSheet.getRangeByName(
  NAMED_RANGES.RECURRING_TRANSACTIONS_TABLE.DATE
) as GoogleAppsScript.Spreadsheet.Range;
const TableDescriptionRange = SpreadSheet.getRangeByName(
  NAMED_RANGES.RECURRING_TRANSACTIONS_TABLE.DESCRIPTION
) as GoogleAppsScript.Spreadsheet.Range;
const TableFrequencyRange = SpreadSheet.getRangeByName(
  NAMED_RANGES.RECURRING_TRANSACTIONS_TABLE.FREQUENCY
) as GoogleAppsScript.Spreadsheet.Range;
const TableDaysIntervalRange = SpreadSheet.getRangeByName(
  NAMED_RANGES.RECURRING_TRANSACTIONS_TABLE.DAYS_INTERVAL
) as GoogleAppsScript.Spreadsheet.Range;
const BillsRange = SpreadSheet.getRangeByName(
  NAMED_RANGES.BILLS
) as GoogleAppsScript.Spreadsheet.Range;
const DateRange = SpreadSheet.getRangeByName(
  NAMED_RANGES.DATE_COLUMN
) as GoogleAppsScript.Spreadsheet.Range;
