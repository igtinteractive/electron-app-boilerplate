
import { computed, observable } from "mobx";

export interface IPublisherStoreStore {
    publisherId : string,
    name : string,
    contacName : string,
    email : string
}

export default class PublisherStore {
    
    @observable private _publisherId: string;   
    @observable private _name: string;
    @observable private _contacName: string;    
    @observable private _email: string;

    constructor(props:IPublisherStoreStore) {
        this._publisherId = props.publisherId;
        this._name = props.name;
        this._contacName = props.contacName;
        this._email = props.email;
    }

    @computed
    public get publisherId(): string {
        return this._publisherId;
    }   
    
    @computed
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    @computed
    public get contacName(): string {
        return this._contacName;
    }
    public set contacName(value: string) {
        this._contacName = value;
    }

    @computed
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }


}