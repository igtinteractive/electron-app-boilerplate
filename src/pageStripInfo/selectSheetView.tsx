import { observer } from "mobx-react";
import React , { Component } from "react";
import StripInfoStore from "../stores/stripInfoStore";
import WorkbookStore from "../stores/workbookStore";

export interface ISelectSheetViewProps extends React.HTMLAttributes<HTMLElement> {
    stripInfoStore?:StripInfoStore
}

@observer
export class SelectSheetView extends Component<ISelectSheetViewProps> {

    private _workbookStore:WorkbookStore;

    constructor(props: any) {
		super(props);
        this._workbookStore = WorkbookStore.getInstance();
	}

    render() {

        let sheets = this._workbookStore.sheets;  
        let stripInfoStore =  this.props.stripInfoStore;
        if (sheets && sheets.length>0 && stripInfoStore) {
            return <fieldset style ={{ width: "100%", borderRadius: "8px" }} >
                <div style={{padding:"8px"}}>
                    Sheet :
                    <select value={ stripInfoStore.excelSheet }
                        onChange={ (evt) => {
                            if(stripInfoStore){
                                stripInfoStore.excelSheet = evt.target.value;
                            }
                        }}
                    >
                        {
                            Array.from(this._workbookStore.sheets).map( (sheet) => {
                                return <option key={sheet} value={sheet}>{sheet}</option>;
                            })
                        }
                    </select>
                </div>
            </fieldset>
        } else {
            return null
        }       
        
    }
}