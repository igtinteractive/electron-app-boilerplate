
import { computed, makeAutoObservable, observable } from "mobx";
import StripStore from "./stripStore";

export interface IStripInfoStore {
    name : string,
    excelSheet : string,
    strips : any,
    selectedStripName : string
}

export default class StripInfoStore {

    @observable private _name: string;
    @observable private _excelSheet: string;
    @observable private _strips: Map<string, StripStore> = new Map<string, StripStore>();
    @observable private _selectedStripName: string;

    constructor(props:IStripInfoStore) {

        makeAutoObservable(this);

        this._name = props.name??"";
        this._excelSheet = props.excelSheet??"";
        this._selectedStripName = props.selectedStripName??"";
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

    public addStrip = (name: string | undefined) => {
        if(name){
            this._strips.set(name, new StripStore({name:name}))
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

}