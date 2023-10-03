import { observer } from "mobx-react";
import React , { Component } from "react";
import StripInfoStore from "../stores/stripInfoStore";
import WorkbookStore from "../stores/workbookStore";
import { InputControl } from "../sharedComponents/inputControl";

export interface IStripInfoViewProps extends React.HTMLAttributes<HTMLElement> {
    stripInfoStore?:StripInfoStore
}

@observer
export class StripInfoView extends Component<IStripInfoViewProps> {

    private _workbookStore:WorkbookStore;

    constructor(props: any) {
		super(props);
        this._workbookStore = WorkbookStore.getInstance();
	}

    render() {

        let sheets = this._workbookStore.sheets;  
        let stripInfoStore =  this.props.stripInfoStore;
        if (sheets && sheets.length>0 && stripInfoStore) {
            return <div style ={{ width: "100%" }} >
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
                <div style={{padding:"8px"}}>
                    Name :
                    <InputControl value={stripInfoStore.name} onChange={ (evt) => {
                                if(stripInfoStore){
                                    stripInfoStore.name = evt.target.value;
                                }
                        }}>
                    </InputControl>
                </div>
            </div>
        } else {
            return null
        }       
        
    }
}