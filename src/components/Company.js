import React from 'react';
// const queryString = require('query-string');

/*
 * Purpose: The purpose of this component is to render a company profile.
 *          This component does not have any state hence it is
 *          a functional component. React also encourages to have stateless
 *          components.
 * Version: 1.0
 * Author: dev@cefalo.com
 */
function Company(props) {
    const [companyName, setCompanyName] = React.useState(null);
    const [description, setDescription] = React.useState(null);

    React.useEffect(() => {
        let companySlug = props.match.params.slug;
        let ticker = companySlug.split('-').pop();

        fetch('https://financialmodelingprep.com/api/v3/company/profile/' + ticker)
            .then(results => results.json())
            .then(data => {
                setCompanyName(data.profile.companyName);
                setDescription(data.profile.description);
            });
    }, []); // <-- Have to pass in [] here!

    return (
        <div>
            Name: {companyName}
            <div>
            Description: {description}
            </div>
        </div>
    );
}

export default Company;