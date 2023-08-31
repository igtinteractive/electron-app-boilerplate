
import { computed, makeAutoObservable, observable } from "mobx";

export interface IAuthorStore {
    authorId : string,
    firstName : string,
    lastName : string,
    email : string
}

export default class AuthorStore {

    @observable private _authorId: string;   
    @observable private _firstName: string;   
    @observable private _lastName: string;    
    @observable private _email: string;  

    constructor(props:IAuthorStore) {        

        makeAutoObservable(this);

        this._authorId = props.authorId;
        this._firstName = props.firstName;
        this._lastName = props.lastName;
        this._email = props.email;
        
    }

    @computed
    public get authorId(): string {
        return this._authorId;
    }

    @computed
    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(value: string) {
        this._firstName = value;
    }
    
    @computed
    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }

    @computed
    public get fullName(): string {
        return `${this._firstName} ${this._lastName}`;
    }
    
    @computed
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    
    public getJson = () => {
        let data = {
            authorId : this._authorId,
            firstName : this._firstName,
            lastName : this._lastName,
            email : this._email
        }
        return data;
    }
    
}