import { app, BrowserWindow } from 'electron';
import AppComMain from './appCom/appComMain';


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
		//--- Open the pageA when app start
		AppComMain.getInstance().openWindow({windowName:"pageA", title:"Page A", maximize:true});
	}

	/**
	 * called once all windows are closed.
	 */
	private static onWindowAllClosed = () => {

		// Quit 
		if (process.platform !== "darwin") { 
			Main.application.quit(); 
		} else {
			process.exit();
		}

		Main.application.quit();

	}
}

Main.main();
