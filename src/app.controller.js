const fs = require('fs.extra');
const path = require('path');
const util = require('util');


class appController {
  constructor(fileFactory) {
    'ngInject';
    this.name = "Lol";

    this.path = "C:/";
    
    // Get list of items in current dir
    this.currentList = fileFactory.getFiles(this.path)
    console.log(this.currentList)
    
    fs.lstat(this.path + "bootmgr", (err, stat) => {
      console.log("aaa", stat)
    })
    
    console.log(fileFactory.getContentLength(this.path))
  }
}

export default appController;