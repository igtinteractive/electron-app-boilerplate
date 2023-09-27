
import { computed, makeAutoObservable, observable } from "mobx";

export interface IStopStore {
    symbolID : string,
    weight : string,
    min : string,
    max : string,
    value : string,
    suit : string,
}

export default class StopStore {

    @observable private _symbolID: string;   
    @observable private _weight: string;   
    @observable private _min: string;    
    @observable private _max: string;  
    @observable private _value: string;  
    @observable private _suit: string;  

    constructor(props:IStopStore) {        

        makeAutoObservable(this);

        this._symbolID = props.symbolID;
        this._weight = props.weight;
        this._min = props.min;
        this._max = props.max;
        this._value = props.value;
        this._suit = props.suit;
        
    }

    @computed
    public get symbolID(): string {
        return this._symbolID;
    }

    @computed
    public get weight(): string {
        return this._weight;
    }
    public set weight(value: string) {
        this._weight = value;
    }
    
    @computed
    public get min(): string {
        return this._min;
    }
    public set min(value: string) {
        this._min = value;
    }

    @computed
    public get fullName(): string {
        return `${this._weight} ${this._min}`;
    }
    
    @computed
    public get max(): string {
        return this._max;
    }
    public set max(value: string) {
        this._max = value;
    }

    @computed
    public get value(): string {
        return this._value;
    }
    public set value(value: string) {
        this._value = value;
    }

    @computed
    public get suit(): string {
        return this._suit;
    }
    public set suit(value: string) {
        this._suit = value;
    }
    
    public getJson = () => {
        let data = {
            symbolID : this._symbolID,
            weight : this._weight,
            min : this._min,
            max : this._max,
            value : this._value,
            suit : this._suit
        }
        return data;
    }
    
}