const CUSTOM_MENUS = {
  BUDGET_ACTIONS: {
    MENU_ITEMS: [
      { name: "Recalculate Expenses", functionName: "showExpensesRangeSelectorSideBar" },
      { name: "Recalculate Income", functionName: "showIncomeRangeSelectorSideBar" },
    ],
    NAME: "Budget Actions",
  },
};

type GlobalVariables = {
  actionDescription: string;
  serverActionFunctionName: string;
};

function showRangeSelectorSideBar(globalVariablesData: GlobalVariables) {
  const htmlOutput = HtmlService.createHtmlOutputFromFile("range-selector");
  const htmlString = htmlOutput.getContent();
  const injectGlobalVariables = `
  GLOBAL_VARIABLES = {
    actionDescription: "${globalVariablesData.actionDescription}",
    serverActionFunctionName: "${globalVariablesData.serverActionFunctionName}",
  };
`;
  const htmlWithGlobalVariables = htmlString.replace(
    `"{{GLOBAL_VARIABLES}}";`,
    injectGlobalVariables
  );
  const withGlobalVariables = HtmlService.createHtmlOutput(htmlWithGlobalVariables);
  const ui = SpreadsheetApp.getUi();
  ui.showSidebar(withGlobalVariables);
}

function showExpensesRangeSelectorSideBar() {
  const globalVariables: GlobalVariables = {
    actionDescription: "Updates Expenses",
    serverActionFunctionName: calculateExpensesForActiveRange.name,
  };

  return showRangeSelectorSideBar(globalVariables);
}

function showIncomeRangeSelectorSideBar() {
  const globalVariables: GlobalVariables = {
    actionDescription: "Updates Income",
    serverActionFunctionName: calculateIncomeForActiveRange.name,
  };

  return showRangeSelectorSideBar(globalVariables);
}
