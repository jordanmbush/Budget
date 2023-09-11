function onOpen() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const { BUDGET_ACTIONS } = CUSTOM_MENUS;
  sheet.addMenu(BUDGET_ACTIONS.NAME, BUDGET_ACTIONS.MENU_ITEMS);
}
