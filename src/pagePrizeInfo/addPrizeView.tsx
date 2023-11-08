import { observer } from "mobx-react";
import React , { Component } from "react";
import PrizeInfoStore from "../stores/prizeInfoStore";
import WorkbookStore from "../stores/workbookStore";
import { InputControl } from "../sharedComponents/inputControl";

export interface IAddPrizeViewProps extends React.HTMLAttributes<HTMLElement> {
    prizeInfoStore:PrizeInfoStore
}

@observer
export class AddPrizeView extends Component<IAddPrizeViewProps> {
    private _workbookStore:WorkbookStore;

    constructor(props: any) {
		super(props);
        this._workbookStore = WorkbookStore.getInstance();
	}

    private addNewPrize = () => {
		this.props.prizeInfoStore?.addPrize();
	}

    render() { 
        let prizeInfoStore = this.props.prizeInfoStore;
        if (prizeInfoStore) {
            return <div style ={{ width: "100%" }} >
                    Range :
                    <InputControl value={prizeInfoStore.tableRange} onChange={ (evt) => {
                                    prizeInfoStore.tableRange = evt.target.value;
                                    let headers = this._workbookStore.getCellHeadersBySheetAndRange(prizeInfoStore.excelSheet,prizeInfoStore.tableRange);
                                    let values = this._workbookStore.getCellValuesBySheetAndRange(prizeInfoStore.excelSheet,prizeInfoStore.tableRange);
                                    prizeInfoStore.headers = headers; 
     
                                    values.forEach((value)=>{
                                        this.props.prizeInfoStore.newPrizeName = value[prizeInfoStore.symbolIdColumn];
                                        this.props.prizeInfoStore.addPrize();
                                    })

                                    let prizes = this.props.prizeInfoStore.prizes
                                    prizes.forEach((prize)=>{
                                        prize.addPrizePays(values, headers);
                                    })
                                
                        }}>
                    </InputControl>
                </div>
        } else {
            return null
        }       
        
    }
}