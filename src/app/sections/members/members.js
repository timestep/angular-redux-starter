import angular from 'angular';
import membersService from './members-service.js';
import MembersCtrl from './members-controller.js';

export default angular.module('kagenSite.members', [])
  .controller(MembersCtrl)
  .factory(membersService)
  .name;
