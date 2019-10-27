import React from 'react';
import {strToSlug, getUniqueKey} from './../utils/Utils';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

/*
 * Purpose: The purpose of this component is to render list of stocks.
 * Version: 1.0
 * Author: dev@cefalo.com
 */
const Stocklist = ({stocks, data, dispatch}) => {
    let apiUrl = 'https://financialmodelingprep.com';
    let stocklist = (stocks.length < 1) ? <p>Stocks are not available yet.</p> : '';

    if(Array.isArray(stocks) && stocks.length > 0){
        stocklist = stocks.map((stock, key) =>
            <li className="list-group-item" key={getUniqueKey()}>
                <div className="flexgrid clearfix item-container">
                    <div className="pull-left each-item" >
                        <img width="30" src={`${apiUrl}/stocks/${stock.ticker.toLowerCase()}.png`}/>
                        <NavLink exact to={`/company/${strToSlug(stock.companyName)}-${stock.ticker}`}>{stock.companyName}</NavLink>
                    </div>
                    {(data.user.username !== undefined) ? data.label != 'My favorite stock' ? <i onClick={() => dispatch({ type: 'ADD', data: stock })} className="fas fa-thumbs-up" title="Add to favourite"></i> : <i onClick={() => dispatch({ type: 'REMOVE', data: key })} className="fas fa-trash" title="Remove from favourite"></i> : ''}
                    <div className="pull-right">${stock.price}</div>
                </div>
            </li>
        )
    }

    return(
        <div className="col-sm-4 col-xs-12">
            <div className="panel panel-default">
               <div className="panel-heading">{data.label}</div>
               <ul className="list-group">{stocklist}</ul>
            </div>
        </div>
    )
};

function mapStateToProps(state) {
    return {state};
}

export default connect(mapStateToProps)(Stocklist);
