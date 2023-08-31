import { ipcRenderer } from "electron";

export enum AppComEventTypes {
    openWindow = "openWindow",
    closeWindow = "closeWindow",
    loadPage = "loadPage",
    setApplicationMenu = "setApplicationMenu",
    setMenu = "setMenu",
    onMenuClick = "onMenuClick",
    getData = "getData",
    syncData = "syncData"
}

export default class AppComRenderer {

    private static _instance: AppComRenderer;

    private _menuClickListener = Array<Function>();

    public static getInstance = () => {
        if (!AppComRenderer._instance) {
            AppComRenderer._instance = new AppComRenderer();

            //*** Menu Events *************************************/
            ipcRenderer.on(AppComEventTypes.onMenuClick, (evt, args) => {
                this._instance._menuClickListener.forEach( ( callback, index) => {                    
                    callback(args);
                })
            });
        }

        return AppComRenderer._instance;
    }

    //***********************************************************************************/
    //*** Windows ***********************************************************************/
    //***********************************************************************************/

    /**
     * Open a modal window if not already open.
     * @param windowName name of the window ( difine in the ./webpackConfig/webpack.react.js )
     * @param title (optional) the title to display on the widows bar.
     * @param maximize (optional) wheter to miximaize the window when it opens ( if size is not define ).
     * @param size (optional) the with and height of the windows when it opens. ( maximize is ignore if size is specifed )
     * 
     * The window and window name must be setup in the ./webpackConfig/webpack.react.js entry and plugins
     */
    public openWindow = (windowName:string, title?:string, maximize?:boolean, size?:{width:number, height:number} ) => {        
        ipcRenderer.sendSync(AppComEventTypes.openWindow, {windowName:windowName, title:title, maximize:maximize, size:size});
    }

    /**
     * Close a windows if it is open.
     * @param windowName 
     */
    public closeWindow = (windowName:string) => {
        ipcRenderer.sendSync(AppComEventTypes.closeWindow, windowName);
    }

    /**
     * Load a page in the current "focus" window. 
	 * If thew page is already open in a other window, that window will be focus.
     * @param windowName name of the window ( difine in the ./webpackConfig/webpack.react.js )
     * @param title (optional) the title to display on the widows bar.
     */
    public loadPage = (windowName:string, title?:string) => {
        ipcRenderer.sendSync(AppComEventTypes.loadPage, {windowName:windowName, title:title});
    }

    //***********************************************************************************/
    //*** Menu **************************************************************************/
    //***********************************************************************************/

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

    //***********************************************************************************/
    //*** Data Synch ********************************************************************/
    //***********************************************************************************/

    /**
     * retrive the data from AppComMain for the given key.
     * @param dataKey the unique of the data set.
     * @returns 
     */
    public getData = (dataKey:string) => {
        return ipcRenderer.sendSync(AppComEventTypes.getData, dataKey);
    }

    /**
     * dispatch AppComEventTypes.syncData event to the appComMain.
     * This will update the dat on appComMain and dispatch a AppComEventTypes.syncData to all open windows
     * with the new updated data.
     * @param dataKey 
     * @param jsonString
     */
    public syncData = (dataKey: string, jsonString:any) => {
        ipcRenderer.sendSync(AppComEventTypes.syncData, dataKey, jsonString);
    }

}