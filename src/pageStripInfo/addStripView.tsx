import { observer } from "mobx-react";
import React , { Component } from "react";
import StripInfoStore from "../stores/stripInfoStore";
import WorkbookStore from "../stores/workbookStore";
import { InputControl } from "../sharedComponents/inputControl";

export interface IAddStripViewProps extends React.HTMLAttributes<HTMLElement> {
    stripInfoStore?:StripInfoStore
}

@observer
export class AddStripView extends Component<IAddStripViewProps> {

    private _workbookStore:WorkbookStore;
    private _newStripName:string="";

    constructor(props: any) {
		super(props);
        this._workbookStore = WorkbookStore.getInstance();
	}

    private addNewStrip = () => {
		this.props.stripInfoStore?.addStrip(this._newStripName);
	}

    render() { 
        let stripInfoStore =  this.props.stripInfoStore;
        if (stripInfoStore && stripInfoStore.excelSheet) {
            return <fieldset style ={{ width: "100%", borderRadius: "8px" }} >
                <h3>Add new strip</h3>
                <div className="fl-horiz-container">				
                    <div style={{padding:"8px"}}>
                        Name :
                        <InputControl value={this._newStripName} onChange={ (evt) => {
                                    this._newStripName = evt.target.value;
                            }}>
                        </InputControl>
                        <button style={{margin:"10px"}} onClick={() => { this.addNewStrip();	}}> Add </button>
                    </div>
                </div>
            </fieldset>
        } else {
            return null
        }       
        
    }
}