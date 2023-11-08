import { observer } from "mobx-react";
import React , { Component } from "react";
import PrizeInfoStore from "../stores/prizeInfoStore";
import AppComRenderer from "../electron/appCom/appComRenderer";

export interface IExportToXmlViewPrizeProps extends React.HTMLAttributes<HTMLElement> {
       prizeInfo: PrizeInfoStore
}

@observer
export class ExportToXmlViewPrize extends Component < IExportToXmlViewPrizeProps > {

    constructor(props: any) {
		super(props);
	}

    private saveData = () => {
		let filePath = AppComRenderer.getInstance().showSaveDialogSync({filters: [{
            name: 'Xml file',
            extensions: ['xml']
          }]});		
		if (filePath) {
			this.props.prizeInfo.saveXmlData(filePath);
		}				
	}

    render() {  
        let prizes = this.props.prizeInfo.prizes;   
        if (prizes.size) {
            return <div style ={{ width: "300px" }} >
                <button style={{margin:"10px"}} onClick={() => { this.saveData();	}}> Export to XML </button>
				<div className="fl-expand-child"></div>
            </div>
        } else {
            return null
        }       
        
    }
}