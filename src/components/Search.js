import React, {Component} from 'react';
import AutoComplete  from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withRouter } from "react-router-dom";

class Search extends Component{
    state = {searchTerm: ''};
    dataSourceConfig = {text: "companyName"};

    handleNewRequest = (companyObj) => {
        if(companyObj.ticker){
            this.props.history.push("/company/nvr-inc-" + companyObj.ticker);
        }
    };
    render(){
        return (

            <div className="row search-container">
                <div className="col-xs-12">
                     <div className="form-row">
                         <MuiThemeProvider>
                             <AutoComplete
                                 floatingLabelText="Search stock"
                                 onNewRequest={this.handleNewRequest}
                                 openOnFocus={true}
                                 dataSource={this.props.stocks}
                                 fullWidth
                                 dataSourceConfig={this.dataSourceConfig}/>
                         </MuiThemeProvider>
                     </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Search)

