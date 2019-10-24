import React, {Component} from 'react';
import AutoComplete  from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withRouter } from "react-router-dom";

class Search extends Component{
    state = {searchTerm: ''};
    dataSourceConfig = {text: "companyName"};

    handleNewRequest = (value) => {
        this.props.history.push("/company/nvr-inc-NVR");
    };
    render(){
        return (

            <div className="row search-container">
                <div className="col-xs-12">
                     <h4>Search stocks</h4>
                     <div className="form-row">
                         <MuiThemeProvider>
                             <AutoComplete
                                 floatingLabelText="Same text, different values"
                                 onNewRequest={this.handleNewRequest}
                                 openOnFocus={true}
                                 dataSource={this.props.stocks}
                                 dataSourceConfig={this.dataSourceConfig}/>
                         </MuiThemeProvider>
                     </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Search)

