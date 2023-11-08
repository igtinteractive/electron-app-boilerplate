import { observer } from "mobx-react";
import React , { Component } from "react";
import { PrizeTableRowView } from "./prizeTableRowView";
import PrizeInfoStore from "../stores/prizeInfoStore";

export interface IPrizeTableViewProps extends React.HTMLAttributes<HTMLElement> {

    prizeInfo: PrizeInfoStore,

    /** function called when selection change bt user */
	onSelectionChange?: Function;
}

@observer
export class PrizeTableView extends Component < IPrizeTableViewProps > {

    constructor(props: any) {
		super(props);
	}

    render() {
        let prizes = new Array<any>();     
        let headers = this.props.prizeInfo.headers;
        this.props.prizeInfo.prizes?.forEach( (prize, name) => {
            prizes.push( 
                <PrizeTableRowView key={name} prize={prize} prizeInfo={this.props.prizeInfo}/>
            )
        })  
        if(prizes.length) {
            return <div style ={{ width: "100%" }} >
                <table>
                    <thead>
                        <tr>
                            {headers && headers.map((header) => <th key={header}>{header}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {prizes}
                    </tbody>
                </table>
            </div>
        } else {
            return null;
        }
    }
}