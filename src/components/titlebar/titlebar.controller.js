const { remote } = require('electron')

class titlebarController {
  constructor() {
    /**
     * Minimize active window
     */
    this.minimizeWindow = () => {
      remote.BrowserWindow.getFocusedWindow().minimize();
    }

    /**
     * Maximize or unmaximize window
     */
    this.isMaximized = false;
    this.maximizeWindow = () => {
      const window = remote.getCurrentWindow();
      if(!this.isMaximized) {
        window.maximize();
        this.isMaximized = true;
      } else {
        window.unmaximize();
        this.isMaximized = false;
      }
    }

    /**
     * Close window
     */
    this.close = () => {
      const window = remote.getCurrentWindow()
      window.close()
    }
  }
}

export default titlebarController;