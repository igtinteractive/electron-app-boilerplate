import { app, BrowserWindow } from 'electron';
import AppComMain from './appCom/appComMain';


export default class Main {

	/** the Electron Apllication  */
	static application: Electron.App;


	/** Main constructor */
	static main() {
		
		Main.application = app;
		Main.application.on("window-all-closed", Main.onWindowAllClosed);
		Main.application.on("ready", Main.onReady);

		//** set the project data */
		let projectData = {
			appData : {
				selectedBookId: null
			},
	
			projectData : {
				books : {
					1 :  {
						bookId : 1,
						title : "Book A",
						authorId : 1,
						publisherId : 1
					},
			
					2 :  {
						bookId : 2,
						title : "Book B",
						authorId : 1,
						publisherId : 1
					},
			
					3 :  {
						bookId : 3,
						title : "The Book C",
						authorId : 2,
						publisherId : 1
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
						"lastName" : "The Writer",
						"email" : "max@email.com"
					}
				},
				
				"publishers" : {
					"1" :  {
						"publisherId" : 1,
						"name" : "The Publisher",
						"contacName" : "The Publisher Guy",
						"email" : "guy@email.com"
					},
					"2" :  {
						"publisherId" : 2,
						"name" : "Some Other Publisher",
						"contacName" : "Some Other Guy",
						"email" : "otherguy@email.com"
					}
				} 
			}
			
		}		
		AppComMain.getInstance().syncData("projectData", JSON.stringify(projectData));

	}

	/** called when the Application in initialize and ready */
	private static onReady = () => {
		//--- Open the pageA when app start
		AppComMain.getInstance().openWindow({windowName:"pageA", title:"Page A", maximize:true});
	}

	/**
	 * called once all windows are closed.
	 */
	private static onWindowAllClosed = () => {

		// Quit 
		if (process.platform !== "darwin") { 
			Main.application.quit(); 
		} else {
			process.exit();
		}

		Main.application.quit();

	}
}

Main.main();
