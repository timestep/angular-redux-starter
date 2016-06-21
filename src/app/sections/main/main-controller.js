export default function MainCtrl($modal, $state, $log, $rootScope, session) {
  var vm = this;

  vm.showAboutUs = function () {
    var aboutUsModalInstance = $modal.open({
      templateUrl: 'app/sections/main/about.html',
      windowClass: 'app-modal-window-aboutus'
    });
  };

  vm.showReference = function () {
    var referenceModalInstance = $modal.open({
      templateUrl: 'app/sections/reference/reference.html',
      windowClass: 'app-modal-window-reference'
    });
  };

  vm.logout = function () {
    session.logout()
      .then(function () {
        session.removeSessionStorage();
        $rootScope.session = null;
        $state.go('main', {}, {
          reload: true
        });
      }).then(null, $log.error);
  };

  vm.showContactForm = function () {
    var contactModalInstance = $modal.open({
      templateUrl: 'app/sections/contact/contact.html',
      controller: 'ContactCtrl as contact',
    });
  };

  vm.showLogin = function () {
    var loginModalInstance = $modal.open({
      templateUrl: 'app/sections/login/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'login',
      size: 'sm'
    });
  };

  vm.changeKagenLogoRoute = function () {
    if (session.userCtx.role==='operator' && session.viewUserCtx.role !== 'app-user') {
      $state.go('associates');
    } else if (session.viewUserCtx.role === 'app-user' || session.userCtx.role === 'app-user') {
      $state.go('allerrhythm');
    } else {
      $state.go('main')
    }
  };

  vm.stopViewingSiteAs = function () {
    session.logoutAsUser();
    if(session.userCtx.username === 'kagen') {
      $state.go('users');
    } else {
      $state.go('members');
    }
  };

  session.startSessionTimer();
};
