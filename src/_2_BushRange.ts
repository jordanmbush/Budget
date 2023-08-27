/**
 * @param {GoogleAppsScript.Spreadsheet.Range} range
 * @returns {BushRange}
 */
class BushRange {
  constructor(range: GoogleAppsScript.Spreadsheet.Range) {
    this.range = range;
  }

  range;

  static isSingleCell(range: GoogleAppsScript.Spreadsheet.Range) {
    return range.getNumColumns() === 1 && range.getNumRows() === 1;
  }

  getCellByValue(value: string | number) {
    const cellData: { row: number; column: number } = { row: 0, column: 0 };
    const cellFound = this.range.getValues().some((row, rowIndex) => {
      return row.some((cellValue, columnIndex) => {
        if (cellValue === value) {
          cellData.row = rowIndex;
          cellData.column = columnIndex;
          return true;
        }
      });
    });

    return cellFound ? this.range.getCell(cellData.row + 1, cellData.column + 1) : null;
  }
}

// export default BushRange;
