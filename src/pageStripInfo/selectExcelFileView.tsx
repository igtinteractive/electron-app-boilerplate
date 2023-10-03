import { observer } from "mobx-react";
import React , { Component } from "react";
import StripInfoStore from "../stores/stripInfoStore";
import AppComRenderer from "../electron/appCom/appComRenderer";
import WorkbookStore from "../stores/workbookStore";

export interface ISelectExcelFileViewProps extends React.HTMLAttributes<HTMLElement> {
       stripInfo: StripInfoStore
}

@observer
export class SelectExcelFileView extends Component < ISelectExcelFileViewProps > {
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
				this.props.stripInfo.excelSheet = this._workbookStore.sheets[0];
			}
		}				
	}

    render() {  
        let stripInfo = this.props.stripInfo;   
        if (stripInfo) {
            return <div style ={{ width: "100%" }} >
                <button style={{margin:"10px"}} onClick={() => { this.importExcelSpreadsheet();	}}> Select Excel file </button>
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