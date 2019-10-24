import React from 'react';
import Chart from '../chart/Chart';
import { getData } from "../chart/Utils";
import { TypeChooser } from "react-stockcharts/lib/helper";

/*
 * Purpose: The purpose of this component is to render a company profile.
 *          This component does not have any state hence it is
 *          a functional component. React also encourages to have stateless
 *          components.
 * Version: 1.0
 * Author: dev@cefalo.com
 */

class Company extends React.Component {
    componentDidMount() {
        let companySlug = this.props.match.params.slug;
        let ticker = companySlug.split('-').pop();

        getData(ticker).then(data => {
            this.setState({ data })
        })
    }
    render() {


        if (this.state == null) {
            return <div>Loading...</div>
        }

        return (
            <TypeChooser>
                {type => <Chart type={type} data={this.state.data} />}
            </TypeChooser>
        )
    }
}

export default Company;

// function Company(props) {
//     const [companyName, setCompanyName] = React.useState(null);
//     const [description, setDescription] = React.useState(null);
//     const [chartData, setChartData] = React.useState(null);
//
//     React.useEffect(() => {
//         let companySlug = props.match.params.slug;
//         let ticker = companySlug.split('-').pop();
//
//         fetch('https://financialmodelingprep.com/api/v3/company/profile/' + ticker)
//             .then(results => results.json())
//             .then(data => {
//                 setCompanyName(data.profile.companyName);
//                 setDescription(data.profile.description);
//             });
//
//         getData().then(data => {
//             console.log(data);
//             // setChartData(data);
//         })
//     }, []); // <-- Have to pass in [] here!
//
//     return (
//         <div>
//             <div>{(companyName ) ? 'Name: '+ companyName : ''}</div>
//             <div>{(description ) ? 'Description: '+ description : ''}</div>
//
//             <TypeChooser>
//                 {type => <Chart type={type} data={chartData} />}
//             </TypeChooser>
//         </div>
//     );
// }
