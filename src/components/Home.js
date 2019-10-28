import React, {Component} from 'react';

import Search from './Search';
import Stocklist from './Stocklist';
import Favorite from './Favorite';
import {getUserCookieInfo, getStockData, uniqueArrObject} from "../utils/Utils";
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
    }

    componentDidMount() {
        getStockData().then(data => {
            this.setState({...data});
        });
    }

  render() {
      if (this.state == null) {
          return <div>Loading...</div>
      }
      let userObj = getUserCookieInfo() || {};
      return (
          <Provider store={store}>
                  <Search stocks={this.state.allstock}/>
                  <div className="row">
                      {userObj.hideActive ? null : <Stocklist stocks={this.state.mostActiveStock} data={{user:userObj, label: "Active stock"}}/>}
                      <Stocklist stocks={this.state.mostGainerStock} data={{user:userObj, label: "Gainer stock"}}/>
                      {userObj.username ? '' :  <Stocklist stocks={this.state.mostLoserStock} data={{user:userObj, label: "Loser stock"}}/>}
                      {userObj.username ? <Favorite data={{user:userObj, label: "My favorite stock"}}/> :  '' }
                  </div>
          </Provider>
      );
  }
}
export default Home;
