function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [
    {
      name: "Refresh",
      functionName: "refreshLastUpdate",
    },
  ];
  sheet.addMenu("Refresh", entries);
}

function refreshLastUpdate() {
  SpreadsheetApp.getActiveSpreadsheet()
    .getRangeByName("REFRESH")
    ?.setValue(new Date().toTimeString());
}
