
import { computed, makeAutoObservable, observable } from "mobx";
import PrizeStore from "./prizeStore";
import * as fs from "fs-extra";
import WorkbookStore from "./workbookStore";

export interface IPrizeInfoStore {
    name : string,
    excelSheet : string,
    tableRange? : string,
    symbolIdColumn? : number,
    payColumn? : number,
    prizes : any,
    headers : any

    newPrizeName : string,
    filepath : string
}

export default class PrizeInfoStore {
    private _workbookStore:WorkbookStore;

    @observable private _filepath: string;
    @observable private _name: string;
    @observable private _excelSheet: string;
    @observable private _tableRange: string;
    @observable private _symbolIdColumn: number;
    @observable private _payColumn: number;
    @observable private _prizes: Map<string, PrizeStore> = new Map<string, PrizeStore>();
    @observable private _newPrizeName: string;
    @observable private _headers: Array<string> = new Array<string>();
   


    constructor(props:IPrizeInfoStore) {

        makeAutoObservable(this);
        this._workbookStore = WorkbookStore.getInstance();
        this._name = props.name??"";
        this._excelSheet = props.excelSheet??"";
        this._tableRange = props.tableRange??"";
        this._symbolIdColumn = props.symbolIdColumn??0;
        this._payColumn = props.payColumn??0;
        this._newPrizeName = props.newPrizeName??"";
        this._headers = props.headers??"";
        this._filepath = props.filepath??"";


     
    }
    
    @computed
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    @computed
    public get excelSheet(): string {
        return this._excelSheet;
    }
    public set excelSheet(value: string) {
        this._excelSheet = value;
    }

    @computed
    public get filepath(): string {
        return this._filepath;
    }
    public set filepath(value: string) {
        this._filepath = value;
    }

    @computed
    public get prizes(): Map<string, PrizeStore> {
        return this._prizes;
    }
    public set prizes(value: Map<string, PrizeStore>) {
        this._prizes = value;
    }

    @computed
    public get headers(): Array<string> {
        return this._headers;
    }
    public set headers(value: Array<string>) {
        this._headers = value;
    }


    @computed
    public get newPrizeName(): string {
        return this._newPrizeName;
    }
    public set newPrizeName(value: string) {
        this._newPrizeName = value;
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


    public addPrize = () => {
        if(this._newPrizeName && !this._prizes.has(this._newPrizeName)){
            this._prizes.set(this._newPrizeName, new PrizeStore({name:this._newPrizeName, prizeInfo: this}));
        }
    }

    public removePrize = (name: string) => {
        if(name && this._prizes.has(name)){
            this._prizes.delete(name);
        }
    }

    public getJson = () => {
        let prizes: any = {};
        this._prizes.forEach( (PrizeStore, prizeId) => {
            prizes[prizeId] = PrizeStore.getJson();
        })
        let data = {
            name : this._name,
            prizes : prizes
        }
        return data;
    }

    public getJsonDataForXml = () => {
        let prizes: any[] = [];
        this._prizes.forEach( (prizeStore) => {
            prizes.push(prizeStore.getJsonDataForXml());
        })
        let data = {
            PrizeInfo:{
                _attributes: { 
                    name : this._name
                },
                Prize: prizes
            }
        }
        return data
    }  

    public saveXmlData = (filePath:string) => {
        var convert = require('xml-js');
        var options = {compact: true, ignoreComment: true, spaces: 4};
        fs.writeFile(filePath, convert.js2xml(this.getJsonDataForXml(), options));
    }

}