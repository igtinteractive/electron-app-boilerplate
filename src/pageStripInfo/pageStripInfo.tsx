import "./pageStripInfoStyle.scss";
import React, { Component } from 'react';
import { createRoot } from 'react-dom/client'

import AppComRenderer from '../electron/appCom/appComRenderer';
import StripInfoStore from "../stores/stripInfoStore";
import WorkbookStore from "../stores/workbookStore";
import { observer } from "mobx-react";
import { InputControl } from "../sharedComponents/inputControl";
import { SelectSheetView } from "./selectSheetView";
import { AddStripView } from "./addStripView";
import { StripListView } from "./stripListView";
import { StripView } from "./stripView";

@observer
export default class PageStripInfo extends Component {

	private _stripInfoStore:StripInfoStore;
	private _workbookStore:WorkbookStore;

	private pageStripInfoMenu = [
	];

	constructor(props: any) {
			super(props);
			this._stripInfoStore = new StripInfoStore(props);
			this._workbookStore = WorkbookStore.getInstance();
	}

  	/**
	 * called when the window is mounted (ready to display ) 
	 */
	componentDidMount() {			
	}

	/**
	 * called before the windopws close
	 * you shoudl clear any listeners
	 */
	componentWillUnmount(): void {
	}

	/**
	 * Show Open Dialog Sync and Load spreadsheet from Excel file.
	 */
	private importExcelSpreadsheet = () => {
		let files = AppComRenderer.getInstance().showOpenDialogSync({ properties: ["openFile"], filters: [{name: "Excel spreadsheet", extensions: ["xlsx"]}]});
		if (files && files[0]) {
			this._workbookStore.loadWorkbook(files[0]);
			if(this._workbookStore.sheets){
				this._stripInfoStore.excelSheet = this._workbookStore.sheets[0];
			}
		}				
	}

	private saveData = () => {
		let filePath = AppComRenderer.getInstance().showSaveDialogSync();		
		if (filePath) {
			this._stripInfoStore.saveXmlData(filePath);
		}				
	}

	render() {
		let selectedStrip = this._stripInfoStore.strips.get(this._stripInfoStore.selectedStripName);
		return <div className="fl-vert-container" style={{margin:"10px"}}>
			<h1>StripInfo</h1>
			<div className="fl-horiz-container">				
				<button style={{margin:"10px"}} onClick={() => { this.importExcelSpreadsheet();	}}> Select Excel file </button>
				<div className="fl-expand-child"></div>
			</div>
			<div className="fl-horiz-container">				
				<div style={{padding:"8px"}}>
                    Name :
                    <InputControl value={this._stripInfoStore.name} onChange={ (evt) => {
                                this._stripInfoStore.name = evt.target.value;
                        }}>
                    </InputControl>
                </div>
			</div>
			<div className="fl-horiz-container">
				<SelectSheetView stripInfoStore={this._stripInfoStore}/>
			</div>
			<div className="fl-horiz-container">
				<AddStripView stripInfoStore={this._stripInfoStore}/>
			</div>
			<div className="fl-horiz-container">
				<StripListView strips={this._stripInfoStore.strips} onSelectionChange={ (evt:any) => {
						this._stripInfoStore.selectedStripName = evt;
					}}/>
			</div>
			<div className="fl-horiz-container">
				<StripView strip={selectedStrip} stripInfo={this._stripInfoStore}/>
			</div>
			<div className="fl-horiz-container">				
				<button style={{margin:"10px"}} onClick={() => { this.saveData();	}}> Export to XML </button>
				<div className="fl-expand-child"></div>
			</div>
		</div>
	}
}

let root = document.getElementById('root');
if (root) createRoot(root).render(<PageStripInfo/>)