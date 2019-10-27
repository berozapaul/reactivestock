import React from 'react';
import {getUniqueKey} from "../utils/Utils";

function Majorindex({stocks}){
    let stocklist = (stocks.length < 1) ? 'Stocks are not available yet.' : '';
    if(Array.isArray(stocks) && stocks.length > 0){
        stocks = [...stocks, ...stocks, ...stocks];
        stocklist = stocks.map((stock) =>
            <span className={stock.changes > 0 ? "green" :  "red"} key={getUniqueKey()}>
                {stock.indexName} ${stock.price} &nbsp;
                {stock.changes > 0 ? <i className="fa fa-arrow-up"></i> :  <i className="fa fa-arrow-down"></i>}
            </span>
        )
    }
    return (
        <div className="header-container">
            <div className="stock-container">
                <div className="mqcontainer">
                    <div className="sitemessage indexitem">
                        {stocklist}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Majorindex;
