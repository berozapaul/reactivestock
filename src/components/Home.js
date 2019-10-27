import React, {Component, Fragment} from 'react';

import Search from './Search';
import Stocklist from './Stocklist';
import Favorite from './Favorite';
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
    let uniqueData;
    switch(action.type) {
        case 'ADD':
            state.push(action.data);
            uniqueData = uniqueArrObject(state, 'ticker');
            return [...uniqueData];
        case 'REMOVE':
            state.splice(action.data, 1);
            uniqueData = uniqueArrObject(state, 'ticker');
            return [...uniqueData];
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
                this.setState({ allstock: uniqueArrObject([...this.state.allstock, ...resData.mostLoserStock], 'ticker') });
            });
    }

  render() {
      let userObj = getUserCookieInfo() || {};
      return (
          <Provider store={store}>
              <div className="stock-container">
                  <Search stocks={this.state.allstock}/>
                  <div className="row">
                      {userObj.hideActive ? null : <Stocklist stocks={this.state.activestock} data={{user:userObj, label: "Active stock"}}/>}
                      <Stocklist stocks={this.state.gainerstock} data={{user:userObj, label: "Gainer stock"}}/>
                      {userObj.username ? '' :  <Stocklist stocks={this.state.loserstock} data={{user:userObj, label: "Loser stock"}}/>}
                      {userObj.username ? <Favorite data={{user:userObj, label: "My favorite stock"}}/> :  '' }
                  </div>
              </div>
          </Provider>
      );
  }
}
export default Home;
