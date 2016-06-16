import R from 'ramda';

export const checkArrayObjInArray = (array, arrayToCheck, keyToCheck) => {
  return array.filter((m) => {
    return arrayToCheck.has(m.get(keyToCheck));
  }).count() === array.count();
};

export const scrubObj = (obj) => {
  let returnObj = {};
  return R.pipe(
    R.keys,
    R.map((key) => {
      if (R.is(String, obj[key])) {
        returnObj[key] = obj[key];
      } else if (!R.isNil(obj[key]) && !isNaN(obj[key])) {
        returnObj[key] = obj[key];
      }
      return;
    }),
    function() {
      return returnObj;
    }
  )(obj);
};

export const inchesToFeet = (totalInches) => {
  const feet = parseInt(totalInches / 12, 10);
  const inches = parseInt(totalInches - feet * 12, 10);

  return {
    feet: feet,
    inches: inches
  };
};

export const parseFEV1Digits = (fev1Value) => {
  if (
    fev1Value === '' ||
    fev1Value === '0' ||
    fev1Value === 0 ||
    R.isNil(fev1Value)
  ) {
    return [
      '0',
      '0',
      '0'
    ];
  }

  const fev1ValueStringSplit = fev1Value.toString().split('.');

  let fev1ValueArray = ['0', '0', '0'];

  if (fev1ValueStringSplit.length === 2) {
    fev1ValueArray[0] = fev1ValueStringSplit[0] || '0';
    fev1ValueArray[1] = fev1ValueStringSplit[1][0] || '0';
    fev1ValueArray[2] = fev1ValueStringSplit[1][1] || '0';
  } else if (fev1ValueStringSplit.length === 1) {
    fev1ValueArray[0] = fev1ValueStringSplit[0] || '0';
  }

  return fev1ValueArray;
};
