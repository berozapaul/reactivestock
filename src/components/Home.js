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
        this.state = {term: '', activestock : [], gainerstock: [], loserstock: [],
            majorindex: [], allstock: []};
    }

    componentDidMount() {
        fetch('https://financialmodelingprep.com/api/v3/stock/actives')
                .then(response =>  response.json())
        .then(resData => {
                // this is an asynchronous function
                this.setState({ activestock: resData.mostActiveStock });
                this.setState({ allstock: [...this.state.allstock, ...resData.mostActiveStock] });
        });
        fetch('https://financialmodelingprep.com/api/v3/stock/gainers')
            .then(response =>  response.json())
            .then(resData => {
                // this is an asynchronous function
                this.setState({ gainerstock: resData.mostGainerStock });
                this.setState({ allstock: [...this.state.allstock, ...resData.mostGainerStock] });
            });
        fetch('https://financialmodelingprep.com/api/v3/stock/losers')
            .then(response =>  response.json())
            .then(resData => {
                // this is an asynchronous function
                this.setState({ loserstock: resData.mostLoserStock });
                this.setState({ allstock: [...this.state.allstock, ...resData.mostLoserStock] });
            });
        fetch('https://financialmodelingprep.com/api/v3/majors-indexes')
            .then(response =>  response.json())
            .then(resData => {
                // this is an asynchronous function
                this.setState({ majorindex: resData.majorIndexesList });
            });
    }

  render() {
      let userObj = getUserCookieInfo() || {};
      return (
          <Provider store={store}>
              <Majorindex stocks={this.state.majorindex}/>
              <Search stocks={this.state.allstock}/>
              {userObj.hideActive ? null : <Stocklist stocks={this.state.activestock} data="Active stock"/>  }
              <Stocklist stocks={this.state.gainerstock} data="Gainer stock"/>
              <Stocklist stocks={this.state.loserstock} data="Loser stock"/>
              <Favorite/>
          </Provider>
      );
  }
}
export default Home;