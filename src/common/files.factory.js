import {
  reject, isNil, map,
  filter, propEq, prop,
  length, assoc, lensProp,
  init, over, toString
} from 'ramda';

import fs from 'fs.extra';
const util = require('util')
const path = require('path')

let fileFactory = () => {
  'ngInject';

  let fileFactoryFunctions = {

    getFiles: (path) => {

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
      currentList.folders = filter(propEq("isDirectory", true))(items)
      currentList.files = filter(propEq("isDirectory", false))(items)
      currentList = map(map(over(lensProp("ctime"),curr => getFormattedDate(curr))))(currentList)

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