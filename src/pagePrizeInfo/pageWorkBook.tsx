import "./pagePrizeInfoStyle.scss";
import React, { Component } from 'react';
import { createRoot } from 'react-dom/client'
import { observer } from "mobx-react";

import { SelectExcelFileViewPrize } from "./selectExcelFileViewPrize";

import PrizeInfoStore from "../stores/prizeInfoStore";
import AppComRenderer from '../electron/appCom/appComRenderer';

// import { CheckDisplayAttributeComboView } from "./checkDisplayAttributeComboView";

@observer
export default class PageWorkBook extends Component {

	private _prizeInfoStore:PrizeInfoStore;

	private pageWorkBookMenu = [
		{ label: "Open Page", submenu: [
			{ label: "Open Strip Info Page", id:"OpenStripInfo"},
			{ label: "Open Prize Info Page", id:"OpenPrizeInfo"}
		]},
		{ label: "Load Page", submenu: [
			{ label: "Load Strip Info Page", id:"LoadStripInfo"},
			{ label: "Load Prize Info Page", id:"LoadPrizeInfo"}
		]},
		{ label: "Help", id:"help"}
	];

	constructor(props: any) {
			super(props);
			this._prizeInfoStore = new PrizeInfoStore(props);
	}

  	/**
	 * called when the window is mounted (ready to display ) 
	 */
	componentDidMount() {		
		//add Menu Click Listener
		AppComRenderer.getInstance().addMenuClickListener(this.onMenuClick);

		// Set aplication menu
		AppComRenderer.getInstance().setApplicationMenu(this.pageWorkBookMenu);
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
			
			
			case "OpenStripInfo" :
				AppComRenderer.getInstance().openWindow("pageStripInfo", "Page Strip Info", true);
			break;

			case "OpenPrizeInfo" :
				AppComRenderer.getInstance().openWindow("pagePrizeInfo", "Page Prize Info", false, {width:800, height:600});
			break;

			case "LoadStripInfo" :
				AppComRenderer.getInstance().loadPage("pageStripInfo", "Page Strip Info");
			break;

			case "LoadPrizeInfo" :
				AppComRenderer.getInstance().loadPage("pagePrizeInfo", "Page Prize Info");
			break;

			
		}
	}

	render() {
		return <div className="fl-vert-container" style={{margin:"10px"}}>
			<h1>PrizeInfo</h1>
			<div className="fl-horiz-container">				
				<SelectExcelFileViewPrize prizeInfo={this._prizeInfoStore} />
			</div>
		</div>
	}
}

let root = document.getElementById('root');
if (root) createRoot(root).render(<PageWorkBook/>)