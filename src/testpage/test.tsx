import React, { Component } from 'react';
import { createRoot } from 'react-dom/client'

import { MyComponent } from '../loadpage/myComponent';

export default class Test extends Component {

  constructor(props: any) {
		super(props);
  }

  /**
	 * called when the window is mounted (ready to display ) 
	 */
	componentDidMount() {
    //--- Set menu and event listener
    console.log("BBBBBBBBBBBBBBBBBBBB");
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