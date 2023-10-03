import { observer } from "mobx-react";
import React , { Component } from "react";
import StripInfoStore from "../stores/stripInfoStore";
import { InputControl } from "../sharedComponents/inputControl";

export interface IAddStripViewProps extends React.HTMLAttributes<HTMLElement> {
    stripInfoStore?:StripInfoStore
}

@observer
export class AddStripView extends Component<IAddStripViewProps> {

    constructor(props: any) {
		super(props);
	}

    private addNewStrip = () => {
		this.props.stripInfoStore?.addStrip();
	}

    render() { 
        let stripInfoStore =  this.props.stripInfoStore;
        if (stripInfoStore && stripInfoStore.excelSheet) {
            return <div style ={{ width: "100%", marginBottom: "5px"}} >
                <div className="fl-horiz-container">				
                    Add new strip
                </div>
                <div className="fl-horiz-container">				
                    <div>
                        Name :
                        <InputControl value={stripInfoStore.newStripName} 
                            onChange={ (evt) => {
                                if(this.props.stripInfoStore){
                                    this.props.stripInfoStore.newStripName = evt.target.value;
                                }
                            }}
                            onKeyDown={ (evt) => {
                                if(this.props.stripInfoStore && evt.key == "Enter"){
                                    this.props.stripInfoStore.newStripName = evt.currentTarget.value;
                                    this.addNewStrip();
                                }
                            }}
                            />
                        <button style={{margin:"10px"}} onClick={() => { this.addNewStrip();	}}> Add </button>
                    </div>
                </div>
            </div>
        } else {
            return null
        }       
        
    }
}