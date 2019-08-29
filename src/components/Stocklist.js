import React from 'react';

/*
 * Purpose: The purpose of this component is to render list of stocks.
 *          This component does not have any state hence it is
 *          a functional component. React also encourages to have stateless
 *          components.
 * Version: 1.0
 * Author: dev@cefalo.com
 */
const Stocklist = ({stocks}) => {
    let stocklist = (stocks.length < 1) ? 'Stocks are not available yet.' : '';
    if(Array.isArray(stocks) && stocks.length > 0){
        stocklist = stocks.map((stock) =>
            <li className="list-group-item" key={stock.companyName}>
                {stock.companyName}&nbsp; (${stock.price})
            </li>
        )
    }

    return(
        <div className="panel panel-default active-stock">
        <div className="panel-heading">Active stock</div>
           <ul className="list-group"> {stocklist}</ul>
        </div>
    )
};

export default Stocklist;