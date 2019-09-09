import React from 'react';
import {getUserCookieInfo, saveUserPreference} from './../utils/Utils';

/*
 * Purpose: The purpose of this component is to render a user profile and preferences.
 *          This component does not have any state hence it is
 *          a functional component. React also encourages to have stateless
 *          components.
 * Version: 1.0
 * Author: dev@cefalo.com
 */
function Profile(props) {
    let userObj = getUserCookieInfo() || {};
    function handleUserPreference(event) {
        event.preventDefault();
        let formObj = event.target.elements;
        ['username', 'hideActive'].forEach(function (field) {
            if(formObj[field].type === 'checkbox'){
                userObj[field] = formObj[field].checked;
            } else if(formObj[field].type === 'text'){
                userObj[field] = formObj[field].value;
            }
        });
        saveUserPreference(userObj);
    }

    if(userObj.username) {
        return (
            <form onSubmit={handleUserPreference}>
                <div className="form-group row">
                    <div className="col-xs-12"><h1>Your preferences</h1></div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-1 col-form-label">Name</label>
                    <div className="col-sm-4">
                        <input type="text" readOnly defaultValue={userObj.username} className="form-control" name="username"/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-1">
                        <input name="hideActive" type="checkbox" defaultChecked={userObj.hideActive} className="form-control"/>
                    </div>
                    <label className="col-sm-4 col-form-label">Hide active stocks</label>
                </div>
                <div className="form-group row">
                    <div className="col-sm-4">
                        <input type="submit" defaultValue="Save" className="btn btn-primary active"/>
                    </div>
                </div>
            </form>
        );
    }
    else {
        return <div>Sorry! you need to login to see your profile.</div>
    }

}

export default Profile;