import Titlebar from './titlebar/titlebar'
import Folder from './directoryItem/directoryItem';
import Drive from './drive/drive';

let componentModule = angular.module('app.components', [
  Titlebar,
  Folder,
  Drive
])
  .name;

export default componentModule;