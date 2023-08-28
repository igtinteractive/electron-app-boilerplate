import { BrowserWindow, Menu, ipcMain } from "electron";
import { AppComEventTypes } from "./appComRemote";

export default class AppComMain {
    private static _instance: AppComMain;

    /** Map of all current open windows */
    private _windows: Map<string, any> = new Map<string, any>();

	//** Array of menuClick Call back functoin */
	private static _menuClickListener = Array<Function>();


    /** return the singleton for this class */
    public static getInstance = () => {
		if (!AppComMain._instance) {
			AppComMain._instance = new AppComMain();

			ipcMain.on(AppComEventTypes.openWindow, async (event, args) => {
				this._instance.openWindow(args);
				event.returnValue = "done";
			});

			ipcMain.on(AppComEventTypes.loadPage, async (event, args) => {
				this._instance.loadPage(args);
				event.returnValue = "done";
			});

			ipcMain.on(AppComEventTypes.setApplicationMenu, async (event, args) => {            
				let menu = Menu.buildFromTemplate(JSON.parse(args));
				this.setMenuClick(menu);
				Menu.setApplicationMenu(menu);
				event.returnValue = "done";
			});

			ipcMain.on(AppComEventTypes.setMenu, async (event, args) => {            
				let menu = Menu.buildFromTemplate(JSON.parse(args));
				this.setMenuClick(menu);
				let win = BrowserWindow.getFocusedWindow();
				if (win) {
					win.setMenu(menu);
				}
				event.returnValue = "done";
			});

      }
      return AppComMain._instance;
    }

    private static setMenuClick = (menu:Menu) => {
		menu.items.forEach( (menuItem, index) => {			
			if (menuItem.id) { menuItem.click = () => {                
				let win = BrowserWindow.getFocusedWindow();				
				if (win) { win.webContents.send(AppComEventTypes.onMenuClick, menuItem.id); }
			}}
			if (menuItem.submenu) {
				this.setMenuClick(menuItem.submenu);
			}
		});
  	}

    /**
     * Open a modal window if not already open.
     * @param windowName The name of the window.
     * The window and window name must be setup in the ./webpackConfig/webpack.react.js entry and plugins
     */
    public openWindow = (options:{windowName: string, title?:string}) => {
       
        if (!this._windows.has(options.windowName)) {
			let win = new BrowserWindow({
				width: 800,
				height: 600,
				webPreferences: {
					nodeIntegration: true,
					contextIsolation: false,
					nodeIntegrationInWorker: true,
					webSecurity: false
				}				
			});	
			
			//-- reset window title
			if (options.title) {
				win.setTitle(options.title);
			}	

			win.addListener("closed", (evt:any) => {
				let w = this._windows.get(options.windowName);
				w.removeAllListeners()
				if (w) { this._windows.delete(options.windowName) }
			})			

			this._windows.set(options.windowName, win);
			
			if (process.env.NODE_ENV != "production") {
				win.loadURL(`http://localhost:3000/${options.windowName}.html`);
				win.webContents.openDevTools();
			} else {        
				win.loadURL(`file://${__dirname}/${options.windowName}.html`);        
			} 
	
		} else {
			let win:BrowserWindow = this._windows.get(options.windowName);
			if (win) {
				win.focus();
			}
		}
    }

	public loadPage = (options:{windowName: string, title?:string}) => {

		//--- if the window name exist set that window focus.
		if (this._windows.has(options.windowName)) {
			let win:BrowserWindow = this._windows.get(options.windowName);
			if (win) {
				win.focus();
			}
		} else { 			
			let win = BrowserWindow.getFocusedWindow();			
			if (win) { 				
				//-- find the current windowName
				let removeName: string | null = null;
				this._windows.forEach( (browserWindow, windowName) => {
					if (browserWindow == win) {
						removeName = windowName;						
					}
				})

				//-- remove the current window from the winsdows map.
				//-- and clear all listeners.
				if (removeName) {					
					win.removeAllListeners()
					this._windows.delete(removeName);
				}
				
				//-- reset window title
				if (options.title) {
					win.setTitle(options.title);
				}	

				//-- load page and reset listener
				win.addListener("closed", (evt:any) => {
					let w = this._windows.get(options.windowName);
					w.removeAllListeners()
					if (w) { this._windows.delete(options.windowName) }
				})			
	
				//-- set the windows map 
				this._windows.set(options.windowName, win);
				
				//-- load the page into the window.
				if (process.env.NODE_ENV != "production") {
					win.loadURL(`http://localhost:3000/${options.windowName}.html`);
					win.webContents.openDevTools();
				} else {        
					win.loadURL(`file://${__dirname}/${options.windowName}.html`);        
				} 

			}
		}
	}

}