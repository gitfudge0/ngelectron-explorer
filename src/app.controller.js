class appController {
  constructor(fileFactory) {
    'ngInject';
    this.name = "Lol";

    this.path = "C:/";
    
    fileFactory.getDriveList().getDrives((err, drives) => {
      this.driveList = drives;
      console.log(this.driveList)
    })

    // Get list of items in current dir
    this.currentList = fileFactory.getFiles(this.path)

    // Functions
    this.changeDirectory = (newItem = "") => {
      if(newItem == "") {}
      else if(newItem == -1) {}
      else {  
        this.path = this.path + newItem + "/";
        this.currentList = fileFactory.getFiles(this.path);
      }
    }
    
  }
}

export default appController;