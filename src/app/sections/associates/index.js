import angular from 'angular';
import core from '../../core';

import AssociatesEditCtrl from './associates-edit-controller.js';
import AssociatesOrgAdminCtrl from './associates-admin-user-controller.js';
import AssociatesCtrl from './associates-controller.js';

import associateViewHelper from './associate-view-helper.js';
import { accountTypes } from './associates-data.js';

export default angular.module('kagenSite.associates', [core])
  .factory(associateViewHelper)
  .controller(AssociatesEditCtrl)
  .controller(AssociatesOrgAdminCtrl)
  .controller(AssociatesCtrl)
  .value(accountTypes)
  .name;
