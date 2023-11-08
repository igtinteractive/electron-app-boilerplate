import { observer } from "mobx-react";
import React , { Component } from "react";
import { InputControl } from "../sharedComponents/inputControl";
import PrizeStore from "../stores/prizeStore";
import WorkbookStore from "../stores/workbookStore";
import PrizeInfoStore from "src/stores/prizeInfoStore";

export interface IPrizeTableRowViewProps extends React.HTMLAttributes<HTMLElement> {
       prize: PrizeStore,
       prizeInfo: PrizeInfoStore
}

@observer
export class PrizeTableRowView extends Component < IPrizeTableRowViewProps > {
    private _workbookStore:WorkbookStore;

    constructor(props: any) {
		super(props);
        this._workbookStore = WorkbookStore.getInstance();
	}

    private removePrize = () => {
		this.props.prizeInfo?.removePrize(this.props.prize.name);
	}

    render() {
        let prize = this.props.prize;   
        let prizePays = this.props.prize.prizePays;
        let prizeValues = new Array<string>(); 
        
        prizePays.forEach((prizePay)=>{prizeValues.push(prizePay.value )})

        if (prize) {
            return <tr>

                 <td>{prize.name}</td>
                 {prizeValues && prizeValues.map((prizeValue) => <th key={prizeValue}>{prizeValue}</th>)}
                 
            </tr>
        } else {
            return null
        }       
        
    }
}