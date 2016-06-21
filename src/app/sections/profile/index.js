import angular from 'angular';
import ProfileCtrl from './profile-controller.js';
import {
  knownAllergies,
  currentMedications,
  medicalConditions,
  householdPets,
  resultsList,
} from './profile-data';
import multiSelect from './profile-directive.js';
import results from './profile-results-directive.js';
import {
  profile,
  profileViewHelper,
} from './profile-service.js';

export default angular.module('kagenSite.profile', [])
  .controller(ProfileCtrl)
  .value(knownAllergies)
  .value(currentMedications)
  .value(medicalConditions)
  .value(householdPets)
  .value(resultsList)
  .directive(multiSelect)
  .directive(results)
  .service(profile)
  .service(profileViewHelper)
  .name;
