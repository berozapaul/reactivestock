import React from 'react';
import {strToSlug} from './../utils/Utils';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

/*
 * Purpose: The purpose of this component is to render list of stocks.
 * Version: 1.0
 * Author: dev@cefalo.com
 */
const Stocklist = ({stocks, data, dispatch}) => {
    let apiUrl = 'https://financialmodelingprep.com';
    let stocklist = (stocks.length < 1) ? 'Stocks are not available yet.' : '';

    if(Array.isArray(stocks) && stocks.length > 0){
        stocklist = stocks.map((stock) =>
            <li className="list-group-item" key={stock.ticker}>
                <div className="flexgrid clearfix item-container">
                    <div className="pull-left each-item" >
                        <img width="30" src={`${apiUrl}/stocks/${stock.ticker.toLowerCase()}.png`}/>
                        <NavLink exact to={`/company/${strToSlug(stock.companyName)}-${stock.ticker}`}>{stock.companyName}</NavLink>
                    </div>
                    <i onClick={() => dispatch({ type: 'ADD', data: stock })} className="fas fa-thumbs-up" title="Add to favourite"></i>
                    <div className="pull-right">${stock.price}</div>
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

// export default Stocklist;
function mapStateToProps(state) {
    return {state};
}

export default connect(mapStateToProps)(Stocklist);