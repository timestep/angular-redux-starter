'use strict';

angular.module('ka-generic-paginator', [])
  .factory('genericPaginator', function genericPaginatorService(){
    function formatPage (page, itemsPerPage, items) {
      var to = page * itemsPerPage;
      var from = to - itemsPerPage;

      return R.cloneDeep(R.slice(from, to, items));
    }

    return R.curry(formatPage);
  });
