import { observer } from "mobx-react";
import React , { Component } from "react";
import { IStripStore } from "src/stores/stripStore";

export interface IStripListViewProps extends React.HTMLAttributes<HTMLElement> {

    strips?:Map<string, IStripStore>,
    selectedStripName?:string | null

    /** function called when selection change bt user */
	onSelectionChange?: Function;
}

@observer
export class StripListView extends Component < IStripListViewProps > {

    constructor(props: any) {
		super(props);
	}

    render() {
        //console.log("[StripListView render]");

        let strips = new Array<any>();        
        this.props.strips?.forEach( (strip, name) => {
            let bgColor:string | undefined = this.props.selectedStripName == name ? "gray" : undefined;
            strips.push( 
                <div key={name} style={{margin:"10px", backgroundColor:bgColor}} onClick={(evt) => {                
                    if (this.props.onSelectionChange) {
                        this.props.onSelectionChange(name);
                    }                
                }}>
                    - {strip.name}
                </div> 
            )
        })  
        if(strips.length) {
            return <fieldset style ={{ width: "300px", borderRadius: "8px", padding: "0px" }} >
                <legend style={{marginLeft:"10px"}}>Strips</legend>
                {strips}
            </fieldset>
        } else {
            return null;
        }
    }
}