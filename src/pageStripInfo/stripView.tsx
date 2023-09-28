import { observer } from "mobx-react";
import React , { Component } from "react";
import { InputControl } from "../sharedComponents/inputControl";
import StripStore from "../stores/stripStore";
import WorkbookStore from "../stores/workbookStore";
import StripInfoStore from "src/stores/stripInfoStore";

export interface IStripViewProps extends React.HTMLAttributes<HTMLElement> {
       strip?: StripStore,
       stripInfo: StripInfoStore
}

@observer
export class StripView extends Component < IStripViewProps > {
    private _workbookStore:WorkbookStore;

    constructor(props: any) {
		super(props);
        this._workbookStore = WorkbookStore.getInstance();
	}

    render() {
        let strip = this.props.strip;     
        let stripInfo = this.props.stripInfo;   
        if (strip) {
            let headers = this._workbookStore.getCellHeadersBySheetAndRange(stripInfo.excelSheet,strip.tableRange);
            return <fieldset style ={{ width: "300px", borderRadius: "8px", padding: "0px" }} >
                <legend style={{marginLeft:"10px"}}>Strip <span style={{fontSize:"0.8em", color:"gray", paddingLeft:"3px", paddingRight:"3px"}}>{strip.name}</span></legend>
                <div style={{padding:"8px"}}>
                    Cell range :
                    <InputControl value={strip.tableRange} onChange={ (evt) => {
                                if(strip){
                                    strip.tableRange = evt.target.value;
                                    let headers = this._workbookStore.getCellHeadersBySheetAndRange(stripInfo.excelSheet,strip.tableRange);
                                    strip.symbolIdColumn = headers[0];
                                    strip.weightColumn = headers[0];
                                }
                        }}>
                    </InputControl>
                </div>
                <div style={{padding:"8px"}}>
                    SymbolId column :
                    <select value={ strip.symbolIdColumn }
                        onChange={ (evt) => {
                            if(strip){
                                strip.symbolIdColumn = evt.target.value;
                            }
                        }}
                    >
                        {
                            Array.from(headers).map( (header) => {
                                return <option key={header} value={header}>{header}</option>;
                            })
                        }
                    </select>
                </div>
                <div style={{padding:"8px"}}>
                    Weight column :
                    <select value={ strip.weightColumn }
                        onChange={ (evt) => {
                            if(strip){
                                strip.weightColumn = evt.target.value;
                            }
                        }}
                    >
                        {
                            Array.from(headers).map( (header) => {
                                return <option key={header} value={header}>{header}</option>;
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