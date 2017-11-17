import {
  reject, isNil, map,
  filter, propEq, sortWith,
  length, lensProp, prop,
  over, descend, ascend
} from 'ramda';

import fs from 'fs.extra';
const di = require('vox-diskinfo')

let fileFactory = () => {
  'ngInject';

  let fileFactoryFunctions = {

    getDriveList: () => {
     return di.getDrives()
    },

    getFiles: (path, split = false) => {

      const getFormattedDate = (date) => {
        return date.getDay()+1 + "/" + (date.getMonth().toString()*1+1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
      } 

      let items = fs.readdirSync(path)
      items = items.map(item => {
        try{
          return {
            name: item,
            isDirectory: fs.lstatSync(path + item).isDirectory(),
            ctime: fs.lstatSync(path + item).ctime,
            path: path + item
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

    getContentLength: (path) => {
      let items = fs.readdirSync(path)
      items = items.map(item => {
        try{
          return {
            name: item,
            isDirectory: fs.lstatSync(path + item).isDirectory()
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