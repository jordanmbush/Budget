const NAMED_RANGES = {
  RECURRING_TRANSACTIONS_TABLE: {
    AMOUNT: "TABLE_AMOUNT",
    DATE: "TABLE_DATE",
    DAYS_INTERVAL: "TABLE_DAYS_INTERVAL",
    DESCRIPTION: "TABLE_DESCRIPTION",
    ENTIRE_TABLE: "RECURRING_TRANSACTIONS_TABLE",
    FREQUENCY: "TABLE_FREQUENCY",
  },
  BALANCE_COLUMN: "Balance",
  BILLS: "Bills",
  DATE_COLUMN: "Date",
  INCOME_COLUMN: "Income",
};

const SHEETS = {
  BUDGET: "Budget",
  CONFIG: "Config",
};

const FREQUENCY_TYPE = {
  ANNUALLY: "ANNUALLY",
  BI_MONTHLY: "BI_MONTHLY",
  BI_WEEKLY: "BI_WEEKLY",
  DAYS: "DAYS",
  LAST_DAY_OF_MONTH: "LAST_DAY_OF_MONTH",
  MONTHLY: "MONTHLY",
  QUARTERLY: "QUARTERLY",
  WEEKLY: "WEEKLY",
};

const PATTERNS = {
  INCOME_DESCRIPTION: /income/gi,
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
