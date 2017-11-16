class folderController {
  constructor(fileFactory) {
  	'ngInject';
  	this.getlength = (item) => {
  		console.log(item)
  		return fileFactory.getContentLength(item)
  	}
  }
}

export default folderController;