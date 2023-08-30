import { observer } from "mobx-react";
import React , { Component } from "react";
import { InputControl } from "../sharedComponents/inputControl";
import BookStore from "../stores/bookStore";
import ProjectStore from "../stores/projectStore";
import { IReactionDisposer, autorun } from "mobx";

export interface IBookViewProps extends React.HTMLAttributes<HTMLElement> {
       book?:BookStore
}

@observer
export class BookView extends Component < IBookViewProps > {
    constructor(props: any) {
		super(props);
	}

    render() {

        console.log("[BookView render]");
        //let book = this.props.book;

        let selectedId = ProjectStore.getInstance().selectedBookId;
        let book = selectedId ? ProjectStore.getInstance().books.get( selectedId ) : null;

        if (book) {
            return <fieldset style ={{ width: "100%", borderRadius: "8px", padding: "0px" }} >
                <legend style={{marginLeft:"10px"}}>Book Info</legend>
                <div>                
                    Title : 
                    <InputControl value={book.title} onChange={ (evt) => {                        
                            if (book) {
                                book.title = evt.target.value;
                                if (this.props.onChange) { this.props.onChange(evt); }
                            }                        
                        }}>
                    </InputControl>
                </div>
                <div>                
                    Author : 
                    <select value={ book.authorId } 
                        onChange={ (evt) => {
                            if (book) { 
                                book.authorId = evt.target.value;                                
                            }
                        }}
                    >                                
                        {
                            Array.from(ProjectStore.getInstance().authors).map( (author) => {
                                return <option key={author[0]} value={author[0]} style={{backgroundColor: "#454545"}}>{author[1].fullName}</option>;
                            })
                        }
                    </select>
                        
                </div>
            </fieldset>
        } else {
            return null
        }       
        
    }
}