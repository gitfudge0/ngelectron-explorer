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
     * Toggle screen size
     */
    this.isFullscreen = remote.BrowserWindow.getFocusedWindow().isFullScreen();
    this.maximizeWindow = () => {
      if(this.isFullscreen) {
        this.isFullscreen = false;
        remote.BrowserWindow.getFocusedWindow().setSize(1200, 700);
      } else {
        this.isFullscreen = true;
        remote.BrowserWindow.getFocusedWindow().setFullScreen(true);
      }
    }
  }
}

export default titlebarController;