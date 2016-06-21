export default function search($log) {
  var service = {

    /**
     * Create 'controller model' search fields and populate the 'suggestions'
     * @param fields
     * @param list
     * @param collection
     * @param suggestionsAPI
     * @returns {*}
     * @private
     */
    createFields: function (fields, list, collection, suggestionsAPI) {

      R.foldl (function (acc, obj) {
        var model = acc[obj.model] = {
          // Display label / search field
          label: obj.label,

          // Controller scope model / search field
          model: '',

          // Look-ahead values / search field
          suggestions: []
        };

        if (obj.model === 'birthmonth') {
          model.suggestions.push('');
          for (var n = 1; n <= 12; n++) {
            model.suggestions.push ((n < 10 ? 0 : '') + '' + n);
          }
        }
        else if (obj.model === 'birthday') {
          model.suggestions.push('');
          for (var n = 1; n <= 31; n++) {
            model.suggestions.push ((n < 10 ? 0 : '') + '' + n);
          }
        }
        else if (obj.model === 'birthyear') {
          model.suggestions.push('');
          for (var n = moment().get('year'); n >= 1900; n--) {
            model.suggestions.push(n);
          }
        }
        else {
          suggestionsAPI(obj.model)
            .then(function (response) {
              model.suggestions = response.data[obj.model];
            })
            .then(null, $log.error);
        }

        collection.push (model);
        return acc;
      }, list, fields);

      return {
        list: list,
        collection: collection
      };
    },

    /**
     * Create search filter object based on 'controller models'
     * @param list
     * @returns {{}}
     * @private
     */
    createFilter: function (list) {
      var filter = {};
      angular.forEach(list, function (obj, key) {
        if (obj.model) {
          filter[key] = obj.model;
        }
      });

      return filter;
    },

    /**
     * Reset the 'controller model' search fields
     * @param list
     * @returns {*}
     * @private
     */
    resetFields: function (list) {
      angular.forEach(list, function (obj) {
        if (obj.model) {
          obj.model = '';
        }
      });

      return list;
    }
  };

  return service;
};
