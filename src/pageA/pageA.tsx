import "./pageAStyle.scss";
import React, { Component } from 'react';
import { createRoot } from 'react-dom/client'

import AppComRenderer from '../electron/appCom/appComRenderer';
import ProjectStore from '../stores/projectStore';
import { BookListView } from "./bookListView";
import { BookView } from "./bookView";
import { observer } from "mobx-react";
import { dialog } from "electron";

@observer
export default class PageA extends Component <any, any>{

	private _projectStore:ProjectStore;

	private pageAMenu = [
		{ label: "Project", submenu: [
				{ label: "Load data", id:"LoadData"},
				{ label: "Save data", id:"SaveData"},
		]},	
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
		this._projectStore = ProjectStore.getInstance();
	}

	/**
	 * called when the window is mounted (ready to display ) 
	 */
	componentDidMount() {		
		
		//add Menu Click Listener
		AppComRenderer.getInstance().addMenuClickListener(this.onMenuClick);

		// Set aplication menu
		AppComRenderer.getInstance().setMenu(this.pageAMenu);
	}

	/**
	 * called before the windopws close
	 * you shoudl clear any listeners
	 */
	componentWillUnmount(): void {
		AppComRenderer.getInstance().removeMenuClickListener(this.onMenuClick);
	}

	/**
	 * Handle the menuclick events.
	 * @param id 
	 */
	private onMenuClick = (id:string) => {		
		switch (id) {
			case "LoadData" :				
				this.loadData();		
				break;

			case "SaveData" :
				this.saveData();
				break;
			
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
	 * Show Open Dialog Sync and Load data from selected json file.
	 */
	private loadData = () => {
		let files = AppComRenderer.getInstance().showOpenDialogSync({ properties: ["openFile"], filters: [{name: "project", extensions: ["json"]}]});
		if (files && files[0]) {
			this._projectStore.loadData(files[0]);
			this._projectStore.syncData();
		}				
	}

	/**
	 * Show Save Dialog Sync and save data to selected json file.
	 */
	private saveData = () => {
		let filePath = AppComRenderer.getInstance().showSaveDialogSync();		
		if (filePath) {
			this._projectStore.saveData(filePath);
		}				
	}

	render() {

		/** create an array that containe the display <div> for each book. */
		let books = new Array<any>();		
		(this._projectStore.books as Map<string, any>).forEach( (book, bookId) => {			
			books.push( <div key={bookId}  style={{margin:"10px"}}>- {book.title} </div> )
		})		
		
		let selectedBookId = this._projectStore.selectedBookId ? this._projectStore.selectedBookId : "";
		let selectedBook = this._projectStore.books.get(selectedBookId);

		return <div className="fl-vert-container" style={{margin:"10px"}}>
			<h1>This is Page A</h1>	
			<div className="fl-horiz-container">
				<BookListView books={this._projectStore.books} selectedBookId={selectedBook?.bookId} 
					onSelectionChange={ (evt:any) => {
						this._projectStore.selectedBookId = evt;
					}}>
				</BookListView>

				<BookView book={selectedBook}></BookView>
			</div>
			<div className="fl-horiz-container">				
				<button style={{margin:"10px"}} onClick={() => { this._projectStore.syncData();	}}> Synch Data </button>
				<div className="fl-expand-child"></div>
			</div>
		</div>
	}	
}

let root = document.getElementById('root');
if (root) createRoot(root).render(<PageA/>)