/**
 * Core base compoments
 * @module appModules core components
 */

import React, { Component, FocusEvent } from "react";

/** A basic Input that displatch change when enter or tab is press, or when focus is lost.  */
export class InputControl extends Component < React.InputHTMLAttributes<HTMLInputElement>, {hasFocus: boolean, value?: string | number | readonly string[] | undefined}> {

	private _inputElement: any;

	constructor(props: {hasFocus: boolean, value?: string | number | readonly string[] | undefined} ) {
		super(props);
		this.state = { hasFocus: false, value: this.props.value };
	}

	private handleOnChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> ) => {
		this.setState({value: evt.target.value});
	}

	private handleOnKeyPress = (evt: any) => {
		if (evt.key == "Enter") {
			if (this.props.onChange) {
				this.props.onChange(evt);
			}
		}
	}

	private onFocus = (evt: FocusEvent<HTMLInputElement>): void => {
		this.setState({hasFocus: true, value: this.props.value});
		if(this._inputElement) { this._inputElement.select(); }
	}

	private onFocusOut = (evt: FocusEvent<HTMLInputElement>): void => {
		this.setState({hasFocus: false});
		if (this.props.onChange) {
			this.props.onChange(evt);
		}
	}

	render() {
		return <input ref = { (el: any) => { this._inputElement = el; } }
				className={this.props.className ? this.props.className : "fl-expand-child"} {...this.props} value={ this.state.hasFocus ? this.state.value : this.props.value }
				onChange={this.handleOnChange} onKeyPress={this.handleOnKeyPress} onFocus={this.onFocus} onBlur={this.onFocusOut}
				onKeyUp={ (e) => { if (this.props.onKeyUp) { this.props.onKeyUp(e); } }} >
			</input>;
	}

}