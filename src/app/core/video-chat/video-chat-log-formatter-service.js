'use strict';

angular.module('ka-video-chat-log-formatter', ['ka-helper', 'ka-generic-paginator'])
  .factory('videoChatLogFormatter', function videoChatLogFormatterService(helper, genericPaginator){
    function repairEmails(rows) {
      return R.map(function (row) {
        row.email = helper.userNameToEmail(row.email);
        return row;
      }, R.cloneDeep(rows));
    }

    function formatDate(date) {
      return date.toDateString();
    }

    function formatLogRows(rows) {
      var emailsRepaired = repairEmails(rows);

      var formatted = R.map(function (row) {
        var dateObj = moment.utc(R.prop('event_timestamp', row)).toDate();
        row.formattedDate = formatDate(dateObj);
        return row;
      }, emailsRepaired);

      var grouped = R.toPairs(
        R.groupBy(R.prop('formattedDate'), formatted));

      var objectified = R.map(function (group) {
        return {
          day: group[0],
          calls: group[1]
        };
      }, grouped);

      var sorted = R.sort(function (a, b) {
        return (+new Date(b.day)) - (+new Date(a.day));
      }, objectified);

      return sorted;
    }

    return {
      formatPage: R.compose(formatLogRows, genericPaginator),
      repairEmails: repairEmails
    };
  });
