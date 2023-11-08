
import { computed, makeAutoObservable, observable } from "mobx";

export interface IPrizePayStore {
    count : string,
    value : string
}

export default class PrizePayStore {

    private _count: string;   
    private _value: string;    

    constructor(props:IPrizePayStore) {        

        makeAutoObservable(this);

        this._count = props.count;
        this._value = props.value;

        
    }

    @computed
    public get count(): string {
        return this._count;
    }

    public set count(count: string) {
        this._count = count;
    }

    @computed
    public get value(): string {
        return this._value;
    }
    public set value(value: string) {
        this._value = value;
    }
    
   
    
    public getJson = () => {
        let data = {
            count : this._count,
            value : this._value,
         
        }
        return data;
    }
    
    public getJsonDataForXml = () => {
        let attributes: any = {
            count : this._count,
            value : this._value
        };
        // if(this._min){
        //     attributes["min"] = this._min;
        // }
        // if(this._max){
        //     attributes["max"] = this._max;
        // }
        // if(this._value){
        //     attributes["value"] = this._value;
        // }
        // if(this._suit){
        //     attributes["suit"] = this._suit;
        // }
        let data = {
            _attributes: attributes
        }
        return data
    }  
}