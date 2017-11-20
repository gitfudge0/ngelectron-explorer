import {
  reject, isNil, map,
  filter, propEq, sortWith,
  length, lensProp, prop,
  over, descend, ascend, pipe, divide, toString, split, trim, equals, splitEvery, fromPairs, __, head
} from 'ramda';

import fs from 'fs.extra';
const exec = require('child_process').exec

let fileFactory = ($q) => {
  'ngInject';

  let fileFactoryFunctions = {

    /**
     * Get the list of drives 
     * @returns promise
     */
    getDrives: $q((resolve) => {
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
    }),

    /**
     * Get list of files for a particular path
     * @param {string} dir - Directory whose content is to be fetched
     * @param {boolean} split - Boolean value to split result into separate folders/files
     * return list
     */
    getFiles: (dir, split = false) => {      
      const getFormattedDate = (date) => {
        return date.getDay()+1 + "/" + (date.getMonth().toString()*1+1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
      } 

      let items = fs.readdirSync(dir)
      items = items.map(item => {
        try{
          return {
            name: item,
            isDirectory: fs.lstatSync(dir + item).isDirectory(),
            ctime: fs.lstatSync(dir + item).ctime,
            dir: dir + item
          }
        } catch(err){}
      })
      items = reject(isNil())(items)
      
      // Split into folders and directories
      let currentList = {}
      if(split) {
        currentList.folders = filter(propEq("isDirectory", true))(items)
        currentList.files = filter(propEq("isDirectory", false))(items)
        currentList = map(map(over(lensProp("ctime"),curr => getFormattedDate(curr))))(currentList)
      } else {
        currentList = map(over(lensProp("ctime"),curr => getFormattedDate(curr)))(items)
        currentList = sortWith([descend(prop("isDirectory")),ascend(prop("name"))])(currentList)
      }

      return currentList;
    },

    /**
     * Get number of items in a directory
     * @param {string} dir - Directory whose count is to be found
     * @returns item count
     */
    getContentLength: (dir) => {
      let items = fs.readdirSync(dir)
      items = items.map(item => {
        try{
          return {
            name: item,
            isDirectory: fs.lstatSync(dir + item).isDirectory()
          }
        } catch(err){}
      })
      // items = reject(isNil())(items)
      return length(items)
    }
  }

  return fileFactoryFunctions;

}

export default fileFactory;