import "../css/flexLayout.scss";
import React, { Component } from 'react';
import { createRoot } from 'react-dom/client'

import AppComRenderer from '../electron/appCom/appComRenderer';
import ProjectStore from '../stores/projectStore';
import { BookListView } from "./bookListView";

export default class PageA extends Component <any, any>{

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
		this.state = { selectedBookId:null }
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
				AppComRenderer.getInstance().openWindow("pageB", "Page B Open", false, {width:300, height:300});
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
		let books = new Array<any>();		
		(ProjectStore.getInstance().books as Map<string, any>).forEach( (book, bookId) => {			
			books.push( <div key={bookId}  style={{margin:"10px"}}>- {book.title} </div> )
		})		

		return <div className="fl-vert-container" style={{margin:"10px"}}>
			<h1>This is Page A</h1>	
			<div className="fl-horiz-container">
				<BookListView books={ProjectStore.getInstance().books} selectedBookId={this.state.selectedBookId} 
					onSelectionChange={ (evt:any) => {
						ProjectStore.getInstance().selectedBookId = evt;
						this.setState({selectedBookId:evt});
					}}>
				</BookListView>

				<fieldset style ={{ width: "100%", borderRadius: "8px", padding: "0px" }} >
					<legend style={{marginLeft:"10px"}}>Book Info</legend>
				</fieldset>
			</div>			
		</div>
	}	
}

let root = document.getElementById('root');
if (root) createRoot(root).render(<PageA/>)