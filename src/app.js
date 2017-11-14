import angular from 'angular';
import common from './common/common';
import sh from 'shelljs';
import fs from 'fs.extra';
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
    let items = fs.readdirSync("C:/")
    $scope.items = items.map(item => {
      try{
        return {
          name: item,
          isDirectory: fs.lstatSync("C:/" + item).isDirectory()
        }
      } catch(err){
        
      }
    })
  })