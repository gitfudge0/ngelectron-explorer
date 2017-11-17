import {
  split, trim, pipe, reject, equals, splitEvery, map, fromPairs, over, lensProp, divide, head, __, toString, replace
} from 'ramda';

const exec = require('child_process').exec

class appController {
  constructor(fileFactory, $q) {
    'ngInject';
    // Variables and flags
    this.path = "";
    this.currentList = [];
    this.isDiskPage = true;
    // Get list of items in current dir

    // Functions

    /**
     * Get the list of drives 
     * @returns promise
     */
    let getDrives = $q((resolve) => {
      let list = null;
      exec('wmic logicaldisk get Caption, FreeSpace, Size, VolumeName, FileSystem /format:list', (err, data) => {
        list = pipe(
          trim,
          split("\n"),
          reject(equals("\r\r")),
          splitEvery(5),
          map(
            map(
              split("=")
            )
          ),
          map(
            fromPairs
          )
        )(data);
        list = pipe(
          map(
            over(
              lensProp("FreeSpace"),
              pipe(
                divide(__, 1048576),
                divide(__, 1024),
                toString,
                split("."),
                head
              )
            )
          ),
          map(
            over(
              lensProp("Size"),
              pipe(
                divide(__, 1048576),
                divide(__, 1024),
                toString,
                split("."),
                head
              )
            )
          )
        )(list);
        resolve(list)
      })
    })

    /**
     * Change directory
     * @param {any} newItem = Directory to be navigated to
     */
    this.changeDirectory = (newItem = "") => {
      newItem = newItem + "";
      if(newItem == "") {
        this.isDiskPage = true;
        getDrives.then(data => {
          this.driveList = data;
          console.log(this.driveList)
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
        if(this.path == "") {
          this.path = newItem + "/";
        } else {
          this.path = this.path + newItem + "/";
        }
        this.path = toString(this.path);
        this.path = replace(/\\r/g,"")(this.path);
        this.path = replace(/"/g, "", this.path)
        console.log(this.path)
        this.currentList = fileFactory.getFiles(this.path);
      }
    }
    // Init call
    this.changeDirectory("");

    
  }
}

export default appController;