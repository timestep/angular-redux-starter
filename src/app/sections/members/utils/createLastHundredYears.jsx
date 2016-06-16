export const createLastHundredYears = () => {
  let list = [];
  for (var n = 0, presentYear = moment().year(); n <= 100; n++) {
    list.push(presentYear - n);
  }
  return list;
};
