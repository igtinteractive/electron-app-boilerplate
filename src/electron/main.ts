import { app } from 'electron';
import AppComMain from './appCom/appComMain';
import { v4 } from 'uuid';

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
					"5e1d7b29-0dc0-4275-985a-87a11a5f4fef" :  {
						bookId : "5e1d7b29-0dc0-4275-985a-87a11a5f4fef",
						title : "Book A",
						authorId : 1,
						publisherId : 1
					},
			
					"e3138188-f952-4060-8488-ceec3638a816" :  {
						bookId : "e3138188-f952-4060-8488-ceec3638a816",
						title : "Book B",
						authorId : 1,
						publisherId : 1
					},
			
					"48aecd37-58a6-4edf-b2eb-606e76af10f5" :  {
						bookId : "48aecd37-58a6-4edf-b2eb-606e76af10f5",
						title : "The Book C",
						authorId : 2,
						publisherId : 1
					}
				},
			
				authors : {
					"5e1d7b29-0dc0-4275-985a-87a11a5f4fef" :  {
						authorId : "5e1d7b29-0dc0-4275-985a-87a11a5f4fef",
						firstName : "Frederic",
						lastName : "Lajeunesse",
						email : "frederic@email.com"
					},
			
					"e3138188-f952-4060-8488-ceec3638a816" :  {
						authorId : "e3138188-f952-4060-8488-ceec3638a816",
						firstName : "Max",
						lastName : "The Writer",
						email : "max@email.com"
					}
				},
				
				publishers : {
					"5e1d7b29-0dc0-4275-985a-87a11a5f4fef" :  {
						publisherId : "5e1d7b29-0dc0-4275-985a-87a11a5f4fef",
						name : "The Publisher",
						contacName : "The Publisher Guy",
						email : "guy@email.com"
					},
					"e3138188-f952-4060-8488-ceec3638a816" :  {
						publisherId : "e3138188-f952-4060-8488-ceec3638a816",
						name : "Some Other Publisher",
						contacName : "Some Other Guy",
						email : "otherguy@email.com"
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
