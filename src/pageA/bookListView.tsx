import { observer } from "mobx-react";
import React , { Component } from "react";
import { IBookStore } from "src/stores/bookStore";

export interface IBookListViewProps extends React.HTMLAttributes<HTMLElement> {

    books?:Map<string, IBookStore>,
    selectedBookId?:string | null

    /** function called when selection change bt user */
	onSelectionChange?: Function;
}

@observer
export class BookListView extends Component < IBookListViewProps > {

    constructor(props: any) {
		super(props);
	}

    render() {
        let books = new Array<any>();        
        this.props.books?.forEach( (book, bookId) => {
            let bgColor:string | undefined = this.props.selectedBookId == bookId ? "gray" : undefined;
            books.push( 
                <div key={bookId} style={{margin:"10px", backgroundColor:bgColor}} onClick={(evt) => {                
                    if (this.props.onSelectionChange) {
                        this.props.onSelectionChange(bookId);
                    }                
                }}>
                    - {book.title}
                </div> 
            )
        })  

        return <fieldset style ={{ width: "300px", borderRadius: "8px", padding: "0px" }} >
            <legend style={{marginLeft:"10px"}}>Books</legend>
            {books}
		</fieldset>
    }
}