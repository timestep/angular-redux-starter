import R from 'ramda';
import moment from 'moment';

const compareByCreatedTimeStamp = R.curry((sortByDescendingOrder, itemA, itemB) => {
  const aTimestamp = itemA.get('createdTimestamp');
  const bTimestamp = itemB.get('createdTimestamp');
  const aTimestampIsNil = R.isNil(aTimestamp);
  const bTimestampIsNil = R.isNil(bTimestamp);

  if ((aTimestampIsNil && bTimestampIsNil) ||
    (!aTimestampIsNil && bTimestampIsNil) ||
    (aTimestampIsNil && !bTimestampIsNil)
  ) {
    return sortByDescendingOrder ? -1 : 1;
  }

  let diff = moment(aTimestamp).diff(moment(bTimestamp));
  return diff === 0 ? 0 : (sortByDescendingOrder ? -1 : 1) * diff / Math.abs(diff);
});

export default compareByCreatedTimeStamp;
