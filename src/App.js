import React  from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css';

import Home from './components/Home';
import About from './components/About';
import ModalProvider from "./components/ModalProvider";
import Header from "./components/Header";
import Company from "./components/Company";
import Profile from "./components/Profile";
import AppContext from "./AppContext";

function App(){
  return(
      <ModalProvider>
          <AppContext.Consumer>
              {(context) => (
                  <div className={"wrapper " +  context.state.theme}>
                      <div className="reactjs-app container">
                          <BrowserRouter>
                              <Header/>
                              <Switch>
                                  <Route path="/" exact component={Home}></Route>
                                  <Route path="/about" component={About}></Route>
                                  <Route path="/profile" component={Profile}></Route>
                                  <Route path="/company/:slug" component={Company}></Route>
                              </Switch>
                          </BrowserRouter>
                      </div>
                  </div>
              )}
          </AppContext.Consumer>
      </ModalProvider>
  )
}
export default App;
