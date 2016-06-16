'use strict';
/*jshint expr:true*/

describe('UsersCtrl', function () {
  beforeEach(module('ka-users'));


  var Ctrl;
  var scope;
  var q;

  var _$location_;
  var _$window_;
  var _users_;
  var _$modal_;
  var _search_;
  var _session_;
  var _ngProgress_;
  var ngProgressSpyStart;
  var ngProgressSpyComplete;

  var mockUsers = [{
    'birthDate': '1996-06-07T07:00:00.000Z',
    'city': 'Toronto',
    'email': 'test@rangle.io',
    'birthdate': 'Test',
    'id': 'Test Rangle',
    'lastName': 'Rangle',
    'phone': '416-123-4567',
    'state': {country: 'Canada', name: 'ON'},
    'street1': '150 John St.',
    'zipCode': 'M5V 3E3'
  }];

  describe('UsersCtrl ', function () {

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($q,
                                $rootScope,
                                $controller,
                                $log) {
      //    scope = $rootScope.$new();
      scope = $rootScope.$new();

      _users_ = {
        DEFAULT_USER_SORT: 'id',
        DEFAULT_USER_LIMIT: 25,
        DEFAULT_USER_DIRECTION: 'asc',

        getUsers: function () {
          var res = {};
          res.data = {
            rows: 'res.data'
          };
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },

        getSuggestions: function (field) {
          var res = {
            data: {}
          };

          res.data[field] = [1, 2, 3, 4].map (function (value) {
            return field + '' + value;
          });
          return $q.when (res);
        },

        getUserIds: function (user) {
          var res = {};
          res.data = {
            rows: 'res.data'
          };
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        getUserById: function (model) {
          var res = {};
          res.data = {
            email: 'test@rangle.io'
          };
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
      };

      _$window_ = {};
      _$window_.confirm = function () {
        return true;
      };

      _$location_ = {
        url: function () {
          return true;
        }
      };

      _search_ = {
        createFields: function (fields, list, collection, suggestionsAPI) {

          var list = {
            organization: {
              label: 'label',
              model: 'model',
              suggestions: ['organization1', 'organization2', 'organization3', 'organization4']
            },
            firstname: {
              label: 'label',
              model: 'model',
              suggestions: ['firstname1', 'firstname2', 'firstname3', 'firstname4']
            },
            lastname: {
              label: 'label',
              model: 'model',
              suggestions: ['lastname1', 'lastname2', 'lastname3', 'lastname4']
            },
            address: {
              label: 'label',
              model: 'model',
              suggestions: ['address1', 'address2', 'address3', 'address4']
            },
            city: {
              label: 'label',
              model: 'model',
              suggestions: ['city1', 'city2', 'city3', 'city4']
            },
            state: {
              label: 'label',
              model: 'model',
              suggestions: ['state1', 'state2', 'state3', 'state4']
            },
            zipcode: {
              label: 'label',
              model: 'model',
              suggestions: ['zipcode1', 'zipcode2', 'zipcode3', 'zipcode4']
            },
            email: {
              label: 'label',
              model: 'model',
              suggestions: ['email1', 'email2', 'email3', 'email4']
            },
            birthmonth: {
              label: 'label',
              model: 'model',
              suggestions: ['birthmonth1', 'birthmonth2', 'birthmonth3', 'birthmonth4']
            },
            birthyear: {
              label: 'label',
              model: 'model',
              suggestions: ['birthyear1', 'birthyear2', 'birthyear3', 'birthyear4']
            },
            phonenumber: {
              label: 'label',
              model: 'model',
              suggestions: ['phonenumber1', 'phonenumber2', 'phonenumber3', 'phonenumber4']
            }
          };
          var collection = [
            {
              organization: {
                label: 'label',
                model: 'model',
                suggestions: ['organization1', 'organization2', 'organization3', 'organization4']
              }
            },
            {
              firstname: {
                label: 'label',
                model: 'model',
                suggestions: ['firstname1', 'firstname2', 'firstname3', 'firstname4']
              }
            },
            {
              lastname: {
                label: 'label',
                model: 'model',
                suggestions: ['lastname1', 'lastname2', 'lastname3', 'lastname4']
              }
            },
            {
              address: {
                label: 'label',
                model: 'model',
                suggestions: ['address1', 'address2', 'address3', 'address4']
              }
            },
            {
              city: {
                label: 'label',
                model: 'model',
                suggestions: ['city1', 'city2', 'city3', 'city4']
              }
            },
            {
              state: {
                label: 'label',
                model: 'model',
                suggestions: ['state1', 'state2', 'state3', 'state4']
              }
            },
            {
              zipcode: {
                label: 'label',
                model: 'model',
                suggestions: ['zipcode1', 'zipcode2', 'zipcode3', 'zipcode4']
              }
            },
            {
              email: {
                label: 'label',
                model: 'model',
                suggestions: ['email1', 'email2', 'email3', 'email4']
              }
            },
            {
              birthmonth: {
                label: 'label',
                model: 'model',
                suggestions: ['birthmonth1', 'birthmonth2', 'birthmonth3', 'birthmonth4']
              }
            },
            {
              birthyear: {
                label: 'label',
                model: 'model',
                suggestions: ['birthyear1', 'birthyear2', 'birthyear3', 'birthyear4']
              }
            },
            {
              phonenumber: {
                label: 'label',
                model: 'model',
                suggestions: ['phonenumber1', 'phonenumber2', 'phonenumber3', 'phonenumber4']
              }
            }
          ];

          return {
            list: list,
            collection: collection
          }
        },

        createFilter: function (list) {
          var filter = {};
          angular.forEach(list, function (obj, key) {
            if (obj.model) {
              filter[key] = obj.model;
            }
          });

          return filter;
        },

        resetFields: function (list) {
          angular.forEach(list, function (obj) {
            if (obj.model) {
              obj.model = '';
            }
          });

          return list;
        }
      };


      _session_ = {};
      _session_.userCtx = {
        role: 'operator'
      };


      _ngProgress_ = {
        start: function () {
        },
        complete: function () {
        }
      };

      _$modal_ = {
        open: function (modal) {
          var result = function (res) {
            return res;
          };
          return {
            result: {
              then: result
            }
          };
        }
      };


      ngProgressSpyStart = sinon.spy(_ngProgress_, 'start');
      ngProgressSpyComplete = sinon.spy(_ngProgress_, 'complete');

      Ctrl = $controller('UsersCtrl', {
        $modal: _$modal_,
        $log: $log,
        $location: _$location_,
        $window: _$window_,
        users: _users_,
        search: _search_,
        session: _session_,
        ngProgress: _ngProgress_
      });

    }));


    describe('Initial state', function () {

      it('should instantiate the controller properly', function () {
        expect(Ctrl).to.be.defined;
      });

      it('should contain the following functions/variables', function () {

        scope.$digest();

        expect(Ctrl.field).to.eq('id');
        expect(Ctrl.direction).to.eq('asc');
        expect(Ctrl.itemsPerPage).to.eq(25);
        expect(Ctrl.currentPage).to.eq(1);
        expect(Ctrl.searchForUsers).to.exist;
        expect(Ctrl.resetSearch).to.exist;
        expect(Ctrl.changeSorting).to.exist;
        expect(Ctrl.pageChanged).to.exist;

        expect(Ctrl.searchFields.organization).to.exist;
        expect(Ctrl.searchFields.organization.label).to.exist;
        expect(Ctrl.searchFields.organization.model).to.exist;
        expect(Ctrl.searchFields.organization.suggestions).to.exist;
        expect(Ctrl.searchFields.organization.suggestions).to.eql(['organization1', 'organization2', 'organization3', 'organization4']);

        expect(Ctrl.searchFields.firstname).to.exist;
        expect(Ctrl.searchFields.firstname.label).to.exist;
        expect(Ctrl.searchFields.firstname.model).to.exist;
        expect(Ctrl.searchFields.firstname.suggestions).to.exist;
        expect(Ctrl.searchFields.firstname.suggestions).to.eql(['firstname1', 'firstname2', 'firstname3', 'firstname4']);

        expect(Ctrl.searchFields.lastname).to.exist;
        expect(Ctrl.searchFields.lastname.label).to.exist;
        expect(Ctrl.searchFields.lastname.model).to.exist;
        expect(Ctrl.searchFields.lastname.suggestions).to.exist;
        expect(Ctrl.searchFields.lastname.suggestions).to.eql(['lastname1', 'lastname2', 'lastname3', 'lastname4']);

        expect(Ctrl.searchFields.address).to.exist;
        expect(Ctrl.searchFields.address.label).to.exist;
        expect(Ctrl.searchFields.address.model).to.exist;
        expect(Ctrl.searchFields.address.suggestions).to.exist;
        expect(Ctrl.searchFields.address.suggestions).to.eql(['address1', 'address2', 'address3', 'address4']);

        expect(Ctrl.searchFields.city).to.exist;
        expect(Ctrl.searchFields.city.label).to.exist;
        expect(Ctrl.searchFields.city.model).to.exist;
        expect(Ctrl.searchFields.city.suggestions).to.exist;
        expect(Ctrl.searchFields.city.suggestions).to.eql(['city1', 'city2', 'city3', 'city4']);

        expect(Ctrl.searchFields.state).to.exist;
        expect(Ctrl.searchFields.state.label).to.exist;
        expect(Ctrl.searchFields.state.model).to.exist;
        expect(Ctrl.searchFields.state.suggestions).to.exist;
        expect(Ctrl.searchFields.state.suggestions).to.eql(['state1', 'state2', 'state3', 'state4']);

        expect(Ctrl.searchFields.zipcode).to.exist;
        expect(Ctrl.searchFields.zipcode.label).to.exist;
        expect(Ctrl.searchFields.zipcode.model).to.exist;
        expect(Ctrl.searchFields.zipcode.suggestions).to.exist;
        expect(Ctrl.searchFields.zipcode.suggestions).to.eql(['zipcode1', 'zipcode2', 'zipcode3', 'zipcode4']);

        expect(Ctrl.searchFields.email).to.exist;
        expect(Ctrl.searchFields.email.label).to.exist;
        expect(Ctrl.searchFields.email.model).to.exist;
        expect(Ctrl.searchFields.email.suggestions).to.exist;
        expect(Ctrl.searchFields.email.suggestions).to.eql(['email1', 'email2', 'email3', 'email4']);

        expect(Ctrl.searchFields.birthmonth).to.exist;
        expect(Ctrl.searchFields.birthmonth.label).to.exist;
        expect(Ctrl.searchFields.birthmonth.model).to.exist;
        expect(Ctrl.searchFields.birthmonth.suggestions).to.exist;
        expect(Ctrl.searchFields.birthmonth.suggestions).to.eql(['birthmonth1', 'birthmonth2', 'birthmonth3', 'birthmonth4']);

        expect(Ctrl.searchFields.birthyear).to.exist;
        expect(Ctrl.searchFields.birthyear.label).to.exist;
        expect(Ctrl.searchFields.birthyear.model).to.exist;
        expect(Ctrl.searchFields.birthyear.suggestions).to.exist;
        expect(Ctrl.searchFields.birthyear.suggestions).to.eql(['birthyear1', 'birthyear2', 'birthyear3', 'birthyear4']);

        expect(Ctrl.searchFields.phonenumber).to.exist;
        expect(Ctrl.searchFields.phonenumber.label).to.exist;
        expect(Ctrl.searchFields.phonenumber.model).to.exist;
        expect(Ctrl.searchFields.phonenumber.suggestions).to.exist;
        expect(Ctrl.searchFields.phonenumber.suggestions).to.eql(['phonenumber1', 'phonenumber2', 'phonenumber3', 'phonenumber4']);

      });
    });

    describe('Function:', function () {

      it(
        'pageChanged() updates the users list when the paging + sorting changes',
        function () {
          Ctrl.pageChanged();
          scope.$digest();
          expect(ngProgressSpyStart.called).to.be.true;
          expect(ngProgressSpyComplete.called).to.be.true;
        });

      it('changeSorting() change orderBy property', function () {
        Ctrl.field = 'first_name';
        Ctrl.direction = 'desc';
        Ctrl.changeSorting('first_name');
        scope.$digest();

        expect(Ctrl.direction).to.eq('asc');
        expect(Ctrl.field).to.eq('first_name');

        Ctrl.field = 'first_name';
        Ctrl.direction = 'asc';
        Ctrl.changeSorting('first_name');
        scope.$digest();

        expect(Ctrl.direction).to.eq('desc');
        expect(Ctrl.field).to.eq('first_name');

        Ctrl.field = 'first_name';
        Ctrl.changeSorting('phone_number');
        scope.$digest();

        expect(Ctrl.field).to.eq('phone_number');
      });
    });
  });
});
