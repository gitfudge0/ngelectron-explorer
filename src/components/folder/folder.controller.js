class folderController {
  constructor(fileFactory) {
  	'ngInject';
  	this.getlength = (item) => {
  		return fileFactory.getContentLength(item)
  	}
  }
}

export default folderController;