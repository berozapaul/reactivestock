import React, {Component, Fragment} from 'react';

import Search from './Search';
import Stocklist from './Stocklist';
import Favorite from './Favorite';
import Majorindex from './Majorindex';
import {getUserCookieInfo, uniqueArrObject} from "../utils/Utils";
import { Provider } from 'react-redux';
import { createStore } from 'redux';

/*
 * Purpose: App component is the entry point. It initializes the states.
 *          This component is a state-full component.
 *
 * Version: 1.0
 * Author: dev@cefalo.com
 */

const initial = [];

function reducer(state = initial, action) {
    switch(action.type) {
        case 'ADD':
            state.push(action.data);
            let uniqueArr = uniqueArrObject(state, 'ticker');
            return [...uniqueArr];

        default:
            return state;
    }
}

const store = createStore(reducer);

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {term: '', activestock : [], gainerstock: [], loserstock: [], majorindex: []};
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
        fetch('https://financialmodelingprep.com/api/v3/majors-indexes')
            .then(response =>  response.json())
            .then(resData => {
                // this is an asynchronous function
                this.setState({ majorindex: resData.majorIndexesList });
            });
    }

    productSearch = (term) =>{
        // Change the state so that render gets called per search query.
        this.setState({term: term});
    };

  render() {
      let userObj = getUserCookieInfo() || {};
      return (
          <Provider store={store}>
              <h4>Major indexes</h4>
              <Majorindex stocks={this.state.majorindex}/>

              {userObj.hideActive ? null : <Stocklist stocks={this.state.activestock} data="Active stock"/>  }
              <Stocklist stocks={this.state.gainerstock} data="Gainer stock"/>
              <Stocklist stocks={this.state.loserstock} data="Loser stock"/>
              <Favorite/>
          </Provider>
      );
  }
}
export default Home;
