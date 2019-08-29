import React  from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css';

import Home from './components/Home';
import About from './components/About';
import ModalProvider from "./components/ModalProvider";
import Header from "./components/Header";
import Company from "./components/Company";


function App(){
  return(
      <ModalProvider>
          <div className="reactjs-app container">
             <BrowserRouter>
                 <Header/>
                 <Switch>
                     <Route path="/" exact component={Home}></Route>
                     <Route path="/about" component={About}></Route>
                     <Route path="/company/:slug" component={Company}></Route>
                 </Switch>
             </BrowserRouter>
          </div>
      </ModalProvider>
  )
}
export default App;
