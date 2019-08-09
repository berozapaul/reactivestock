import React from 'react';
import AppContext from '../AppContext';
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
                        <li><a href="/">Welcome {context.state.user.username}</a></li>
                        <li><a href="#" onClick={context.handleLogout}><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
                    </ul>
                </React.Fragment>
                )
            }
            return (
                    <a href="#" onClick={context.openModal} id="signinForm">
                        <span className="glyphicon glyphicon-log-in"></span> Login
                    </a>
                )
            }
        }
    </AppContext.Consumer>
);

export default AuthUser;
