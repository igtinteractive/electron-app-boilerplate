import { ipcRenderer } from "electron";

export enum AppComEventTypes {
    openWindow = "openWindow",
    loadPage = "loadPage",
    setApplicationMenu = "setApplicationMenu",
    setMenu = "setMenu",
    onMenuClick = "onMenuClick"
}

export default class AppComRemote {

    private static _instance: AppComRemote;

    private _menuClickListener = Array<Function>();

    public static getInstance = () => {
        if (!AppComRemote._instance) {
            AppComRemote._instance = new AppComRemote();

            ipcRenderer.on(AppComEventTypes.onMenuClick, (evt, args) => {
                this._instance._menuClickListener.forEach( ( callback, index) => {                    
                    callback(args);
                })
            });
        }

        return AppComRemote._instance;
    }

    /**
    * Open a modal window if not already open.
    * @param windowName The name of the window.
    * The window and window name must be setup in the ./webpackConfig/webpack.react.js entry and plugins
    */
    public openWindow = (windowName:string, title?:string, maximize?:boolean, size?:{width:number, height:number} ) => {        
        ipcRenderer.sendSync(AppComEventTypes.openWindow, {windowName:windowName, title:title, maximize:maximize, size:size});
    }

    public loadPage = (windowName:string, title?:string) => {
        ipcRenderer.sendSync(AppComEventTypes.loadPage, {windowName:windowName, title:title});
    }

    /**
     * set the Aplication menu ( all windows )
     * @param menu
     */
    public setApplicationMenu = (menu: any) => {
        ipcRenderer.sendSync(AppComEventTypes.setApplicationMenu, JSON.stringify(menu));
    }

    /**
     * Set the Current Windows menu ( other windows remain the same )
     * @param menu Electron.Menu
     */
    public setMenu = (menu: any) => {        
        ipcRenderer.sendSync(AppComEventTypes.setMenu, JSON.stringify(menu));
    }


    /**
     * Add click event listener current windows menu.
     * @param callback The fonction to call once menuiis click.
     */
    public addMenuClickListener = (callback: Function) => {
        let index = this._menuClickListener.indexOf(callback)
        if (index < 0 ) {
            this._menuClickListener.push(callback);
        }
    }

     /**
     * Remove click event listener current windows menu.
     * @param callback The fonction to call once menuiis click.
     */
    public removeMenuClickListener = (callback: Function) => {
        let index = this._menuClickListener.indexOf(callback);
        if (index >= 0) {
            this._menuClickListener.splice(index, 1);
        }
    }
}