import { observer } from "mobx-react";
import React , { Component } from "react";
import StripInfoStore from "../stores/stripInfoStore";
import { InputControl } from "../sharedComponents/inputControl";

export interface ICheckDisplayAttributeComboViewProps extends React.HTMLAttributes<HTMLElement> {
    stripInfoStore?:StripInfoStore
}

@observer
export class CheckDisplayAttributeComboView extends Component<ICheckDisplayAttributeComboViewProps> {

    constructor(props: any) {
		super(props);
	}

    private addNewStrip = () => {
		this.props.stripInfoStore?.addStrip();
	}

    render() { 
        let stripInfoStore =  this.props.stripInfoStore;
        if (stripInfoStore && stripInfoStore.excelSheet) {
            return <div style ={{ width: "100%", marginBottom: "5px" }} >
                <div className="fl-horiz-container">
                    Check the desired optional attributes to map:				
                </div>
                <div className="fl-horiz-container">
                    <div>
                        <input
                            type="checkbox"
                            id="MinComboEnabled"
                            name="MinComboEnabled"
                            value="MinComboEnabled"
                            checked={stripInfoStore.displayMinCombo}
                            onChange={(evt) => {
                                if(this.props.stripInfoStore){
                                    this.props.stripInfoStore.displayMinCombo = evt.target.checked;
                                }
                            }}
                            />
                            <label htmlFor="MinComboEnabled">Min</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="MaxComboEnabled"
                            name="MaxComboEnabled"
                            value="MaxComboEnabled"
                            checked={stripInfoStore.displayMaxCombo}
                            onChange={(evt) => {
                                if(this.props.stripInfoStore){
                                    this.props.stripInfoStore.displayMaxCombo = evt.target.checked;
                                }
                            }}
                            />
                            <label htmlFor="MaxComboEnabled">Max</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="ValueComboEnabled"
                            name="ValueComboEnabled"
                            value="ValueComboEnabled"
                            checked={stripInfoStore.displayValueCombo}
                            onChange={(evt) => {
                                if(this.props.stripInfoStore){
                                    this.props.stripInfoStore.displayValueCombo = evt.target.checked;
                                }
                            }}
                            />
                            <label htmlFor="ValueComboEnabled">Value</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="SuitComboEnabled"
                            name="SuitComboEnabled"
                            value="SuitComboEnabled"
                            checked={stripInfoStore.displaySuitCombo}
                            onChange={(evt) => {
                                if(this.props.stripInfoStore){
                                    this.props.stripInfoStore.displaySuitCombo = evt.target.checked;
                                }
                            }}
                            /> 
                            <label htmlFor="SuitComboEnabled">Suit</label>
                    </div>
                </div>
            </div>
        } else {
            return null
        }       
        
    }
}