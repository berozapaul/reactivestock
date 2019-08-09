import React, {Component} from 'react'

class Search extends Component{
    state = {searchTerm: ''}

    onInputChange(searchTerm){
        this.setState({searchTerm});
        this.props.onSearchChange(searchTerm);
    }

    render(){
        return (
            <div className="row">
                <div className="col-xs-12">
                     <div className="form-row">
                         <input
                                onChange={event => this.onInputChange(event.target.value)}
                                value={this.state.searchTerm}
                                type="text" placeholder="Search Product"
                                className="form-control form-control-lg"/>
                     </div>
                </div>
            </div>
        )
    }

}

export default Search
