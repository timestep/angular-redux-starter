import angular from 'angular';
import reportsEdit from './edit';
import reportsList from './list';
import reportsCreate from './create';
import reportsPortal from './reports-portal';

export default angular.module('kagenSite.reports',
  [
    reportsEdit,
    reportsList,
    reportsCreate,
    reportsPortal,
  ]
)
.name;
