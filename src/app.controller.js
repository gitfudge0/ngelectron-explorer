import {
  reject, isNil, map,
  filter, propEq, prop
} from 'ramda';
import fs from 'fs.extra';

class appController {
  constructor() {
    this.name = "Lol";

    this.path = "C:/";
    
    // Get list of items in current dir
    let items = fs.readdirSync(this.path)
    items = items.map(item => {
      try{
        return {
          name: item,
          isDirectory: fs.lstatSync(this.path + item).isDirectory()
        }
      } catch(err){}
    })
    items = reject(isNil())(items)

    // Split into folders and directories
    this.currentList = {}
    this.currentList.folders = filter(propEq("isDirectory", true))(items)
    this.currentList.files = filter(propEq("isDirectory", false))(items)
    this.currentList = map(
      map(prop("name"))
    )(this.currentList)
  }
}

export default appController;