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

		//*** Create demo data *******************************/
		let b1 = v4(), b2 = v4(), b3 = v4();
		let aut1 = v4(), aut2 = v4();
		let pub1 = v4(), pub2 =v4(), pub3 = v4(); 

		let projectData = {
			appData : {
				selectedBookId: null
			},
	
			projectData : {
				books : {
					[b1] :  {
						bookId :b1,
						title : "Book A",
						authorId : aut1,
						publisherId : pub1
					},
			
					[b2] :  {
						bookId : b2,
						title : "Book B",
						authorId : aut1,
						publisherId : pub2
					},
			
					[b3] :  {
						bookId : b3,
						title : "The Book C",
						authorId : aut2,
						publisherId : pub1
					}
				},
			
				authors : {
					[aut1] :  {
						authorId : aut1,
						firstName : "Frederic",
						lastName : "Lajeunesse",
						email : "frederic@email.com"
					},
			
					[aut2] :  {
						authorId : aut2,
						firstName : "Max",
						lastName : "The Writer",
						email : "max@email.com"
					}
				},
				
				publishers : {
					[pub1] :  {
						publisherId : pub1,
						name : "The Publisher",
						contacName : "The Publisher Guy",
						email : "guy@email.com"
					},
					[pub2] :  {
						publisherId :pub2,
						name : "Some Other Publisher",
						contacName : "Some Other Guy",
						email : "otherguy@email.com"
					}
				} 
			}			
		}		

		//** set the project data */
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
