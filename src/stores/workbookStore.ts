import { computed, makeAutoObservable, observable } from "mobx";
import * as fs from "fs-extra";
import * as XLSX from 'xlsx';

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
        let workbook = this._workbook;
        let worksheet = workbook.Sheets[this._selectedSheet];
        let opts = {header:1, range : this._selectedRange};
        if(XLSX.utils.decode_range(this._selectedRange).s.c==-1){
            return [];
        }
        const data: any[] = XLSX.utils.sheet_to_json(worksheet, opts);
        return data;
    }

    /**
     * Clear existing data and (re)Initialize the WorkbookStore.
     * @param projectProps IWorkbookProps
     */
    public initStore = (projectProps: IWorkbookProps) => {
        this._workbook = projectProps.appData.workbook ? projectProps.appData.workbook : null;
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