import React, { Component } from 'react';
import { createRoot } from 'react-dom/client'

import { MyComponent } from './myComponent';

export default class LoadPage extends Component {

  constructor(props: any) {
		super(props);
  }

  /**
	 * called when the window is mounted (ready to display ) 
	 */
	componentDidMount() {
    //--- Set menu and event listener
    console.log("AAAAAAAAAAAAAAAAA");
	}

  render() {
    return <div>
      <h1>I'm React running in Electron App !</h1>
      <MyComponent></MyComponent>
    </div>
  }
}

let root = document.getElementById('root');
if (root) createRoot(root).render(<LoadPage/>)