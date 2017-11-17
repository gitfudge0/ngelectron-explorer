import {
  reject, isNil, map,
  filter, propEq, sortWith,
  length, lensProp, prop,
  over, descend, ascend
} from 'ramda';

import fs from 'fs.extra';

let fileFactory = () => {
  'ngInject';

  let fileFactoryFunctions = {
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