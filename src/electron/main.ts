import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import WindowManager from './windowsManager';


export default class Main {
  /** the Electron Apllication  */
	static application: Electron.App;


  /** Main constructor */
  static main() {
    Main.application = app;
		Main.application.on("window-all-closed", Main.onWindowAllClosed);
		Main.application.on("ready", Main.onReady);
  }

  /** called when the Application in initialize and ready */
	private static onReady = () => {
    WindowManager.getInstance().openWindow("loadPage");
    setInterval(() => {
      WindowManager.getInstance().openWindow("test");
    }, 5000)
  }

  /**
   * called once all windows are closed. 
   */
  private static onWindowAllClosed = () => {    

    if (process.platform !== "darwin") { 
      Main.application.quit(); 
    } else {
      process.exit();
    }

    Main.application.quit();

  }
}

Main.main();
