import React, { Component } from 'react';
import { createRoot } from 'react-dom/client'

import { MyComponent } from '../pageA/myComponent';
import AppComRenderer from '../electron/appCom/appComRenderer';

export default class Test extends Component {

	private testPageMenu = [
		{ label: "Help Test", submenu: [
			{ label: "About Test", id:"About Test"}
		]},
		{ label: "set App Menu", id:"SetAppMenu"}
	];

	private loadPageMenu = [		
		{ label: "Open Window", submenu: [
			{label: "Open Test Page", id:"OpenTestPage"}			
		]},
		{ label: "Help B", submenu: [
			{ label: "About B", id:"AboutB"}
		]}
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
		AppComRenderer.getInstance().setMenu(this.testPageMenu);		
		
	}

	private onMenuClick = (id:string) => {
		console.log(`${id} CLICKED`);
		switch (id) {
			case "SetAppMenu" :
				// Set aplication menu
				AppComRenderer.getInstance().setApplicationMenu(this.loadPageMenu);
			break;
		}
	}

	render() {
		return (
		<div>
			<h1> I'm a Test Window !!</h1>
			<MyComponent></MyComponent>
		</div>
		);
	}
}

let root = document.getElementById('root');
if (root) createRoot(root).render(<Test/>)