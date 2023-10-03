import { observer } from "mobx-react";
import React , { Component } from "react";
import { InputControl } from "../sharedComponents/inputControl";
import StripStore from "../stores/stripStore";
import WorkbookStore from "../stores/workbookStore";
import StripInfoStore from "src/stores/stripInfoStore";

export interface IStripTableRowViewProps extends React.HTMLAttributes<HTMLElement> {
       strip: StripStore,
       stripInfo: StripInfoStore
}

@observer
export class StripTableRowView extends Component < IStripTableRowViewProps > {
    private _workbookStore:WorkbookStore;

    constructor(props: any) {
		super(props);
        this._workbookStore = WorkbookStore.getInstance();
	}

    private removeStrip = () => {
		this.props.stripInfo?.removeStrip(this.props.strip.name);
	}

    render() {
        let strip = this.props.strip;     
        let stripInfo = this.props.stripInfo;   
        if (strip) {
            let headers = this._workbookStore.getCellHeadersBySheetAndRange(stripInfo.excelSheet,strip.tableRange);
            return <tr>
                <td>{strip.name}</td>
                <td>
                    Range :
                    <InputControl value={strip.tableRange} onChange={ (evt) => {
                                    strip.tableRange = evt.target.value;
                                    let headers = this._workbookStore.getCellHeadersBySheetAndRange(stripInfo.excelSheet,strip.tableRange);
                                    strip.symbolIdColumn = headers.indexOf("SymbolID");
                                    strip.weightColumn = headers.indexOf("Weight");
                        }}>
                    </InputControl>
                </td>
                <td>
                    <div style={{padding:"3px"}}>
                        SymbolId:
                        <select value={ strip.symbolIdColumn }
                            onChange={ (evt) => {
                                    strip.symbolIdColumn = parseInt(evt.target.value);
                            }}
                        >
                            {
                                Array.from(headers).map( (header, index) => {
                                    return <option key={index} value={index}>{header}</option>;
                                })
                            }
                        </select>
                    </div>
                    <div style={{padding:"3px"}}>
                        Weight:
                        <select value={ strip.weightColumn }
                            onChange={ (evt) => {
                                    strip.weightColumn = parseInt(evt.target.value);
                            }}
                        >
                            {
                                Array.from(headers).map( (header, index) => {
                                    return <option key={index} value={index}>{header}</option>;
                                })
                            }
                        </select>
                    </div>
                    {
                      this.props.stripInfo.displayMinCombo &&
                        <div style={{padding:"3px"}}>
                            Min:
                            <select value={ strip.minColumn }
                                onChange={ (evt) => {
                                        strip.minColumn = parseInt(evt.target.value);
                                }}
                            >
                                <option key="-1" value="-1">None</option>
                                {
                                    Array.from(headers).map( (header, index) => {
                                        return <option key={index} value={index}>{header}</option>;
                                    })
                                }
                            </select>
                        </div>
                    }
                    {
                      this.props.stripInfo.displayMaxCombo &&
                        <div style={{padding:"3px"}}>
                            Max:
                            <select value={ strip.maxColumn }
                                onChange={ (evt) => {
                                        strip.maxColumn = parseInt(evt.target.value);
                                }}
                            >
                                <option key="-1" value="-1">None</option>
                                {
                                    Array.from(headers).map( (header, index) => {
                                        return <option key={index} value={index}>{header}</option>;
                                    })
                                }
                            </select>
                        </div>
                    }
                    {
                      this.props.stripInfo.displayValueCombo &&
                        <div style={{padding:"3px"}}>
                            Value:
                            <select value={ strip.valueColumn }
                                onChange={ (evt) => {
                                        strip.valueColumn = parseInt(evt.target.value);
                                }}
                            >
                                <option key="-1" value="-1">None</option>
                                {
                                    Array.from(headers).map( (header, index) => {
                                        return <option key={index} value={index}>{header}</option>;
                                    })
                                }
                            </select>
                        </div>
                    }
                    {
                      this.props.stripInfo.displaySuitCombo &&
                        <div style={{padding:"3px"}}>
                            Suit:
                            <select value={ strip.suitColumn }
                                onChange={ (evt) => {
                                        strip.suitColumn = parseInt(evt.target.value);
                                }}
                            >
                                <option key="-1" value="-1">None</option>
                                {
                                    Array.from(headers).map( (header, index) => {
                                        return <option key={index} value={index}>{header}</option>;
                                    })
                                }
                            </select>
                        </div>
                    }
                </td>
                <td>
                    {strip.getStopCountFromSheet()} <br/>
                    {strip.getFirstStopPreviewFromSheet()} <br/>
                    {strip.getLastStopPreviewFromSheet()}
                </td>
                <td>
                    <button style={{margin:"10px"}} onClick={() => { this.removeStrip();}}> X </button>      
                </td>
            </tr>
        } else {
            return null
        }       
        
    }
}