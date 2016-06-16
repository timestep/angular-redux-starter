export const convertStringToPhoneFormat = (str) => {
  return str ? str.toLowerCase()
    .replace(/(\(|\)|-)*/g, '').replace(/(\d\d\d)\s*(\d\d\d)\s*(\d\d\d\d)/, '$1-$2-$3')
    .replace(/\s*ext\s*(\d+)/g, ' ext $1') : str;
};
