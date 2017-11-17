import {
  split, trim, pipe, reject, equals, splitEvery, map, fromPairs, append
} from 'ramda';

const exec = require('child_process').exec

class appController {
  constructor(fileFactory) {
    'ngInject';
    // Variables and flags
    this.path = "AOIBDOAISBD";
    this.driveList = [];
    this.currentList = [];
    this.isDiskPage = true;
    this.exec = exec
    // Get list of items in current dir

    // Functions
    this.changeDirectory = (newItem = "") => {
      let dl = [];
      if(newItem == "") {
        this.isDiskPage = true;
        this.exec('wmic logicaldisk get Caption, FreeSpace, Size /format:list', (err, data) => {
          let list = pipe(
            trim,
            split("\n"),
            reject(equals("")),
            splitEvery(3),
            map(
              map(
                split("=")
              )
            ),
            map(
              fromPairs
            )
          )(data);
          dl = list;
          console.log(this)
          
          console.log("yyy", dl)
          setTimeout((list) => {
            this.driveList = list
          }, 5000)
          // console.log("xxx", this.driveList)
        })
      }
      else if(newItem == -1) {
        this.isDiskPage = false;
      }
      else if(newItem == 1) {
        this.isDiskPage = false;
      }
      else {  
        this.isDiskPage = false;
        this.path = this.path + newItem + "/";
        this.currentList = fileFactory.getFiles(this.path);
      }
      // this.driveList = dl;
      console.log("A12", dl)
      // console.log("AXYT", this.driveList)
    }
    this.changeDirectory("");

    
  }
}

export default appController;