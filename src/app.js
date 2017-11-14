import angular from 'angular';
import common from './common/common';
import sh from 'shelljs';

angular.module('app', [
  common
])
  .config(['$locationProvider', ($locationProvider) => {
    "ngInject";
    $locationProvider.html5Mode(true).hashPrefix('!');
  }])
  .controller("myctrl", ($scope) => {
    'ngInject';
    $scope.name = "IONASDOIANSDOI";
    sh.cd("C:/Users/dig14/Desktop");
    let items = sh.ls("-lA");
    $scope.items = items.map(item => {
      try{
        return {
          name: item.name,
          isDirectory: item.locked ? false : item.isDirectory()
        }
      } 
      finally {
        // do nothing
      }
      
    });
    console.log(items)
  })