import Titlebar from './titlebar/titlebar'
import Folder from './directoryItem/directoryItem';

let componentModule = angular.module('app.components', [
  Titlebar,
  Folder
])
  .name;

export default componentModule;