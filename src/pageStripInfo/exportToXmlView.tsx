import { observer } from "mobx-react";
import React , { Component } from "react";
import StripInfoStore from "../stores/stripInfoStore";
import AppComRenderer from "../electron/appCom/appComRenderer";

export interface IExportToXmlViewProps extends React.HTMLAttributes<HTMLElement> {
       stripInfo: StripInfoStore
}

@observer
export class ExportToXmlView extends Component < IExportToXmlViewProps > {

    constructor(props: any) {
		super(props);
	}

    private saveData = () => {
		let filePath = AppComRenderer.getInstance().showSaveDialogSync({filters: [{
            name: 'Xml file',
            extensions: ['xml']
          }]});		
		if (filePath) {
			this.props.stripInfo.saveXmlData(filePath);
		}				
	}

    render() {  
        let strips = this.props.stripInfo.strips;   
        if (strips.size) {
            return <div style ={{ width: "300px" }} >
                <button style={{margin:"10px"}} onClick={() => { this.saveData();	}}> Export to XML </button>
				<div className="fl-expand-child"></div>
            </div>
        } else {
            return null
        }       
        
    }
}