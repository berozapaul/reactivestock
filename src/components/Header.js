import React from 'react';
import Modal from './Modal';
import AuthUser from './AuthUser';
import {NavLink} from 'react-router-dom';

/*
 * Purpose: The purpose of this component is to render common header.
 *          This component is going to be common to all routes. It is
 *          also responsible for showing a signin dialog for the user.
 *          As soon as user signs up it shows the user as logged in.
 * Version: 1.0
 * Author: dev@cefalo.com
 */

const Header = () =>{
   return(
       <div>
           <nav className="navbar navbar-default">
               <div className="container-fluid stock-container">
                   <div className="navbar-header">
                       <NavLink exact to="/" className="navbar-brand">Reactive stock</NavLink>
                   </div>
                   <ul className="nav navbar-nav">
                       <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                       <li><NavLink exact to="/about" activeClassName="active">About</NavLink></li>
                       <li><NavLink exact to="/profile" activeClassName="active">Profile</NavLink></li>
                   </ul>
                   <ul className="nav navbar-nav navbar-right">
                       <li>
                           <AuthUser/>
                       </li>
                   </ul>
               </div>
           </nav>
           <Modal modalType="signinForm">
               {(context) => (
                   <React.Fragment>
                       <form onSubmit={context.handleLogin}>
                           <h2>Welcome to reactive stock app!!</h2>
                           <div className="form-group">
                                <input name="username" placeholder="Username" className="form-control" type="text" />
                           </div>
                           <div className="form-group">
                               <input name="password" placeholder="Password" className="form-control" type="password" />
                           </div>
                           <input type="submit" value="Submit" className="btn btn-primary active" /> &nbsp;
                           <button onClick={context.closeModal} className="btn btn-primary">Close</button>
                       </form>
                   </React.Fragment>
               )}
           </Modal>
       </div>
   )
};
export default Header;
