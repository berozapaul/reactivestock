import React from 'react';
import {strToSlug} from './../utils/Utils';
import {NavLink} from "react-router-dom";

/*
 * Purpose: The purpose of this component is to render list of stocks.
 *          This component does not have any state hence it is
 *          a functional component. React also encourages to have stateless
 *          components.
 * Version: 1.0
 * Author: dev@cefalo.com
 */
const Stocklist = ({stocks, data}) => {
    let stocklist = (stocks.length < 1) ? 'Stocks are not available yet.' : '';
    if(Array.isArray(stocks) && stocks.length > 0){
        stocklist = stocks.map((stock) =>
            <li className="list-group-item" key={stock.companyName}>
                <div className="flexgrid">
                    <div className="pull-left">
                        <NavLink exact to={`/company/${strToSlug(stock.companyName)}-${stock.ticker}`}>{stock.companyName}</NavLink></div>
                    <div>(${stock.price})</div>
                </div>
            </li>
        )
    }

    return(
        <div className="panel panel-default active-stock pull-left">
        <div className="panel-heading">{data}</div>
           <ul className="list-group">{stocklist}</ul>
        </div>
    )
};

export default Stocklist;