const App = SpreadsheetApp;
const SpreadSheet = App.getActiveSpreadsheet();
const Sheet = SpreadSheet.getActiveSheet();

const AccountsTableRange = SpreadSheet.getRangeByName(
  NAMED_RANGES.ACCOUNTS_TABLE.ENTIRE_TABLE
) as GoogleAppsScript.Spreadsheet.Range;
const AccountsTableAmount = SpreadSheet.getRangeByName(
  NAMED_RANGES.ACCOUNTS_TABLE.AMOUNT
) as GoogleAppsScript.Spreadsheet.Range;
const AccountsTableDate = SpreadSheet.getRangeByName(
  NAMED_RANGES.ACCOUNTS_TABLE.DATE
) as GoogleAppsScript.Spreadsheet.Range;
const AccountsTableDescription = SpreadSheet.getRangeByName(
  NAMED_RANGES.ACCOUNTS_TABLE.DESCRIPTION
) as GoogleAppsScript.Spreadsheet.Range;
const AccountsTableFrequency = SpreadSheet.getRangeByName(
  NAMED_RANGES.ACCOUNTS_TABLE.FREQUENCY
) as GoogleAppsScript.Spreadsheet.Range;
const AccountsTableDaysInterval = SpreadSheet.getRangeByName(
  NAMED_RANGES.ACCOUNTS_TABLE.DAYS_INTERVAL
) as GoogleAppsScript.Spreadsheet.Range;

type JSRange = Array<Array<any>>;
type SomeCb = (val: any, rowIndex: number, columnIndex: number, range: JSRange) => boolean;

const inRange = (cb: SomeCb) => (row: JSRange, rowIndex: number, range: JSRange) => {
  return row.some((value, columnIndex) => {
    return cb(value, rowIndex, columnIndex, range);
  });
};

const isValidDescription = (description: string) => {
  return AccountsTableDescription?.getValues().some(
    inRange((validDescription) => {
      return description === validDescription;
    })
  );
};

const FREQUENCY_TYPE = {
  ANNUALLY: "ANNUALLY",
  BI_MONTHLY: "BI-MONTHLY",
  BI_WEEKLY: "BI-WEEKLY",
  DAYS: "DAYS",
  LAST_DAY_OF_MONTH: "LAST-DAY-OF-MONTH",
  MONTHLY: "MONTHLY",
  QUARTERLY: "QUARTERLY",
  WEEKLY: "WEEKLY",
};

const FREQUENCY_MAP = {
  [FREQUENCY_TYPE.WEEKLY]: 7,
  [FREQUENCY_TYPE.BI_WEEKLY]: 14,
  [FREQUENCY_TYPE.MONTHLY]: (input: string, check: string) => {
    const inputDate = new Date(input);
    const checkDate = new Date(check);
    return inputDate.getMonth() === checkDate.getMonth();
  },
  [FREQUENCY_TYPE.ANNUALLY]: (input: string, check: string) => {
    const inputDate = new Date(input);
    const checkDate = new Date(check);
    return (
      getDateAsIsoDateString_(inputDate).substring(0, 6) ===
      getDateAsIsoDateString_(checkDate).substring(0, 6)
    );
  },
};
