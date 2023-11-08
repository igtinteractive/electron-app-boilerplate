import { observer } from "mobx-react";
import React , { Component } from "react";
import PrizeInfoStore from "../stores/prizeInfoStore";
import WorkbookStore from "../stores/workbookStore";
import { InputControl } from "../sharedComponents/inputControl";

export interface IPrizeInfoViewProps extends React.HTMLAttributes<HTMLElement> {
    //paytableStore?:PaytableStore
    prizeInfoStore?:PrizeInfoStore
}

@observer
export class PrizeInfoView extends Component<IPrizeInfoViewProps> {

    private _workbookStore:WorkbookStore;

    constructor(props: any) {
		super(props);
        this._workbookStore = WorkbookStore.getInstance();
	}

    private getSheet(value: string, prizeInfoStore: PrizeInfoStore){
        prizeInfoStore.excelSheet = value;
    }

    render() {

        let sheets = this._workbookStore.sheets;  
        let prizeInfoStore =  this.props.prizeInfoStore;
        if (sheets && sheets.length>0 && prizeInfoStore) {
            prizeInfoStore.excelSheet = sheets[0];
            return <div style ={{ width: "100%" }} >
                <div style={{padding:"8px"}}>
                        Workbook : {this._workbookStore.filepath} 
                    </div>
                <div style={{padding:"8px"}}>
                    Sheet :
                    <select value={ prizeInfoStore.excelSheet }
                        onChange={ (evt) => {
                            if(prizeInfoStore){
                                prizeInfoStore.excelSheet = evt.target.value;
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
                    <InputControl value={prizeInfoStore.name} onChange={ (evt) => {
                                if(prizeInfoStore){
                                    prizeInfoStore.name = evt.target.value;
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