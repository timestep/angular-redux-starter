import users from './users-service.js';
import UsersCtrl from './users-controller.js';
import UserSendNotificationCtrl from './users-notification-controller.js';

export default angular.module('kagenSite.users', [])
  .controller(UsersCtrl)
  .controller(UserSendNotificationCtrl)
  .factory(users)
  .name;
