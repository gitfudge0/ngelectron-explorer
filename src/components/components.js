import Titlebar from './titlebar/titlebar'
import Folder from './folder/folder';

let componentModule = angular.module('app.components', [
  Titlebar,
  Folder
])
  .name;

export default componentModule;