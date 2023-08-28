import React, { Component } from 'react';
import { createRoot } from 'react-dom/client'

import { MyComponent } from '../pageA/myComponent';
import AppComRemote from '../electron/appCom/appComRemote';

export default class PageC extends Component {

	private pageCMenu = [
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
		AppComRemote.getInstance().addMenuClickListener(this.onMenuClick);

		// Set menu
		AppComRemote.getInstance().setMenu(this.pageCMenu);		
		
	}

	private onMenuClick = (id:string) => {
		console.log(`${id} CLICKED`);
		switch (id) {
			case "OpenPageA" :
				AppComRemote.getInstance().openWindow("pageA", "Page A", true);
			break;

			case "OpenPageB" :
				AppComRemote.getInstance().openWindow("pageB", "Page B Open", false, {width:300, height:300});
			break;

			case "OpenPageC" :
				AppComRemote.getInstance().openWindow("pageC");
			break;

			case "LoadPageA" :
				AppComRemote.getInstance().loadPage("pageA", "Page A");
			break;

			case "LoadPageB" :
				AppComRemote.getInstance().loadPage("pageB", "Page B Loaded");
			break;

			case "LoadPageC" :
				AppComRemote.getInstance().loadPage("pageC");
			break;
			
		}
	}

	render() {
		return (
		<div>
			<h1> This is Page C</h1>			
		</div>
		);
	}
}

let root = document.getElementById('root');
if (root) createRoot(root).render(<PageC/>)