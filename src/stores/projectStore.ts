import { computed, makeAutoObservable, observable } from "mobx";
import AuthorStore from "./authorStore";
import PublisherStore from "./publisherStore";
import BookStore from "./bookStore";
import { ipcRenderer } from "electron";
import AppComRenderer, { AppComEventTypes } from "../electron/appCom/appComRenderer";

export interface IProjectProps {
    appData : {
        selectedBookId? : string
    },
    projectData : {
        books : any, // Map of books
        authors : any, // Map of authors 
        publishers : any, // map of publisher
    }
}

export default class ProjectStore {
    
    private static _instance: ProjectStore | undefined = undefined;

    @observable private _selectedBookId: string | null = null;    

    @observable private _authors: Map<string, AuthorStore> = new Map<string, AuthorStore>();    
    @observable private _publishers: Map<string, PublisherStore> = new Map<string, PublisherStore>();    
    @observable private _books: Map<string, BookStore> = new Map<string, BookStore>();

    public static getInstance = () => {
		if (!ProjectStore._instance) {
            //*** create the static _instance for the singleton */
			ProjectStore._instance = new ProjectStore();
            
            //*** make it bservable for mobx decorator to work.*/
            makeAutoObservable(ProjectStore._instance);
            
            //*** fetch data from electron main process and initialize */
            let projectData = AppComRenderer.getInstance().getData("projectData");
            this._instance?.initStore(JSON.parse(projectData));
            
            //*** Data Sync Events **************************************************/
            ipcRenderer.on(AppComEventTypes.syncData, (evt, dataKey, stringJson) => {
                switch (dataKey) {
                    case "projectData" :
                        this._instance?.initStore(JSON.parse(stringJson));
                        break;
                }
            });

		}
		return ProjectStore._instance;
	}
    
    /**
     * Clear existing data and (re)Initialize the ProjectStore.
     * @param projectProps IProjectProps
     */
    public initStore(projectProps: IProjectProps) {
        this._selectedBookId = projectProps.appData.selectedBookId ? projectProps.appData.selectedBookId : null;
        
        //-- create author Stores 
        this._authors.clear();
        for (let authorId in projectProps.projectData.authors) {            
            this._authors.set(authorId, new AuthorStore( projectProps.projectData.authors[authorId] ))
        }

        //-- create publisher Stores
        this._publishers.clear();
        for (let publisherId in projectProps.projectData.publishers) {            
            this._publishers.set(publisherId, new PublisherStore( projectProps.projectData.publishers[publisherId] ))
        }

        //-- create book Stores 
        this._books.clear();
        for (let bookId in projectProps.projectData.books) {            
            this._books.set(bookId, new BookStore( projectProps.projectData.books[bookId] ))
        }
    }

    @computed
    public get selectedBookId(): string | null {
        return this._selectedBookId;
    }
    public set selectedBookId(value: string | null) {
        this._selectedBookId = value;
    }

    @computed
    public get authors(): Map<string, AuthorStore> {
        return this._authors;
    }
    public set authors(value: Map<string, AuthorStore>) {
        this._authors = value;
    }

    @computed
    public get publishers(): Map<string, PublisherStore> {
        return this._publishers;
    }
    public set publishers(value: Map<string, PublisherStore>) {
        this._publishers = value;
    }
    
    @computed
    public get books(): Map<string, BookStore> {
        return this._books;
    }
    public set books(value: Map<string, BookStore>) {
        this._books = value;
    }

    public syncData = () => {
        AppComRenderer.getInstance().syncData("projectData", JSON.stringify(this.getJson()));
    }

    public getJson = () => {
        let books: any = {};
        this._books.forEach( (bookStore, bookId) => {
            books[bookId] = bookStore.getJson();
        });

        let authors: any = {};
        this._authors.forEach( (authorStore, authorId) => {
            authors[authorId] = authorStore.getJson();
        })

        let publishers: any = {};
        this._publishers.forEach( (publisherStore, publisherId) => {
            publishers[publisherId] = publisherStore.getJson();
        })


        let data = {
            appData : {
                selectedBookId : this._selectedBookId ? this._selectedBookId : undefined
            },
            projectData : {
                books : books, // Map of books
                authors : authors, // Map of authors 
                publishers : publishers, // map of publisher
            }
        }

        console.log(" =============== ");
        console.log(data);
        console.log("----------------");        

        return data;
    }
}