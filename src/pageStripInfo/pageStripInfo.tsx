import "./pageStripInfoStyle.scss";
import React, { Component } from 'react';
import { createRoot } from 'react-dom/client'

import StripInfoStore from "../stores/stripInfoStore";
import { observer } from "mobx-react";
import { AddStripView } from "./addStripView";
import { ExportToXmlView } from "./exportToXmlView";
import { SelectExcelFileView } from "./selectExcelFileView";
import { StripInfoView } from "./stripInfoView";
import { StripTableView } from "./stripTableView";
import { CheckDisplayAttributeComboView } from "./checkDisplayAttributeComboView";

@observer
export default class PageStripInfo extends Component {

	private _stripInfoStore:StripInfoStore;

	constructor(props: any) {
			super(props);
			this._stripInfoStore = new StripInfoStore(props);
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
		let selectedStrip = this._stripInfoStore.strips.get(this._stripInfoStore.selectedStripName);
		return <div className="fl-vert-container" style={{margin:"10px"}}>
			<h1>StripInfo</h1>
			<div className="fl-horiz-container">				
				<SelectExcelFileView stripInfo={this._stripInfoStore} />
			</div>
			<div className="fl-horiz-container">
				<StripInfoView stripInfoStore={this._stripInfoStore}/>
			</div>
			<div className="fl-horiz-container">
				<AddStripView stripInfoStore={this._stripInfoStore}/>
			</div>
			<div className="fl-horiz-container">
				<CheckDisplayAttributeComboView stripInfoStore={this._stripInfoStore}/>
			</div>
			<div className="fl-horiz-container">
				<StripTableView stripInfo={this._stripInfoStore}/>
			</div>
			<div className="fl-horiz-container">				
				<ExportToXmlView stripInfo={this._stripInfoStore}/>
			</div>
		</div>
	}
}

let root = document.getElementById('root');
if (root) createRoot(root).render(<PageStripInfo/>)