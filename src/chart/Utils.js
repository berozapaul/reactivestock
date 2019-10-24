

import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

function parseData(parse) {
    return function(d) {
        d.date = parse(d.date);
        d.open = +d.open;
        d.high = +d.high;
        d.low = +d.low;
        d.close = +d.close;
        d.volume = +d.volume;

        return d;
    };
}

const parseDate = timeParse("%Y-%m-%d");

export function getData(ticker) {
    let apiurl = 'https://financialmodelingprep.com/api/v3/historical-price-full/'+ticker+'?timeseries=10';
    // const promiseMSFT = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
    const promiseMSFT = fetch(apiurl)
        .then(response => response.text())
        .then(data => {
            let jsonData = JSON.parse(data);
            console.log(jsonData.historical);
            tsvParse(jsonData.historical, parseData(parseDate))
        });
    return promiseMSFT;
}
