import fs from 'fs.extra';

class appController {
  constructor() {
    this.name = "Lol";
    console.log("oiadsoias")
    let items = fs.readdirSync("C:/")
    this.items = items.map(item => {
      try{
        return {
          name: item,
          isDirectory: fs.lstatSync("C:/" + item).isDirectory()
        }
      } catch(err){}
    })
  }
}

export default appController;