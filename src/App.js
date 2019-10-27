import React  from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css';

import Home from './components/Home';
import About from './components/About';
import ModalProvider from "./components/ModalProvider";
import Company from "./components/Company";
import Profile from "./components/Profile";
import AppContext from "./AppContext";
import Majorindex from "./components/Majorindex";
import Header from "./components/Header";

function App(){
        const [majorIndex, setMajorIndex] = React.useState([]);
        React.useEffect(() => {

        fetch('https://financialmodelingprep.com/api/v3/majors-indexes')
            .then(results => results.json())
            .then(data => {
                setMajorIndex(data.majorIndexesList);
            });

    }, []);
  return(
      <ModalProvider>
          <AppContext.Consumer>
              {(context) => (
                  <div className={"wrapper " +  context.state.theme}>
                      <div className="reactjs-app container">
                          <Majorindex stocks={majorIndex}/>
                          <BrowserRouter>
                              <Header/>
                              <div className="stock-container">
                              <Switch>
                                  <Route path="/" exact component={Home}></Route>
                                  <Route path="/about" component={About}></Route>
                                  <Route path="/profile" component={Profile}></Route>
                                  <Route path="/company/:slug" component={Company}></Route>
                              </Switch>
                              </div>
                          </BrowserRouter>
                      </div>
                  </div>
              )}
          </AppContext.Consumer>
      </ModalProvider>
  )
}
export default App;
