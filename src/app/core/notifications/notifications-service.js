'use strict';

angular.module('ka-notifications', [])
  .factory('notifications', function ($http, $q) {
    var notificationDefaultTemplate = {data: {
      rules: {
        gender: 'All',
        medicalConditions: 'N/A',
        medications: 'N/A',
        Trees: 'N/A',
        Grass: 'N/A',
        Weeds: 'N/A',
        Mold: 'N/A',
        Drugs: 'N/A',
        Animals: 'N/A',
        Food: 'N/A',
        'null': 'N/A'
      },
      sendTime: moment(new Date()).format('HH:00:00'),
      timezone: jstz.determine().name(),
      periodFilter: 'No',
      type: 'Health Alert',
      template: 'Text',
      frequency: 'Daily',
      enabled: true,
      link: ''
    }};
    return {
      getNotifications: function (orgId) {
        var apiUrl = orgId ? '/api/notifications/' + orgId + '/configuration' : '/api/notifications-any-org/configuration';
        return $http.get(apiUrl).then(function(response) {
          response.data.rows.forEach(function(item){
            if (item.template && item.template.indexOf('Image') !== -1){
              var imageUrl = (orgId ? '/api/notifications/' + orgId : '/api/notifications-any-org') + '/images/' + item.id;
              $http.get(imageUrl).then(function(imageResponse) {
                item.image = imageResponse.data;
              });
            }
          });
          return response;
        });
      },
      createUpdateNotification: function (orgId, payload) {
        var apiUrl = orgId ? '/api/notifications/' + orgId : '/api/notifications-any-org';
        apiUrl += payload.hasOwnProperty('id') ? '/configuration/' + payload.id : '/configuration';
        return $http.put(apiUrl, payload);
      },
      deleteNotification: function (organizationId, notificationId) {
        var apiUrl = organizationId ? '/api/notifications/' + organizationId + '/configuration/' + notificationId :
        '/api/notifications-any-org/configuration/' + notificationId;
        return $http.delete(apiUrl);
      },
      enableNotification: function (organizationId, notificationId) {
        var thisFactory = this;
        return thisFactory.getNotificationByIdAndOrg(organizationId, notificationId)
        .then(function(response) {
          var notification = response.data;
          notification.enabled = true;
          return thisFactory.createUpdateNotification(organizationId, notification);
        });
      },
      disableNotification: function (organizationId, notificationId) {
        var thisFactory = this;
        return thisFactory.getNotificationByIdAndOrg(organizationId, notificationId)
        .then(function(response) {
          var notification = response.data;
          notification.enabled = false;
          return thisFactory.createUpdateNotification(organizationId, notification);
        });
      },
      getNotificationById: function (notificationID, notifications) {
        var matched = notifications.filter(function(item) {
          return item.id === notificationID;
        });
        return matched.length === 1 ? matched[0] : null;
      },
      getNotificationByIdAndOrg: function (organizationId, notificationId) {
        if (notificationId) {
          var apiUrl = organizationId ? '/api/notifications/' + organizationId + '/configuration/' + notificationId :
          '/api/notifications-any-org/configuration/' + notificationId;
          return $http.get(apiUrl).then(function(response) {
            if (!response.data.hasOwnProperty('rules') || response.data.rules === null) { response.data.rules = {};}
            response.data.periodFilter = response.data.hasOwnProperty('beginDate') && response.data.beginDate !== null ? 'Yes' : 'No';
            if (response.data.template && response.data.template.indexOf('Image') !== -1){
              var imageUrl = (organizationId ? '/api/notifications/' + organizationId : '/api/notifications-any-org') + '/images/' + response.data.id;
              //var imageUrl = '/api/notifications/' + organizationId + '/images/' + response.data.id;
              $http.get(imageUrl).then(function(imageResponse) {
                response.data.image = imageResponse.data;
              });
            }

            return response;
          });
        } else {
          var deferred = $q.defer();
          deferred.resolve(notificationDefaultTemplate);
          return deferred.promise;
        }
      },
      sendAdHocNotification: function (userId, payload) {
        return $http.post('/api/notifications/alerts/' + userId, payload);
      },
      getNotificationTypes: function (isOperator, isMemberPage) {
        return $http.get('/app/core/notifications/NotificationTypes.json')
          .then(function(response) {
          return response.data.filter(function(item) {
            return isOperator ? item.operator === true : item.orgAdmin === true && (isMemberPage || !item.memberOnlyForOrgAdmin);
          })
          .map(function(item) {
            return item.name;
          });
        });
      },
      getNotificationTemplates: function () {
        return $http.get('/app/core/notifications/NotificationTemplates.json');
      },
      getNotificationStatuses: function () {
        return $http.get('/app/core/notifications/NotificationStatuses.json');
      },
      getNotificationFrequencies: function () {
        return $http.get('/app/core/notifications/NotificationFrequencies.json');
      },
      getNotificationSexes: function () {
        return $http.get('/app/core/notifications/NotificationSexes.json');
      },
      getNotificationLinks: function () {
        return $http.get('/app/core/notifications/NotificationLinks.json');
      },
      getDaysOfTheWeek: function () {
        return $http.get('/app/core/notifications/DaysOfTheWeek.json');
      },
      getStates: function () {
        return $http.get('/app/core/notifications/States.json');
      },
      getCities: function () {
        return $http.get('/api/user-cities');
      },
      mapVmToApi: function(notification) {
        if (notification.hasOwnProperty('imageSelect')) {
          notification.image = notification.imageSelect[0].dataUrl;
          delete notification.imageSelect;
        }
        if (notification.rules.hasOwnProperty('age')) {
          if (!notification.rules.age.from || !notification.rules.age.to) { delete notification.rules.age;}
        }
        notification.sendTime = moment(notification.timeMoment).format('HH:mm:ss');
        delete notification.timeMoment;
        if (notification.beginDateDate) { notification.beginDate = moment(notification.beginDateDate);}
        if (notification.endDateDate) { notification.endDate = moment(notification.endDateDate);}
        delete notification.beginDateDate;
        delete notification.endDateDate;
        return notification;
      }
    };
  })
  .directive('imageUpload', function($q, $log) {
    return {
      require: 'ngModel',
      scope: {
        ngModel: '=',
        maxHeight: '@'
      },
      templateUrl: '/app/sections/notifications/image-upload.html',
      restrict: 'E',
      link: function(scope, elem, attrs) {
        scope.rotating = false;
        scope.canvas = elem.find('canvas')[0];
        scope.$watch('ngModel', function(value) {
          if (value) {scope.renderImageInCanvas(value);}
        });
      },
      controller: function($scope, $timeout) {
        $scope.showThumbnail = function(e, files) {
          var file = files[0];
          $scope.generateImageUrl(file).then(function(response) {
            $scope.renderImageInCanvas(response);
          }).then(null, $log.error);
        };
        $scope.removeImage = function() {
          var context = $scope.canvas.getContext('2d');
          context.clearRect(0, 0, $scope.canvas.width, $scope.canvas.height);
          $scope.ngModel = null;
        };
        $scope.generateImageUrl = function(file) {
          var deferred = $q.defer();
          if (file !== null) {
            if (!!window.FileReader && file.type.indexOf('image') > -1) {
              $timeout(function () {
                var fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = function (e) {
                  $timeout(function () {
                    deferred.resolve(e.target.result);
                  });
                };
              });
            } else {
              $log.error('cannot instantiate window.FileReader');
            }
          } else {
            $log.error('uploaded file is null');
          }
          return deferred.promise;
        };
        $scope.renderImageInCanvas = function(src) {
          var thumbnail = new Image();
          thumbnail.onload = function(){
            if(thumbnail.height > $scope.maxHeight) {
              thumbnail.width *= $scope.maxHeight / thumbnail.height;
              thumbnail.height = $scope.maxHeight;
            }
            var context = $scope.canvas.getContext('2d');
            context.clearRect(0, 0, $scope.canvas.width, $scope.canvas.height);
            $scope.canvas.width = thumbnail.width;
            $scope.canvas.height = thumbnail.height;
            context.drawImage(thumbnail, 0, 0, thumbnail.width, thumbnail.height);
            $scope.ngModel = thumbnail.src;
            $scope.$apply();
          };
          thumbnail.src = src;
        };
        $scope.rotate = function () {
          if (!$scope.rotating) {
            $scope.rotating = true;
            var newImage = new Image();
            newImage.src = $scope.canvas.toDataURL();

            newImage.onload = function () {
              var canvasWidth = $scope.canvas.width;
              var canvasHeight = $scope.canvas.height;
              $scope.canvas.width = canvasHeight;
              $scope.canvas.height = canvasWidth;
              canvasWidth = $scope.canvas.width;
              canvasHeight = $scope.canvas.height;

              var context = $scope.canvas.getContext('2d');
              context.save();
              context.translate(canvasWidth, canvasHeight / canvasWidth);
              context.rotate(Math.PI / 2);
              context.drawImage(newImage, 0, 0);
              context.restore();

              $scope.ngModel = $scope.canvas.toDataURL();
              $scope.$apply();

              newImage = null;
              $scope.rotating = false;
            };
          }
        };
      }
    };
  })
  .directive('fileChange', function($parse) {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function ($scope, element, attrs, ngModel) {

        // Get the function provided in the file-change attribute.
        // Note the attribute has become an angular expression,
        // which is what we are parsing. The provided handler is
        // wrapped up in an outer function (attrHandler) - we'll
        // call the provided event handler inside the handler()
        // function below.
        var attrHandler = $parse(attrs.fileChange);

        // This is a wrapper handler which will be attached to the
        // HTML change event.
        var handler = function (e) {

          $scope.$apply(function () {

            // Execute the provided handler in the directive's scope.
            // The files variable will be available for consumption
            // by the event handler.
            attrHandler($scope, { $event: e, files: e.target.files });
          });
        };

        // Attach the handler to the HTML change event
        element[0].addEventListener('change', handler, false);
      }
    };
  });

