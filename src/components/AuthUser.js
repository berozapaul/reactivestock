import React from 'react';
import AppContext from '../AppContext';
import {NavLink} from "react-router-dom";
/*
 * Purpose: The purpose of this component is to handle user login, logout
 *          using React Context API.
 * Version: 1.0
 * Author: dev@cefalo.com
 */

const AuthUser = () =>  (
    <AppContext.Consumer>
        {(context) => { // Consumer requires a function as a child
            // Check if the user is logged in or not
            if(context.state.user){
                return (
                // Fragments let us group a list of children without adding extra nodes to the DOM.
                <React.Fragment>
                    <ul className="nav navbar-nav">
                        <li><a href="#" onClick={context.toggleTheme}><i className={"fas " + (context.state.theme == 'light' ? "fa-sun" : "fa-moon")}></i> Theme</a></li>
                        <li><NavLink exact to="/" activeClassName="active">Welcome {context.state.user.username}</NavLink></li>
                        <li><a href="#" onClick={context.handleLogout}><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
                    </ul>
                </React.Fragment>
                )
            }
            return (
                <React.Fragment>
                    <ul className="nav navbar-nav">
                        <li><a href="#" onClick={context.toggleTheme}><i className={"fas " + (context.state.theme == 'light' ? "fa-sun" : "fa-moon")}></i> Theme</a></li>
                        <li><a href="#" onClick={context.openModal} id="signinForm"><i className="fas fa-sign-in-alt"></i> Login</a></li>
                    </ul>
                </React.Fragment>
                )
            }
        }
    </AppContext.Consumer>
);

export default AuthUser;

