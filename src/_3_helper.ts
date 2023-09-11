type JSRange = Array<Array<any>>;
type SomeCb = (val: any, rowIndex: number, columnIndex: number, range: JSRange) => boolean;

const inRange = (cb: SomeCb) => (row: JSRange, rowIndex: number, range: JSRange) => {
  return row.some((value, columnIndex) => {
    return cb(value, rowIndex, columnIndex, range);
  });
};

const isValidDescription = (description: string) => {
  return TableDescriptionRange?.getValues().some(
    inRange((validDescription) => {
      return description === validDescription;
    })
  );
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
});
