import { observer } from "mobx-react";
import React , { Component } from "react";
import PrizeInfoStore from "../stores/prizeInfoStore";
import AppComRenderer from "../electron/appCom/appComRenderer";
import WorkbookStore from "../stores/workbookStore";

export interface ISelectExcelFileViewPrizeProps extends React.HTMLAttributes<HTMLElement> {
       prizeInfo: PrizeInfoStore
}

@observer
export class SelectExcelFileViewPrize extends Component < ISelectExcelFileViewPrizeProps > {
    private _workbookStore:WorkbookStore;

    constructor(props: any) {
		super(props);
        this._workbookStore = WorkbookStore.getInstance();
	}

    /**
	 * Show Open Dialog Sync and Load spreadsheet from Excel file.
	 */
	private importExcelSpreadsheet = () => {
		let files = AppComRenderer.getInstance().showOpenDialogSync({ properties: ["openFile"], filters: [{name: "Excel spreadsheet", extensions: ["xlsx"]}]});
		if (files && files[0]) {
			this._workbookStore.loadWorkbook(files[0]);
			if(this._workbookStore.sheets){
                this.props.prizeInfo.excelSheet = this._workbookStore.sheets[0];

			}
            if(this._workbookStore.filepath){
                this.props.prizeInfo.filepath = this._workbookStore.filepath;
            }

		}				
	}

    render() {  
        let prizeInfo = this.props.prizeInfo; 
        if (prizeInfo) {
            return <div style ={{ width: "100%" }} >
                <button style={{margin:"10px"}} onClick={() => { this.importExcelSpreadsheet();	
                                                                this._workbookStore.syncData();}}> Select Excel file </button>
				<div className="fl-expand-child"></div>
                {this._workbookStore.filepath?
                    <div style={{padding:"8px"}}>
                        Workbook : {this._workbookStore.filepath} 
                    </div>
                :""}
            
            </div>
            
        } else {
            return null
        }       
        
    }
}