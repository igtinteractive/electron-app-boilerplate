import { observer } from "mobx-react";
import React , { Component } from "react";
import { StripTableRowView } from "./stripTableRowView";
import StripInfoStore from "../stores/stripInfoStore";

export interface IStripTableViewProps extends React.HTMLAttributes<HTMLElement> {

    stripInfo: StripInfoStore,

    /** function called when selection change bt user */
	onSelectionChange?: Function;
}

@observer
export class StripTableView extends Component < IStripTableViewProps > {

    constructor(props: any) {
		super(props);
	}

    render() {
        let strips = new Array<any>();        
        this.props.stripInfo.strips?.forEach( (strip, name) => {
            strips.push( 
                <StripTableRowView key={name} strip={strip} stripInfo={this.props.stripInfo}/>
            )
        })  
        if(strips.length) {
            return <div style ={{ width: "100%" }} >
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Cell range</th>
                            <th>Column mapping</th>
                            <th>Preview</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {strips}
                    </tbody>
                </table>
            </div>
        } else {
            return null;
        }
    }
}