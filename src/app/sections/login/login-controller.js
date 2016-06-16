'use strict';

angular.module('ka-login', ['ka-session', 'ka-helper'])
  .controller('LoginCtrl', function ($http, $log, $state, session, helper) {
    var self = this;
    toastr.options.closeButton = true;

    this.reset = function(email) {
      self.spinner = true;

      if (!helper.isEmail(email)) {
        toastr.error('Password reset: Please provide valid email.');
        self.spinner = false;
        return;
      }

      $http.post('/api/' + '_rememberpassword', {email: email})
        .then(function(res) {
          toastr.info('Password reset email sent.');
          self.spinner = false;
        })
        .then(null, function(err) {
          toastr.error(err.data.error);
          self.spinner = false;
        });
    };

    this.doLogin = function ($event, inputEmail, inputPassword) {
      if (helper.isEmail(inputEmail)) {
        inputEmail = helper.emailToUserName(inputEmail);
      }
      $event.preventDefault();
      self.spinner = true;
      session.login(inputEmail, inputPassword)
        .then(function () {
          if (session) {
            if (session.userCtx.role === 'operator') {
              $state.go('associates');
            } else if (session.userCtx.role === 'orgadmin') {
              $state.go('main');
            } else if (session.userCtx.role === 'app-user') {
              $state.go('allerrhythm');
            }
            self.spinner = false;
          }
        }).then(null, function (err) {
          toastr.error('Error: ' + err.statusText);
          self.spinner = false;
        });
    };
  });
