import { isEmptyObject } from "../utils/Utils";

export function getData(ticker) {

    let urls = ['https://financialmodelingprep.com/api/v3/historical-price-full/'+ticker+'?timeseries=10',
    'https://financialmodelingprep.com/api/v3/company/profile/'+ticker];

    return Promise.all(urls.map(url => fetch(url).then(resp => resp.json())))
        .then(jsondata => {
            let chartData = [], companyData = {};
            if(!isEmptyObject(jsondata[0])){
                chartData = jsondata[0].historical;
                chartData.forEach( item => item.date = new Date(item.date));
            }
            if(!isEmptyObject(jsondata[1])){
                companyData = jsondata[1].profile;
            }
        return {chartData, companyData};
    });
}
