import angular from 'angular';

export default angular.module('kagenSite.session', ['ka-helper', 'ka-organizations'])
  .service('session', function Session($q, $log, $window, $http, $rootScope, $state, helper, organizations) {
    var LS_USER_ORGID = 'user.orgId'; //Localstorage key for the current user's organization id
    var LS_AUTH_TOKEN = 'Authorization';
    var LS_USER_CTX = 'userCtx';
    var LS_VIEW_AS_USER_CTX = 'viewUserCtx';
    var SESSION_TIMEOUT_AFTER = 20 // minutes

    //delete the auth token and remove it from localStorage
    function clearAuthToken(){
      $http.defaults.headers.common.Authorization = null;
      $window.localStorage.removeItem(LS_AUTH_TOKEN);
    }

    function setAuthToken (token) {
      $http.defaults.headers.common.Authorization = token;
      $window.localStorage.setItem(LS_AUTH_TOKEN, token);
    }

    function setUserCtx (userCtx) {
      $window.localStorage.setItem(LS_USER_CTX, JSON.stringify(userCtx));
    }

    function timerIncrement() {
      session.userIdleTimeInMinutes += 1;
      if (session.userIdleTimeInMinutes > SESSION_TIMEOUT_AFTER &&
          Object.keys(session.userCtx).length) {
        session.logoutAfterTimeout();
      }
    }

    var session = {
      userCtx: {},
      viewUserCtx: {},
      userIdleTimeInMinutes: 0,

      /**
       *  [loadAuthToken: loads the auth token from localStorage and adds to the Authorization header]
       */
      loadAuthToken: function(){
        $http.defaults.headers.common.Authorization = $window.localStorage.getItem(LS_AUTH_TOKEN) || null;
      },

      /**
       * [setupOrgAdmin: gets the organizations associated with the user's orgId, and uses it to populate specific user roles]
       * @param {[object]} user session data]
       * @return {[promise]}
       */
      setupOrgAdmin: function (userCtx) {
        userCtx.clinicId = userCtx.orgId;
        return organizations.getOrganizationById(userCtx.orgId)
          .then(function(res){
            var orgData = res.data.value;

            if (orgData.allMembersCanCall || orgData.nonMembersCanCall) {
              userCtx.videoChat = true;
            } else {
              userCtx.videoChat = false;
            }
            userCtx.pushNotifications = orgData.canSendNotifications;
            userCtx.dataCollector = orgData.isDataCollector;
            userCtx.role = userCtx.roles[0];
            return session.saveSession(userCtx);
          });
      },
      /**
       * [saveSession: updates session.userCtx]
       * @param {[object]} users session data]
       */
      saveSession: function (userCtx) {
        session.userCtx = userCtx;
        $rootScope.session = session;
        setUserCtx(userCtx);
        return session.userCtx;
      },

      getSession: function (userCtx) {
        if (session.userCtx.token) {
          return session.userCtx;
        }

        var lsUserCtx = JSON.parse($window.localStorage.getItem(LS_USER_CTX));
        if (lsUserCtx) {
          session.userCtx = lsUserCtx;
          $rootScope.session = session;
          return session.userCtx;
        }

        return null;
      },

      removeSessionStorage: function() {
        window.localStorage.removeItem('user.session');
        window.localStorage.removeItem('user.token');
        window.localStorage.removeItem('userCtx');
      },

      /**
       * [login: logins user and calls session.refresh()]
       * @param  {[string]} username
       * @param  {[string]} password
       * @return {[promise]} will resolve to the user session]
       */
      login: function (username, password) {
        return $http.post('/api/login', {
          email: username,
          password: password
        }).then(function (res) {

          setAuthToken(res.data.token);
          var userCtx = res.data;

          if (userCtx.roles.length > 0) {

            if (userCtx.name) {
              userCtx.username = helper.emailToUserName(userCtx.name);
              userCtx.name = helper.userNameToEmail(userCtx.name);
              if (helper.isEmail(userCtx.name)) {
                userCtx.name = R.compose(R.head, R.split('@'))(userCtx.name);
              }
            }

            if (userCtx.roles && userCtx.roles.indexOf('orgadmin') >= 0) {
              $window.localStorage.setItem(LS_USER_ORGID, userCtx.orgId);
              return session.setupOrgAdmin(userCtx);
            } else {
              userCtx.role = userCtx.roles[0];
              return session.saveSession(userCtx);
            }

          }
          else {
            $log.info('No session data - please login');
            return false;
          }

          return session.saveSession(userCtx);
        });
      },
      /**
       *  [logout: logs out user and destorys local auth token]
       *  @return {[promise]}
       */
      logout: function() {
        return $http.delete('/api/_session')
          .then(function () {
            clearAuthToken();
            session.logoutAsUser();
            $window.location.reload();
          });
      },

      /**
       *  [logoutAfterTimeout: logs out user, redirects, and destorys session and timer]
       *  @return {[promise]}
       */
      logoutAfterTimeout: function() {
        session.logout().then(function () {
          session.removeSessionStorage();
          $rootScope.session = null;
          $state.go('main', {}, {
            reload: true
          });
          clearInterval(session.timer);
        }).then(null, $log.error);
      },

      /**
       * Create a View User Context
       * @param roles
       * @param orgId
       * @param username
       * @param email
       * @param firstName
       * @param lastName
       * @param DOB
       * @param role
       * @returns {session.viewUserCtx|{}}
       */
      createViewUserCtx: function (roles, orgId, username, email, firstName, lastName, DOB, role) {

        session.viewUserCtx = {
          roles: roles,
          orgId: orgId,
          username: username,
          email: email,
          firstName: firstName,
          lastName: lastName,
          DOB: DOB,
          role: role
        };

        $window.localStorage.setItem(LS_VIEW_AS_USER_CTX, JSON.stringify(session.viewUserCtx));
        return session.viewUserCtx;
      },

      /**
       * Update View User Context - at the moment to synch up the header bar when an associate views and edits a member's profile page
       * TODO - make this cater to additional properties associated with data - at the moment we will only update the DOB
       * @param data
       */
      updateViewUserCtx: function (data) {

        if (data.firstName) {
          session.viewUserCtx.firstName = data.firstName || 'N/A';
        }

        if (data.lastName) {
          session.viewUserCtx.lastName = data.lastName || 'N/A';
        }

        if (!isNaN(data.birthdayYear + '' + data.birthdayMonth + '' + data.birthdayDay)) {
          session.viewUserCtx.DOB = moment(data.birthdayYear + '-' + data.birthdayMonth + '-' + data.birthdayDay).format('MM-DD-YYYY');
        }

        $window.localStorage.setItem(LS_VIEW_AS_USER_CTX, JSON.stringify(session.viewUserCtx));
        return session.viewUserCtx;
      },

      switchUser: function (member) {

        var username = helper.emailToUserName(member.email);
        session.createViewUserCtx(
          ['app-user'],
          session.userCtx.orgId,
          username,
          member.email,
          member.firstName || 'N/A',
          member.lastName || 'N/A',
          'N/A',
          'app-user');

        $http.get('/api/' + username + '/profile')
          .then(function (res) {
            session.updateViewUserCtx(res.data);
          }, console.err);

        $state.go('allerrhythm');
      },

      logoutAsUser: function () {
        session.viewUserCtx = {};
        $window.localStorage.removeItem(LS_VIEW_AS_USER_CTX);
      },

      startSessionTimer: function() {
        // Check idle time counter every minute.
        session.timer = setInterval(timerIncrement, 60000);

        $(window).mousemove(function () {
          session.userIdleTimeInMinutes = 0;
        });
        $(window).keypress(function () {
          session.userIdleTimeInMinutes = 0;
        });
      }

    };
    return session;
  });
