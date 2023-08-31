import "./pageBStyle.scss";
import React, { Component } from 'react';
import { createRoot } from 'react-dom/client'

import AppComRenderer from '../electron/appCom/appComRenderer';
import ProjectStore from '../stores/projectStore';
import { BookListView } from "../pageA/bookListView";
import { BookView } from "../pageA/bookView";
import { observer } from "mobx-react";

@observer
export default class PageB extends Component <any, any> {

	private _projectStore:ProjectStore;

	private pageAMenu = [		
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
		AppComRenderer.getInstance().setApplicationMenu(this.pageAMenu);
	}

	/**
	 * called before the windopws close
	 * you shoudl clear any listeners
	 */
	componentWillUnmount(): void {
		AppComRenderer.getInstance().removeMenuClickListener(this.onMenuClick);
	}

	private onMenuClick = (id:string) => {
		console.log(`${id} CLICKED`);
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

	render() {
		console.log("[PageB render]");

		/** create an array that containe the display <div> for each book. */
		let books = new Array<any>();		
		(this._projectStore.books as Map<string, any>).forEach( (book, bookId) => {			
			books.push( <div key={bookId}  style={{margin:"10px"}}>- {book.title} </div> )
		})		
		
		let selectedBookId = this._projectStore.selectedBookId ? this._projectStore.selectedBookId : "";
		let selectedBook = this._projectStore.books.get(selectedBookId);

		return <div className="fl-vert-container" style={{margin:"10px"}}>
			<h1>This is Page B</h1>	
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
if (root) createRoot(root).render(<PageB/>)