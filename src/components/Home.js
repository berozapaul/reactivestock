import React, {Component, Fragment} from 'react';

import Search from './Search';
import Stocklist from './Stocklist';
import {getUserCookieInfo} from "../utils/Utils";

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
        this.state = {term: '', activestock : [], gainerstock: [], loserstock: []};
    }

    componentDidMount() {
        fetch('https://financialmodelingprep.com/api/v3/stock/actives')
                .then(response =>  response.json())
        .then(resData => {
                // this is an asynchronous function
                this.setState({ activestock: resData.mostActiveStock });
        });
        fetch('https://financialmodelingprep.com/api/v3/stock/gainers')
            .then(response =>  response.json())
            .then(resData => {
                // this is an asynchronous function
                this.setState({ gainerstock: resData.mostGainerStock });
            });
        fetch('https://financialmodelingprep.com/api/v3/stock/losers')
            .then(response =>  response.json())
            .then(resData => {
                // this is an asynchronous function
                this.setState({ loserstock: resData.mostLoserStock });
            });
    }

    productSearch = (term) =>{
        // Change the state so that render gets called per search query.
        this.setState({term: term});
    };

  render() {
      let userObj = getUserCookieInfo() || {};
      return (
          <Fragment>
              <h2>Popular stocks</h2>
              <hr/>
              <Search onSearchChange=""/>
              {userObj.hideActive ? null : <Stocklist stocks={this.state.activestock} data="Active stock"/>  }
              <Stocklist stocks={this.state.gainerstock} data="Gainer stock"/>
              <Stocklist stocks={this.state.loserstock} data="Loser stock"/>
          </Fragment>
      );
  }
}
export default Home;
