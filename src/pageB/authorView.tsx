import { observer } from "mobx-react";
import React , { Component } from "react";
import { InputControl } from "../sharedComponents/inputControl";
import AuthorStore from "src/stores/authorStore";

export interface IAuthorViewProps extends React.HTMLAttributes<HTMLElement> {
    author?:AuthorStore
}

@observer
export class AuthorView extends Component < IAuthorViewProps > {
    constructor(props: any) {
		super(props);
	}

    render() {
        let author = this.props.author; 
        if (author) {
            return <fieldset style ={{ width: "100%", borderRadius: "8px" }} >
                <legend style={{marginLeft:"10px"}}>Author <span style={{fontSize:"0.8em", color:"gray", paddingLeft:"3px", paddingRight:"3px"}}>{author.authorId}</span></legend>

                <div style={{padding:"8px"}}>
                    First Name :
                    <InputControl value={author.firstName} onChange={ (evt) => {
                            if (author) {
                                author.firstName = evt.target.value;
                                if (this.props.onChange) { this.props.onChange(evt); }
                            }
                        }}>
                    </InputControl>
                </div>

                <div style={{padding:"8px"}}>
                    Last Name :
                    <InputControl value={author.lastName} onChange={ (evt) => {
                            if (author) {
                                author.lastName = evt.target.value;
                                if (this.props.onChange) { this.props.onChange(evt); }
                            }
                        }}>
                    </InputControl>
                </div>

            </fieldset>

        } else {
            return null;
        }        
    }
}