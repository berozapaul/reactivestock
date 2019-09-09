import React, { Component }  from 'react';
import AppContext from '../AppContext';
import {getUserCookieInfo, setUserInfoCookie, isEmptyObject} from './../utils/Utils';
import Cookies from "js-cookie";

/*
 * Purpose: Every Context object comes with a Provider React component that allows
 *          consuming components to subscribe to context changes.
 * Version: 1.0
 * Author: dev@cefalo.com
 */

class ModalProvider extends Component {
    constructor(...args) {
        super(...args);
        let userCookieObj = getUserCookieInfo() || {};
        let userObj = isEmptyObject(userCookieObj) ? "" : userCookieObj;
        this.state = { openModalId: '', user: userObj };
    }

    openModal(event) {
        this.setState({ openModalId: event.target.id });
    }

    closeModal() {
        this.setState({ openModalId: '' });
    }

    handleLogin(event) {
        let userName = event.target.username.value;
        let userObj = {username: userName, password: event.target.password.value};
        this.setState({ user: userObj });
        this.setState({ openModalId: '' });

        // Store user preferences in user's cookie
        setUserInfoCookie(userObj);
    }

    handleLogout(event){
        this.setState({ user: ''});
        Object.keys(Cookies.get()).forEach(function(cookie) {
            Cookies.remove(cookie);
        });
    }

    render() {
        return (
            <AppContext.Provider value={{
                state: this.state,
                openModal: (e) => this.openModal(e),
                handleLogin: (e) => this.handleLogin(e),
                handleLogout: () => this.handleLogout(),
                closeModal: () => this.closeModal()
            }}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

export default ModalProvider;
