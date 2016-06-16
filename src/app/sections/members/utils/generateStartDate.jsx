/**
 * Returns YYYY-MM-DD formated startDate for required api query based on date picker.
 */
export default function generateStartDate(date) {
  switch (date) {
    case 'Week':
      return moment().subtract(7, 'days').format('YYYY-MM-DD');
    case 'Day':
      return moment().subtract(1, 'days').format('YYYY-MM-DD');
    case '3 Day':
      return moment().subtract(3, 'days').format('YYYY-MM-DD');
    case 'Month':
      return moment().subtract(1, 'months').format('YYYY-MM-DD');
    case '3 Month':
      return moment().subtract(3, 'months').format('YYYY-MM-DD');
    case '6 Month':
      return moment().subtract(6, 'months').format('YYYY-MM-DD');
    case '1 Year':
      return moment().subtract(1, 'year').format('YYYY-MM-DD');
    default: moment().format('YYYY-MM-DD');
  }
}
