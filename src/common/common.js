import './common.scss';
import fileFactory from './files.factory.js';

let commonModule = angular.module('app.common', [
])
  .factory('fileFactory', fileFactory)
  .name


export default commonModule;