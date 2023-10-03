
import { computed, makeAutoObservable, observable } from "mobx";
import StripStore from "./stripStore";
import * as fs from "fs-extra";
import WorkbookStore from "./workbookStore";

export interface IStripInfoStore {
    name : string,
    excelSheet : string,
    strips : any,
    selectedStripName : string,
    newStripName : string,
    displayMinCombo : boolean,
    displayMaxCombo : boolean,
    displayValueCombo : boolean,
    displaySuitCombo : boolean
}

export default class StripInfoStore {
    private _workbookStore:WorkbookStore;

    @observable private _name: string;
    @observable private _excelSheet: string;
    @observable private _strips: Map<string, StripStore> = new Map<string, StripStore>();
    @observable private _selectedStripName: string;
    @observable private _newStripName: string;
    @observable private _displayMinCombo: boolean;
    @observable private _displayMaxCombo: boolean;
    @observable private _displayValueCombo: boolean;
    @observable private _displaySuitCombo: boolean;


    constructor(props:IStripInfoStore) {

        makeAutoObservable(this);
        this._workbookStore = WorkbookStore.getInstance();
        this._name = props.name??"";
        this._excelSheet = props.excelSheet??"";
        this._selectedStripName = props.selectedStripName??"";
        this._newStripName = props.newStripName??"";

        this._displayMinCombo = props.displayMinCombo??false;
        this._displayMaxCombo = props.displayMaxCombo??false;
        this._displayValueCombo = props.displayValueCombo??false;
        this._displaySuitCombo = props.displaySuitCombo??false;
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
    public get strips(): Map<string, StripStore> {
        return this._strips;
    }
    public set strips(value: Map<string, StripStore>) {
        this._strips = value;
    }

    @computed
    public get selectedStripName(): string {
        return this._selectedStripName;
    }
    public set selectedStripName(value: string) {
        this._selectedStripName = value;
    }

    @computed
    public get newStripName(): string {
        return this._newStripName;
    }
    public set newStripName(value: string) {
        this._newStripName = value;
    }

    @computed
    public get displayMinCombo(): boolean {
        return this._displayMinCombo;
    }
    public set displayMinCombo(value: boolean) {
        this._displayMinCombo = value;
    }
    @computed
    public get displayMaxCombo(): boolean {
        return this._displayMaxCombo;
    }
    public set displayMaxCombo(value: boolean) {
        this._displayMaxCombo = value;
    }
    @computed
    public get displayValueCombo(): boolean {
        return this._displayValueCombo;
    }
    public set displayValueCombo(value: boolean) {
        this._displayValueCombo = value;
    }
    @computed
    public get displaySuitCombo(): boolean {
        return this._displaySuitCombo;
    }
    public set displaySuitCombo(value: boolean) {
        this._displaySuitCombo = value;
    }

    public addStrip = () => {
        if(this._newStripName && !this._strips.has(this._newStripName)){
            this._strips.set(this._newStripName, new StripStore({name:this._newStripName, stripInfo: this}));
        }
    }

    public removeStrip = (name: string) => {
        if(name && this._strips.has(name)){
            this._strips.delete(name);
        }
    }

    public getJson = () => {
        let strips: any = {};
        this._strips.forEach( (stripStore, stripId) => {
            strips[stripId] = stripStore.getJson();
        })
        let data = {
            name : this._name,
            strips : strips
        }
        return data;
    }

    public getJsonDataForXml = () => {
        let strips: any[] = [];
        this._strips.forEach( (stopStore) => {
            strips.push(stopStore.getJsonDataForXml());
        })
        let data = {
            StripInfo:{
                _attributes: { 
                    name : this._name
                },
                Strip: strips
            }
        }
        return data
    }  

    public saveXmlData = (filePath:string) => {
        this.strips.forEach((strip)=>{
            let values = this._workbookStore.getCellValuesBySheetAndRange(this._excelSheet,strip.tableRange);
            strip.refreshStops(values);
        })
        var convert = require('xml-js');
        var options = {compact: true, ignoreComment: true, spaces: 4};
        fs.writeFile(filePath, convert.js2xml(this.getJsonDataForXml(), options));
    }

}