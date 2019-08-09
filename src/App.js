import React, { Component } from 'react';
import './App.css';

import Header from './components/Header';
import Search from './components/Search';
import ModalProvider from './components/ModalProvider';

/*
 * Purpose: App component is the entry point. It initializes the states.
 *          This component is a state-full component.
 *
 * Version: 1.0
 * Author: dev@cefalo.com
 */
class App extends Component {

    constructor(props){
        super(props);
        this.state = {term: ''};
    }

    productSearch = (term) =>{
        // Change the state so that render gets called per search query.
        this.setState({term: term});
    };

  render() {
      return (
          <ModalProvider>
              <div className="reactjs-app">
                  <Header/>
                  <div className="container">
                     <h2>Popular stocks</h2>
                     <hr/>
                     <Search onSearchChange=""/>
                  </div>
                  <hr/>
              </div>
          </ModalProvider>
      );
  }
}

export default App;
