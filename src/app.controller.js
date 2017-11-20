import {
  split, trim, pipe, reject, equals, splitEvery, map, fromPairs, over, lensProp, divide, head, __, toString, replace, init, last, length, gt
} from 'ramda';


class appController {
  constructor(fileFactory) {
    'ngInject';
    // Variables and flags
    this.path = "";
    this.currentDir = "";
    this.currentList = [];
    this.isDiskPage = true;
    this.crumb = "My Computer";
    this.showNavOptions = false;
    this.navStack = [];

    // Functions
    /**
     * Converts input directory value into readable string
     * @param {any} value - Value which has to be converted
     * returns normalized string
     */
    const normalizeString = (value) => {
      value = toString(value);
      value = replace(/\\r/g,"")(value);
      value = replace(/"/g, "", value);
      return value;
    }

    /**
     * Sets current directory
     * @param {string} dir - Current directory
     */
    this.setPathValues = (dir) => {
      this.currentDir = dir;
      this.showNavOptions = true;
    }

    /**
     * Go back a folder
     */
    this.goBack = () => {
      let tempStack = init(this.navStack);
        console.log("tempStack", tempStack)
      // if(last(tempStack) != last(this.navStack)) {
      //   this.navStack = init(this.navStack);
      // }
      if(gt(length(tempStack), 0)) {
        this.path = last(tempStack);
        this.crumb = this.path;
        this.currentList = fileFactory.getFiles(this.path)
        console.log("navStack", this.navStack)
      }
    }

    /**
     * Change directory
     * @param {any} newItem = Directory to be navigated to
     */
    this.changeDirectory = (newItem = "") => {
      newItem = newItem + "";
      this.isDiskPage = false;
      this.showNavOptions = true;

      // Navigations
      if(newItem == "") {
        this.showNavOptions = false;
        this.isDiskPage = true;
        fileFactory.getDrives.then(data => {
          this.driveList = data;
          console.log(this.driveList)
        })
      } else if(this.currentDir == newItem) {
        this.path = newItem + "/";
        this.path = normalizeString(this.path); // Normalize path string
        this.crumb = this.path; // Update breadcrumb
        this.currentList = fileFactory.getFiles(this.path);
      } else {
        this.path = this.path + newItem + "/";
        this.path = normalizeString(this.path); // Normalize path string
        this.currentList = fileFactory.getFiles(this.path);
      }

      // // Update navigation stack
      // if(this.path != last(init(this.navStack)) && gt(length(this.navStack), 1)) {
      //   this.navStack = init(this.navStack)
      // }
      this.navStack.push(this.path)
      console.log(this.navStack)

      // Show navigation options
      if(this.showNavOptions) {
        this.crumb = this.path; // Update breadcrumb
      }
    }
    // Init call
    this.changeDirectory("");

    
  }
}

export default appController;