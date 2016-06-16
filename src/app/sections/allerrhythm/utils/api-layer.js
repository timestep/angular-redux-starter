'use strict';

function getDataByTime(startDate, endDate, lat, lng, email, token) {
  return $.ajax({
    url: 'api/web/allerrhythm',
    type: 'GET',
    data: {
      start: startDate,
      end: endDate,
      lat: lat,
      lng: lng,
      email: email
    },

    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', token);
    },

    success: function (data) {
      return data;
    },

    error: function (xhr, ajaxOptions, thrownError) {
      console.log(xhr.status);
      console.log(thrownError);
      throw new Error('XHR Error:', thrownError);
    }
  });
}

function getTriggersByDay(email, date, token) {

  // email must be in the normalized form
  // e.g. alex_at_rangle_dot_io
  // date must be in YYYYMMDD form
  // e.g. 20160101

  date = moment(date).format('YYYYMMDD');

  return $.ajax({
    url: 'api/todays-triggers/' + email + '/' + date + '/triggers',
    type: 'GET',

    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', token);
    },

    success: function (data) {
      return data;
    },

    error: function (xhr, ajaxOptions, thrownError) {
      console.log(xhr.status);
      console.log(thrownError);
      throw new Error('XHR Error:', thrownError);
    }
  });
}

module.exports = {
  getDataByTime: getDataByTime,
  getTriggersByDay: getTriggersByDay
};
