import {
  toString, replace, length, take
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
    this.currentPos = 0;

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
      this.currentPos -= 1;
      if(this.currentPos == 1) {
        this.changeDirectory("")
        this.crumb = "My Computer";
      } else if(this.currentPos < 0) {
        this.currentPos = 0;
      } else {
        let tempStackPost = this.navStack[this.currentPos - 1];
        if(angular.isDefined(tempStackPost)) {
          this.path = tempStackPost;
          this.currentList = fileFactory.getFiles(tempStackPost);
          this.crumb = tempStackPost;
        }
      }
    }

    /**
     * Go forward a folder
     */
    this.goForward = () => {
      if(this.currentPos > length(this.navStack)) {
        this.currentPos = length(this.navStack)
      } else {
        let tempStackPost = this.navStack[this.currentPos];
        if(angular.isDefined(tempStackPost)) {
          this.path = tempStackPost;
          this.currentList = fileFactory.getFiles(tempStackPost);
          this.crumb = tempStackPost;
        }
        this.currentPos += 1;
      }
    }

    /**
     * Go to home 
     */
    this.goHome = () => {
      this.changeDirectory("");
    }

    /**
     * Change directory
     * @param {any} newItem = Directory to be navigated to
     */
    this.changeDirectory = (newItem = "", isDirectory = true) => {
      if(isDirectory) {
        this.currentPos += 1;
        newItem = newItem + "";
        this.isDiskPage = false;
        this.showNavOptions = true;

        // Navigations
        if(newItem == "") {
          fileFactory.getDrives.then(data => {
            this.driveList = data;
            console.log(this.driveList)
          })
          this.showNavOptions = false;
          this.isDiskPage = true;
          this.crumb = "My Computer";
          this.navStack = [];
          this.currentPos = 1;
          this.path = "";
        } else if(this.currentDir == newItem) {
          this.path = newItem + "/";
          this.path = normalizeString(this.path); // Normalize path string
          this.currentList = fileFactory.getFiles(this.path);
        } else {
          this.path = this.path + newItem + "/";
          this.path = normalizeString(this.path); // Normalize path string
          console.log(this.navStack[this.currentPos - 1])
          if(this.navStack[this.currentPos - 1] != this.path) {
            this.navStack = take(this.currentPos - 1, this.navStack);
          }
          this.currentList = fileFactory.getFiles(this.path);
        }

        this.navStack.push(this.path)

        // Show navigation options
        if(this.showNavOptions) {
          this.crumb = this.path; // Update breadcrumb
        }
      }
    }
    // Init call
    this.changeDirectory("");

    
  }
}

export default appController;