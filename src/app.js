import angular from 'angular';
import sh from 'shelljs';

angular.module('app', [

])
  .config(['$locationProvider', ($locationProvider) => {
    "ngInject";
    $locationProvider.html5Mode(true).hashPrefix('!');
  }])
  .controller("myctrl", ($scope) => {
    'ngInject';
    $scope.name = "IONASDOIANSDOI";
    let items = sh.ls("-lA");
    items = items.map(item => {
      return {
        name: item.name,
        isDirectory: item.locked ? false : item.isDirectory()
      }
    });
    console.log(items)
  })