import React, {Fragment} from 'react';

function Majorindex({stocks}){
    let stocklist = (stocks.length < 1) ? 'Stocks are not available yet.' : '';
    if(Array.isArray(stocks) && stocks.length > 0){
        stocklist = stocks.map((stock) =>
            <span className={stock.changes > 0 ? "green" :  "red"}>
                {stock.indexName} ${stock.price} &nbsp;
                {stock.changes > 0 ? <i className="fa fa-arrow-up"></i> :  <i className="fa fa-arrow-down"></i>}
            </span>
        )
    }
    return (
        <Fragment>
            <h4>Major indexes</h4>
            <div className="mqcontainer">
                <div className="sitemessage indexitem">
                    {stocklist}
                </div>
            </div>
        </Fragment>
    );
}
export default Majorindex;
