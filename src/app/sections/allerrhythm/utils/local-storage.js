'use strict';

/* Local Storage
 * Some localStorage helper functions to verify if a key exists
 * in localStorage, or to add data to localStorage using a
 * predefined key.
 */

var oneMonthAgo = moment().subtract(1, 'month');

// This information is used to determine if we need to do an AJAX request or if
// the data is already available to us for the web A-R
function addDateToLocalStorage(startDate) {
  var fiveMonthsAgo = moment().subtract(5, 'month').format('YYYY-MM-DD');
  var elevenMonthsAgo = moment().subtract(11, 'month').format('YYYY-MM-DD');
  var twoMonthsAgo = moment().subtract(2, 'month').format('YYYY-MM-DD');
  var startDateFormatted = moment(startDate).format('YYYY-MM-DD');

  if (startDateFormatted < elevenMonthsAgo) {
    window.localStorage.setItem('startDate1Year', startDate);
    window.localStorage.setItem('startDate6Months', 'active');
    window.localStorage.setItem('startDate3Months', 'active');
  } else if (startDateFormatted < fiveMonthsAgo) {
    window.localStorage.setItem('startDate6Months', startDate);
    window.localStorage.setItem('startDate3Months', 'active');
  } else if (startDateFormatted < twoMonthsAgo) {
    window.localStorage.setItem('startDate3Months', startDate);
  }
}

function removeDatePickerLocalStorage() {
  window.localStorage.removeItem('startDate1Year');
  window.localStorage.removeItem('startDate6Months');
  window.localStorage.removeItem('startDate3Months');
}

// check to see if user is moving from 1 year or 6 months into a date range less than those
// but higher than 1 month. Web AR shouldn't update.
function firstDatePickerCondition(startDate, title) {
  if (moment(startDate) < oneMonthAgo) {
    if (window.localStorage.getItem('startDate1Year') ||
        window.localStorage.getItem('startDate6Months') === startDate ||
        window.localStorage.getItem('startDate3Months') === startDate ||
        window.localStorage.getItem('startDate3Months') === 'active' && title !== '1 Year') {
      return true;
    }
  }
}

// check to see if user is moving from 1 year or 6 months or 3 months into a date range less
// than or equal to one month. Web AR should update.
function secondDatePickerCondition(startDate) {
  if (window.localStorage.getItem('startDate3Months') && moment(startDate) > oneMonthAgo ||
      window.localStorage.getItem('startDate6Months') && moment(startDate) > oneMonthAgo ||
      window.localStorage.getItem('startDate1Year' && moment(startDate) > oneMonthAgo)) {
    removeDatePickerLocalStorage();
    return true;
  }
}

// check to see if user is moving less to a date range less than 1 month.
//  web AR shouldn't update;
function thirdDatePickerCondition(startDate) {
  if (moment(startDate) > oneMonthAgo) {
    return true;
  }
}

function checkIfDataAlreadyExists(startDate, title) {
  if (firstDatePickerCondition(startDate, title)) {
    return true;
  } else if (secondDatePickerCondition(startDate)) {
    return false;
  } else if (thirdDatePickerCondition(startDate)) {
    return true;
  }
  return false;
}

module.exports = {
  addDateToLocalStorage: addDateToLocalStorage,
  checkIfDataAlreadyExists: checkIfDataAlreadyExists
};
