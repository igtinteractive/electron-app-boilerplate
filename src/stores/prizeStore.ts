
import { computed, makeAutoObservable, observable } from "mobx";
import PrizePayStore from "./prizePayStore";
import PrizeInfoStore from "./prizeInfoStore";

export interface IPrizeStore {
    name? : string,
    tableRange? : string,
    symbolIdColumn? : number,
    payColumn? : number,
    prizeInfo: PrizeInfoStore
}

export default class PrizeStore {

    private _prizeInfo:PrizeInfoStore;

    @observable private _name: string;   
    @observable private _tableRange: string;
    @observable private _symbolIdColumn: number;
    @observable private _payColumn: number;
    @observable private _prizePays: Map<number, PrizePayStore> = new Map<number, PrizePayStore>();


    constructor(props:IPrizeStore) {        

        makeAutoObservable(this);
        this._name = props.name??"";
        this._tableRange = props.tableRange??"";
        this._symbolIdColumn = props.symbolIdColumn??0;
        this._payColumn = props.payColumn??0;
        this._prizeInfo = props.prizeInfo;

    }

    @computed
    public get tableRange(): string {
        return this._tableRange;
    }
    public set tableRange(value: string) {
        this._tableRange = value;
    }

    @computed
    public get symbolIdColumn(): number {
        return this._symbolIdColumn;
    }
    public set symbolIdColumn(value: number) {
        this._symbolIdColumn = value;
    }
    @computed
    public get payColumn(): number {
        return this._payColumn;
    }
    public set payColumn(value: number) {
        this._payColumn = value;
    }

    @computed
    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

   
    @computed
    public get prizePays(): Map<number, PrizePayStore> {
        return this._prizePays;
    }
   
    
    public getJson = () => {
        let prizePays: any = {};
        this._prizePays.forEach( (prizePayStore, prizePayId) => {
            prizePays[prizePayId] = prizePayStore.getJson();
        })
        let data = {
            name : this._name,
            prizePays: prizePays
        }
        return data;
    }

    

    public addPrizePays = (values : any[], headers : any[]) =>{
        this.symbolIdColumn = headers.indexOf("SymbolID");
        this._prizePays.clear();
        headers.slice(1, headers.length).forEach((prizeCount, index)=>{
            var newPrizeCount = prizeCount; 
            var newPrizeValue = "";
            values.forEach((value)=>{
                
                if(this._name == value[0] ){
                    newPrizeValue = value[index+1];
                }
            })
            
            let prizepay = new PrizePayStore({count : newPrizeCount, value: newPrizeValue});
            this._prizePays.set(index, prizepay);

        })

    };
    
   

    public getJsonDataForXml = () => {
        let prizePays: any[] = [];
        this._prizePays.forEach( (prizePayStore) => {
            prizePays.push(prizePayStore.getJsonDataForXml());
        })
        let data = {
            _attributes: { 
                name : this._name
            },
            PrizePay: prizePays
        }
        return data
    }  
    
   
}