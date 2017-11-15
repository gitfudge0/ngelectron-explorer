import angular from 'angular';
import common from './common/common';
import appComponent from './app.component';
import Components from './components/components';

angular.module('app', [
  common,
  Components
])
  .config(['$locationProvider', ($locationProvider) => {
    "ngInject";
    $locationProvider.html5Mode(true).hashPrefix('!');
  }])

  .component('app', appComponent)