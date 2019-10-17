import React, {Component} from 'react'

class Search extends Component{
    state = {searchTerm: ''}

    onInputChange(searchTerm){
        this.setState({searchTerm});
        console.log(this.props.stocks);
    }

    render(){
        return (
            <div className="row search-container">
                <div className="col-xs-12">
                     <h4>Search stocks</h4>
                     <div className="form-row">
                         <input
                                onChange={event => this.onInputChange(event.target.value)}
                                value={this.state.searchTerm} type="text" placeholder="Type stock name"
                                className="form-control form-control-lg"/>
                     </div>
                </div>
            </div>
        )
    }

}

export default Search
