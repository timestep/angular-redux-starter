import React from 'react';
import ReactDOM from 'react-dom';

export default function MembersCtrl($scope, $window) {
  var vm = this;

  vm.init = function (){
    var membersApp = React.createElement($window.kagenairDashboard.membersApp, {});
    ReactDOM.render(membersApp, document.getElementById('members'));
  };

  $scope.$on('$destroy', function (){
    ReactDOM.unmountComponentAtNode(document.getElementById('members'));
  });

  vm.init();
}
