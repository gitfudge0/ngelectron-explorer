import template from './directoryItem.html';
import controller from './directoryItem.controller';
import './directoryItem.scss';

let folderComponent = {
  transclude: true,
  bindings: {
  	details: "="
  },
  template,
  controller
}

export default folderComponent;