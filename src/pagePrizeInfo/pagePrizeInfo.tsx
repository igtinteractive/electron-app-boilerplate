import "./pagePrizeInfoStyle.scss";
import React, { Component } from 'react';
import { createRoot } from 'react-dom/client'

import PrizeInfoStore from "../stores/prizeInfoStore";
import { observer } from "mobx-react";
import { AddPrizeView } from "./addPrizeView";
import { ExportToXmlViewPrize } from "../pagePrizeInfo/exportToXmlViewPrize";
import { SelectExcelFileViewPrize } from "../pagePrizeInfo/selectExcelFileViewPrize";
import { PrizeInfoView } from "../pagePrizeInfo/prizeInfoView";
import { PrizeTableView } from "./prizeTableView";
import WorkbookStore from "../stores/workbookStore";

// import { CheckDisplayAttributeComboView } from "./checkDisplayAttributeComboView";

@observer
export default class PagePrizeInfo extends Component {

	private _prizeInfoStore:PrizeInfoStore;

	constructor(props: any) {
			super(props);
			this._prizeInfoStore = new PrizeInfoStore(props);

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

	render() {
		//let selectedPrize = this._prizeInfoStore.prizes.get(this._prizeInfoStore.selectedPrizeName);
		return <div className="fl-vert-container" style={{margin:"10px"}}>
			<h1>PrizeInfo</h1>
			
			<div className="fl-horiz-container">				
				<PrizeInfoView prizeInfoStore={this._prizeInfoStore} />
			</div>
			<div className="fl-horiz-container">
				<AddPrizeView prizeInfoStore={this._prizeInfoStore}/>
			</div>	
			<div className="fl-horiz-container">
				<PrizeTableView prizeInfo={this._prizeInfoStore}/>
			</div>
			<div className="fl-horiz-container">				
				<ExportToXmlViewPrize prizeInfo={this._prizeInfoStore}/>
			</div>
		</div>
	}
}

let root = document.getElementById('root');
if (root) createRoot(root).render(<PagePrizeInfo/>)