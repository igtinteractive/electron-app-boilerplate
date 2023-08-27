import { BrowserWindow } from "electron";

export default class WindowsManager {
    private static _instance: WindowsManager;

    /** Map of all current open windows */
    private _windows: Map<string, any> = new Map<string, any>();


    /** return the singleton for this class */
    public static getInstance = () => {
      if (!WindowsManager._instance) {
        WindowsManager._instance = new WindowsManager();   
      }
      return WindowsManager._instance;
    }

    /**
     * Open a modal window if not already open.
     * @param windowName The name of the window.
     * The window and window name must be setup in the ./webpackConfig/webpack.react.js entry and plugins
     */
    public openWindow = (windowName: string) => {

        console.log(" ----- ", windowName, this._windows.has(windowName), process.env.NODE_ENV)
        if (!this._windows.has(windowName)) {
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

            // win.addListener("focus", (evt:any) => {
            //     console.log("+++++++++++++ ", windowName, evt);
            // })
      
            win.addListener("closed", (evt:any) => {
                let w = this._windows.get(windowName);
                w.removeAllListeners()
                if (w) { this._windows.delete(windowName) }
            })
            

            this._windows.set(windowName, win);
            
            if (process.env.NODE_ENV != "production") {
              win.loadURL(`http://localhost:3000/${windowName}.html`);
              win.webContents.openDevTools();
            } else {        
              win.loadURL(`file://${__dirname}/${windowName}.html`);        
            } 
      
          }
    }

}