import angular from 'angular';

import allergenCategories from
  './allergen-categories/allergen-categories-service.js';

import allergyReports from
  './allergy-reports/allergy-reports-service.js';

import session from './session';
import capitalize from './capitalize/capitalize-filter.js';
import helper from './helper/helper-service.js';
import organizations from './organizations/organizations-service.js';
import notifications from './notifications/notifications-service.js';
import allergens from './allergens/allergens-service.js';
import watches from './watches/watches-service.js';

export default angular.module(
  'kagenSite.core',
  [
    allergenCategories,
    allergyReports,
    session,
    capitalize,
    helper,
    organizations,
    notifications,
    allergens,
    watches,
  ]
).name;
