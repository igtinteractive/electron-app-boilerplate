
import { computed, makeAutoObservable, observable } from "mobx";
import StopStore from "./stopStore";

export interface IStripStore {
    name? : string,
    tableRange? : string,
    symbolIdColumn? : string,
    weightColumn? : string
}

export default class StripStore {

    @observable private _name: string;
    @observable private _tableRange: string;
    @observable private _symbolIdColumn: string;
    @observable private _weightColumn: string;
    @observable private _stops: Map<string, StopStore> = new Map<string, StopStore>();

    constructor(props:IStripStore) {

        makeAutoObservable(this);

        this._name = props.name??"";
        this._tableRange = props.tableRange??"";
        this._symbolIdColumn = props.symbolIdColumn??"";
        this._weightColumn = props.weightColumn??"";
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
    public get symbolIdColumn(): string {
        return this._symbolIdColumn;
    }
    public set symbolIdColumn(value: string) {
        this._symbolIdColumn = value;
    }
    @computed
    public get weightColumn(): string {
        return this._weightColumn;
    }
    public set weightColumn(value: string) {
        this._weightColumn = value;
    }

    @computed
    public get stops(): Map<string, StopStore> {
        return this._stops;
    }
    public set stops(value: Map<string, StopStore>) {
        this._stops = value;
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

}