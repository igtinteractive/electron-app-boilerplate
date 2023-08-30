
import { computed, makeAutoObservable, observable } from "mobx";

export interface IBookStore {
    bookId: string,
    title: string,
    authorId: string,
    publisherId: string
}

export default class BookStore {

    @observable private _bookId: string;   
    @observable private _title: string;       
    @observable private _authorId: string;    
    @observable private _publisherId: string;   

    constructor(props:IBookStore) {        

        makeAutoObservable(this);

        this._bookId = props.bookId;
        this._title = props.title;
        this._authorId = props.authorId;
        this._publisherId = props.publisherId;
    }

    public get bookId(): string {
        return this._bookId;
    }   

    @computed
    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }

    @computed
    public get authorId(): string {
        return this._authorId;
    }
    public set authorId(value: string) {
        this._authorId = value;
    }
    
    @computed
    public get publisherId(): string {
        return this._publisherId;
    }
    public set publisherId(value: string) {
        this._publisherId = value;
    }     

    
}