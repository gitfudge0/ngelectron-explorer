import template from './drive.html';
import controller from './drive.controller';
import './drive.scss';

let driveComponent = {
  bindings: {
    details: "="
  },
  template,
  controller
}

export default driveComponent;