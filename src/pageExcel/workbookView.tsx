import { observer } from "mobx-react";
import React , { Component } from "react";
import WorkbookStore from "../stores/workbookStore";
import { InputControl } from "../sharedComponents/inputControl";

@observer
export class WorkbookView extends Component {

    private _workbookStore:WorkbookStore;

    constructor(props: any) {
		super(props);
        this._workbookStore = WorkbookStore.getInstance();
	}

    render() {

        let sheets = this._workbookStore.sheets;   
        if (sheets && sheets.length>0) {
            let selectedCells = this._workbookStore.getSelectedCellValues();
            return <fieldset style ={{ width: "100%", borderRadius: "8px" }} >
                <div style={{padding:"8px"}}>
                    Workbook : {this._workbookStore.filepath} 
                </div>
                <div style={{padding:"8px"}}>
                    Sheet :
                    <select value={ this._workbookStore.selectedSheet }
                        onChange={ (evt) => {
                            this._workbookStore.selectedSheet = evt.target.value;
                        }}
                    >
                        {
                            Array.from(this._workbookStore.sheets).map( (sheet) => {
                                return <option key={sheet} value={sheet}>{sheet}</option>;
                            })
                        }
                    </select>
                </div>
                <div style={{padding:"8px"}}>
                    Range :
                    <InputControl value={this._workbookStore.selectedRange} onChange={ (evt) => {
                            this._workbookStore.selectedRange = evt.target.value;
                        }}>
                    </InputControl>
                </div>
                <div style={{padding:"8px"}}>
                    <table>
                        <tbody>
                        {
                            selectedCells.map( (row, rowIndex) => (
                                    <tr key={"Row"+rowIndex}>
                                        {
                                            row.map( (cell:string, cellIndex:number) => (
                                                <td key={"Cell"+rowIndex+"-"+cellIndex}>{cell}</td>
                                            )
                                            )
                                        }
                                    </tr>
                                )
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </fieldset>
        } else {
            return null
        }       
        
    }
}