import "./pageBStyle.scss";
import React, { Component } from 'react';
import { createRoot } from 'react-dom/client'

import AppComRenderer from '../electron/appCom/appComRenderer';

export default class PageB extends Component {

	private pageBMenu = [		
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
	}

  	/**
	 * called when the window is mounted (ready to display ) 
	 */
	componentDidMount() {		
		
		//add Menu Click Listener
		AppComRenderer.getInstance().addMenuClickListener(this.onMenuClick);

		// Set menu
		AppComRenderer.getInstance().setMenu(this.pageBMenu);		
		
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
		return (
		<div>
			<h1> This is Page B</h1>			
		</div>
		);
	}
}

let root = document.getElementById('root');
if (root) createRoot(root).render(<PageB/>)