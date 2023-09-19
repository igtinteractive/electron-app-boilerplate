import "./pageExcelStyle.scss";
import React, { Component } from 'react';
import { createRoot } from 'react-dom/client'

import AppComRenderer from '../electron/appCom/appComRenderer';
import WorkbookStore from "../stores/workbookStore";
import { observer } from "mobx-react";
import { WorkbookView } from "./workbookView";
@observer
export default class PageExcel extends Component {

	private _workbookStore:WorkbookStore;

	private pageExcelMenu = [
		{ label: "Open Page", submenu: [
			{ label: "Open Page A", id:"OpenPageA"},
			{ label: "Open Page B", id:"OpenPageB"},
			{ label: "Open Page C", id:"OpenPageC"}
		]},
		{ label: "Load Page", submenu: [
			{ label: "Load Page A", id:"LoadPageA"},
			{ label: "Load Page B", id:"LoadPageB"},
			{ label: "Load Page C", id:"LoadPageC"}
		]},
		{ label: "Help", id:"help"}
	];

	constructor(props: any) {
			super(props);
			this._workbookStore = WorkbookStore.getInstance();
	}

  	/**
	 * called when the window is mounted (ready to display ) 
	 */
	componentDidMount() {		
		
		//add Menu Click Listener
		AppComRenderer.getInstance().addMenuClickListener(this.onMenuClick);

		// Set menu
		AppComRenderer.getInstance().setApplicationMenu(this.pageExcelMenu);		
		
	}

	/**
	 * called before the windopws close
	 * you shoudl clear any listeners
	 */
	componentWillUnmount(): void {
		AppComRenderer.getInstance().removeMenuClickListener(this.onMenuClick);
	}

	private onMenuClick = (id:string) => {		
		switch (id) {

			case "OpenPageA" :
				AppComRenderer.getInstance().openWindow("pageA", "Page A", true);
			break;

			case "OpenPageB" :
				AppComRenderer.getInstance().openWindow("pageB", "Page B Open", false, {width:800, height:600});
			break;

			case "OpenPageC" :
				AppComRenderer.getInstance().openWindow("pageC");
			break;

			case "LoadPageA" :
				AppComRenderer.getInstance().loadPage("pageA", "Page A");
			break;

			case "LoadPageB" :
				AppComRenderer.getInstance().loadPage("pageB", "Page B Loaded");
			break;

			case "LoadPageC" :
				AppComRenderer.getInstance().loadPage("pageC");
			break;
			
		}
	}

	/**
	 * Show Open Dialog Sync and Load spreadsheet from Excel file.
	 */
	private importExcelSpreadsheet = () => {
		let files = AppComRenderer.getInstance().showOpenDialogSync({ properties: ["openFile"], filters: [{name: "Excel spreadsheet", extensions: ["xlsx"]}]});
		if (files && files[0]) {
			this._workbookStore.loadWorkbook(files[0]);
		}				
	}

	render() {
		return <div className="fl-vert-container" style={{margin:"10px"}}>
			<h1>Import Excel workbook</h1>
			<div className="fl-horiz-container">				
				<button style={{margin:"10px"}} onClick={() => { this.importExcelSpreadsheet();	}}> Select file </button>
				<div className="fl-expand-child"></div>
			</div>
			<div className="fl-horiz-container">
				<WorkbookView/>
			</div>
		</div>
	}
}

let root = document.getElementById('root');
if (root) createRoot(root).render(<PageExcel/>)