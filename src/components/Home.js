import React, {Component, Fragment} from 'react';

import Search from './Search';
import Stocklist from './Stocklist';

/*
 * Purpose: App component is the entry point. It initializes the states.
 *          This component is a state-full component.
 *
 * Version: 1.0
 * Author: dev@cefalo.com
 */

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {term: '', stock : []};
    }

    componentDidMount() {
        fetch('https://financialmodelingprep.com/api/v3/stock/actives')
                .then(response =>  response.json())
        .then(resData => {
                // console.log(JSON.stringify(resData))
                // do your logic here
                // let person = resData.results
                // this is an asynchronous function
                this.setState({ stock: resData.mostActiveStock });
        });
    }

    productSearch = (term) =>{
        // Change the state so that render gets called per search query.
        this.setState({term: term});
    };

  render() {
      return (
          <Fragment>
              <h2>Popular stocks</h2>
              <hr/>
              <Search onSearchChange=""/>
              <Stocklist stocks={this.state.stock}/>
          </Fragment>
      );
  }
}
export default Home;
