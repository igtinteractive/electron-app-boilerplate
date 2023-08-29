import { computed, observable } from "mobx";
import AuthorStore from "./authorStore";
import PublisherStore from "./publisherStore";
import BookStore from "./bookStore";

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
    
    private _projectData = {
        "appData" : {
        },

        "projectData" : {
            "books" : {
                "1" :  {
                    "bookId" : 1,
                    "title" : "Book A",
                    "authorId" : 1,
                    "publisherId" : 1
                },
        
                "2" :  {
                    "bookId" : 2,
                    "title" : "Book B",
                    "authorId" : 1,
                    "publisherId" : 1
                },
        
                "3" :  {
                    "bookId" : 3,
                    "title" : "The Book C",
                    "authorId" : 2,
                    "publisherId" : 1
                }
            },
        
            "authors" : {
                "1" :  {
                    "authorId" : 1,
                    "firstName" : "Frederic",
                    "lastName" : "Lajeunesse",
                    "email" : "frederic@email.com"
                },
        
                "2" :  {
                    "authorId" : 1,
                    "firstName" : "Max",
                    "lastName" : "Value",
                    "email" : "max@email.com"
                }
            },
            
            "publishers" : {
                "1" :  {
                    "publisherId" : 1,
                    "name" : "The Publisher",
                    "contacName" : "The Publisher Guy",
                    "email" : "guy@email.com"
                }
            } 
        }
        
    }

    @observable private _selectedBookId: string | null = null;    

    @observable private _authors: Map<string, AuthorStore> = new Map<string, AuthorStore>();    
    @observable private _publishers: Map<string, PublisherStore> = new Map<string, PublisherStore>();    
    @observable private _books: Map<string, BookStore> = new Map<string, BookStore>();

    public static getInstance = () => {
		if (!ProjectStore._instance) {
			ProjectStore._instance = new ProjectStore();
			ProjectStore._instance.initStore(ProjectStore._instance._projectData);

			// ipcRenderer.on("main.ProjectPropsUpdate", (evt, args) => {
			// 	ProjectStore._instance?.initStore(args);
			// 	console.log("[ProjectStore] on main.ProjectPropsUpdate", args);
			// 	//AssetManager.getInstance().init(ProjectStore._instance);
			// });
		}
		return ProjectStore._instance;
	}
    
    public initStore(projectProps: IProjectProps) {
        this._selectedBookId = projectProps.appData.selectedBookId ? projectProps.appData.selectedBookId : null;
        
        //-- create author Stores 
        for (let authorId in projectProps.projectData.authors) {            
            this._authors.set(authorId, new AuthorStore( projectProps.projectData.authors[authorId] ))
        }

        //-- create publisher Stores 
        for (let publisherId in projectProps.projectData.publishers) {            
            this._publishers.set(publisherId, new PublisherStore( projectProps.projectData.publishers[publisherId] ))
        }

        //-- create book Stores 
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
}