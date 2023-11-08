import { computed, makeAutoObservable, observable } from "mobx";
import * as fs from "fs-extra";
import * as XLSX from 'xlsx';

import AppComRenderer, { AppComEventTypes } from "../electron/appCom/appComRenderer";
import { ipcRenderer } from "electron";



export interface IWorkbookProps {
    appData : {
        workbook? : any,
        filepath? : string | null,
        selectedSheet : string,
        selectedRange? : string
    }
}

export default class WorkbookStore {
    
    private static _instance: WorkbookStore | undefined = undefined;
  
    @observable private _workbook: any | null = null;       
    @observable private _filepath: string | null = null;
    @observable private _selectedSheet: string = "";
    @observable private _selectedRange: string = "A1:A1";    

    public static getInstance = () => {
		if (!WorkbookStore._instance) {
            //*** create the static _instance for the singleton */
			WorkbookStore._instance = new WorkbookStore();
            
            //*** make it oservable for mobx decorator to work.*/
            makeAutoObservable(WorkbookStore._instance);
            
            //*** fetch data from electron main process and initialize */
            let appData = AppComRenderer.getInstance().getData("appData");
            this._instance?.initStore(JSON.parse(appData));
            
            //*** Data Sync Events **************************************************/
            ipcRenderer.on(AppComEventTypes.syncData, (evt, dataKey, stringJson) => {
                switch (dataKey) {
                    case "appData" :
                        this._instance?.initStore(JSON.parse(stringJson));
                        break;
                }
            });

		}
		return WorkbookStore._instance;
	}
    

    /**
     * Load the workbook from given file
     * and re-initialize the Spreadsheet Store with the new data.
     * @param filePath 
     */
    public loadWorkbook = (filePath:string) => {
        XLSX.set_fs(fs);
        this._filepath = filePath;
        this._workbook = XLSX.readFile(filePath);
    }

    public getSelectedCellValues = () => {
        let worksheet = this._workbook.Sheets[this._selectedSheet];
        if(XLSX.utils.decode_range(this._selectedRange).s.c==-1){
            return [];
        }
        let opts = {header:1, range : this._selectedRange};
        const data: any[] = XLSX.utils.sheet_to_json(worksheet, opts);
        return data;
    }

    private isValidRange = (range: string) => {
        return XLSX.utils.decode_range(range).s.c==-1;
    }

    public getCellValuesBySheetAndRange = (selectedSheet:string, selectedRange:string) => {
        let worksheet = this._workbook.Sheets[selectedSheet];
        let decodedRange = XLSX.utils.decode_range(selectedRange);
        if(decodedRange.s.c==-1){
            return [];
        }
        decodedRange.s.r +=1;
        let opts = {header:1, range : XLSX.utils.encode_range(decodedRange)};
        const data: any[] = XLSX.utils.sheet_to_json(worksheet, opts);
        return data;
    }
    public getFirstRowCellValuesBySheetAndRange = (selectedSheet:string, selectedRange:string) => {
        let worksheet = this._workbook.Sheets[selectedSheet];
        let decodedRange = XLSX.utils.decode_range(selectedRange);
        if(decodedRange.s.c==-1){
            return [];
        }
        decodedRange.s.r +=1;
        decodedRange.e.r = decodedRange.s.r;
        let opts = {header:1, range : XLSX.utils.encode_range(decodedRange)};
        const data: any[] = XLSX.utils.sheet_to_json(worksheet, opts);
        return data[0];
    }
    public getLastRowCellValuesBySheetAndRange = (selectedSheet:string, selectedRange:string) => {
        let worksheet = this._workbook.Sheets[selectedSheet];
        let decodedRange = XLSX.utils.decode_range(selectedRange);
        if(decodedRange.s.c==-1){
            return [];
        }
        decodedRange.s.r = decodedRange.e.r;
        let opts = {header:1, range : XLSX.utils.encode_range(decodedRange)};
        const data: any[] = XLSX.utils.sheet_to_json(worksheet, opts);
        return data[0];
    }

    public getRowCountByRange = (selectedRange:string) => {
        let decodedRange = XLSX.utils.decode_range(selectedRange);
        if(decodedRange.s.c==-1){
            return 0;
        }
        return decodedRange.e.r-decodedRange.s.r;
    }

    public getCellHeadersBySheetAndRange = (selectedSheet:string, selectedRange:string) : string[] => {
        let worksheet = this._workbook.Sheets[selectedSheet];
        let decodedRange = XLSX.utils.decode_range(selectedRange);
        if(decodedRange.s.c==-1){
            return [];
        }
        decodedRange.e.r = decodedRange.s.r;
        let opts = {header:1, range : XLSX.utils.encode_range(decodedRange)};
        const data: string[][] = XLSX.utils.sheet_to_json(worksheet, opts);
        let headers : string[] = data[0];
        return headers;
    }

    /**
     * Clear existing data and (re)Initialize the WorkbookStore.
     * @param projectProps IWorkbookProps
     */
    public initStore = (projectProps: IWorkbookProps) => {
        this._workbook = projectProps.appData.workbook ? projectProps.appData.workbook : null;
        this._filepath = projectProps.appData.filepath ? projectProps.appData.filepath : null;
        this._selectedSheet = projectProps.appData.selectedSheet ? projectProps.appData.selectedSheet : "";
        this._selectedRange = projectProps.appData.selectedRange ? projectProps.appData.selectedRange : "";

    }

    /**
     * Syncronize the data between all windows.
     * dispatch AppComEventTypes.syncData to the AppComMain
     * wich then re-dispatch the AppComEventTypes.syncData to all windows.
     */
    public syncData = () => {
        AppComRenderer.getInstance().syncData("appData", JSON.stringify(this.getJson()));
    }

    public getJson = () => {
        let workbook = this._workbook;
        let filepath = this._filepath
        let selectedSheet = this._selectedSheet
        let selectedRange = this._selectedRange
       
        let appdata = {
           
            appData : {
                workbook: workbook, 
                filepath : filepath, 
                selectedSheet : selectedSheet,
                selectedRange : selectedRange
            }
        }       

        return appdata;
    }


    @computed
    public get workbook(): any | null {
        return this._workbook;
    }
    public set workbook(value: any | null) {
        this._workbook = value;
    }

    public get sheets(): Array<string> {
        return this._workbook?.SheetNames;
    }

    @computed
    public get filepath(): string | null {
        return this._filepath;
    }
    public set filepath(value: string | null) {
        this._filepath = value;
    }

    @computed
    public get selectedSheet(): string {
        return this._selectedSheet;
    }
    public set selectedSheet(value: string) {
        this._selectedSheet = value;
    }

    @computed
    public get selectedRange(): string {
        return this._selectedRange;
    }
    public set selectedRange(value: string) {
        this._selectedRange = value;
    }
}