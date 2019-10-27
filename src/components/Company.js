import React, {Fragment} from 'react';
import Chart from '../chart/Chart';
import { getData } from "../chart/ChartUtils";
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
            this.setState({ chartData: data.chartData, company: data.companyData});
        });
    }
    render() {
        if (this.state == null) {
            return <div>Loading...</div>
        }

        return (
            <Fragment>
                {this.state.company.companyName !== undefined ?
                <div className="row top-offset company-info">
                   <div className="col-sm-3">
                       <img src={this.state.company.image} width="200"/>
                   </div>
                    <div className="col-sm-9">
                        <h1>{this.state.company.companyName}</h1>
                        <div>{this.state.company.description}</div>
                        <h4>Price: ${this.state.company.price}</h4>
                        <h4>Changes: {this.state.company.changesPercentage}</h4>
                    </div>
                </div> : ''}
                <div className="row top-offset">
                {this.state.chartData.length > 0 ? <TypeChooser>{type => <Chart type={type} data={this.state.chartData} />}</TypeChooser> : ''}
                </div>
            </Fragment>
        )
    }
}

export default Company;
