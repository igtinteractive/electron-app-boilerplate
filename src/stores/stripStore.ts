
import { computed, makeAutoObservable, observable } from "mobx";
import StopStore from "./stopStore";
import WorkbookStore from "./workbookStore";
import StripInfoStore from "./stripInfoStore";

export interface IStripStore {
    name? : string,
    tableRange? : string,
    symbolIdColumn? : number,
    weightColumn? : number,
    minColumn? : number,
    maxColumn? : number,
    valueColumn? : number,
    suitColumn? : number,
    stripInfo: StripInfoStore
}

export default class StripStore {
    private _workbookStore:WorkbookStore;
    private _stripInfo:StripInfoStore;

    @observable private _name: string;
    @observable private _tableRange: string;
    @observable private _symbolIdColumn: number;
    @observable private _weightColumn: number;
    @observable private _minColumn: number;
    @observable private _maxColumn: number;
    @observable private _valueColumn: number;
    @observable private _suitColumn: number;
    @observable private _stops: Map<number, StopStore> = new Map<number, StopStore>();

    constructor(props:IStripStore) {
        makeAutoObservable(this);
        
        this._name = props.name??"";
        this._tableRange = props.tableRange??"";
        this._symbolIdColumn = props.symbolIdColumn??0;
        this._weightColumn = props.weightColumn??0;

        this._minColumn = props.minColumn??-1;
        this._maxColumn = props.maxColumn??-1;
        this._valueColumn = props.valueColumn??-1;
        this._suitColumn = props.suitColumn??-1;

        this._workbookStore = WorkbookStore.getInstance();
        this._stripInfo = props.stripInfo;
    }
    
    @computed
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
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
    public get weightColumn(): number {
        return this._weightColumn;
    }
    public set weightColumn(value: number) {
        this._weightColumn = value;
    }
    @computed
    public get minColumn(): number {
        return this._minColumn;
    }
    public set minColumn(value: number) {
        this._minColumn = value;
    }
    @computed
    public get maxColumn(): number {
        return this._maxColumn;
    }
    public set maxColumn(value: number) {
        this._maxColumn = value;
    }
    @computed
    public get valueColumn(): number {
        return this._valueColumn;
    }
    public set valueColumn(value: number) {
        this._valueColumn = value;
    }
    @computed
    public get suitColumn(): number {
        return this._suitColumn;
    }
    public set suitColumn(value: number) {
        this._suitColumn = value;
    }

    @computed
    public get stops(): Map<number, StopStore> {
        return this._stops;
    }
    public set stops(value: Map<number, StopStore>) {
        this._stops = value;
    }

    public getStopCountFromSheet(): string {
        if(this._tableRange){
            let rowCount = this._workbookStore.getRowCountByRange(this.tableRange);
            return "Stop count: "+rowCount+"\n";
        }
        return "";
    }

    public getFirstStopPreviewFromSheet(): string {
        if(this._tableRange){
            let firstStop = this._workbookStore.getFirstRowCellValuesBySheetAndRange(this._stripInfo.excelSheet, this.tableRange);
            if(firstStop){
                let stop = "First stop - SymbolId: "+firstStop[this._symbolIdColumn]+" - Weight: "+firstStop[this._weightColumn];
                if(this._minColumn!=-1){
                    stop += " - Min: "+firstStop[this._minColumn];
                }
                if(this._maxColumn!=-1){
                    stop += " - Max: "+firstStop[this._maxColumn];
                }
                if(this._valueColumn!=-1){
                    stop += " - Value: "+firstStop[this._valueColumn];
                }
                if(this._suitColumn!=-1){
                    stop += " - Suit: "+firstStop[this._suitColumn];
                }
                return stop;
            }
        }
        return "";
    }

    public getLastStopPreviewFromSheet(): string {
        if(this._tableRange){
            let lastStop = this._workbookStore.getLastRowCellValuesBySheetAndRange(this._stripInfo.excelSheet, this.tableRange);
            if(lastStop){
                let stop = "Last stop - SymbolId: "+lastStop[this._symbolIdColumn]+" - Weight: "+lastStop[this._weightColumn];
                if(this._minColumn!=-1){
                    stop += " - Min: "+lastStop[this._minColumn];
                }
                if(this._maxColumn!=-1){
                    stop += " - Max: "+lastStop[this._maxColumn];
                }
                if(this._valueColumn!=-1){
                    stop += " - Value: "+lastStop[this._valueColumn];
                }
                if(this._suitColumn!=-1){
                    stop += " - Suit: "+lastStop[this._suitColumn];
                }
                return stop;
            }
        }
        return "";
    }

    public getJson = () => {
        let stops: any = {};
        this._stops.forEach( (stopStore, stopId) => {
            stops[stopId] = stopStore.getJson();
        })
        let data = {
            name : this._name,
            stops: stops
        }
        return data;
    }

    public refreshStops = (values : any[]) =>{
        this._stops.clear();
        values.forEach((value, index)=>{
            let stop = new StopStore({symbolID : value[this._symbolIdColumn], weight:value[this._weightColumn]});
            if(this._minColumn!=-1){
                stop.min = value[this._minColumn];
            }
            if(this._maxColumn!=-1){
                stop.max = value[this._maxColumn];
            }
            if(this._valueColumn!=-1){
                stop.value = value[this._valueColumn];
            }
            if(this._suitColumn!=-1){
                stop.suit = value[this._suitColumn];
            }
            this._stops.set(index, stop);
        })
    };

    public getJsonDataForXml = () => {
        let stops: any[] = [];
        this._stops.forEach( (stopStore) => {
            stops.push(stopStore.getJsonDataForXml());
        })
        let data = {
            _attributes: { 
                name : this._name
            },
            Stop: stops
        }
        return data
    }  

}