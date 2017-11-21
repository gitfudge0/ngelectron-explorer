class folderController {
  constructor(fileFactory) {
    'ngInject';
    this.getlength = (dir) => {
      return fileFactory.getContentLength(dir)
    }
  }
}

export default folderController;