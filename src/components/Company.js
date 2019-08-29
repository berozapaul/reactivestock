import React from 'react';

/*
 * Purpose: The purpose of this component is to render a company profile.
 *          This component does not have any state hence it is
 *          a functional component. React also encourages to have stateless
 *          components.
 * Version: 1.0
 * Author: dev@cefalo.com
 */
function Company() {
    const [firstName, setFirstName] = React.useState(null);
    const [lastName, setLastName] = React.useState(null);

    React.useEffect(() => {
        fetch('https://randomuser.me/api/')
            .then(results => results.json())
            .then(data => {
                const {name} = data.results[0];
                setFirstName(name.first);
                setLastName(name.last);
            });
    }, []); // <-- Have to pass in [] here!

    return (
        <div>
            Name: {!firstName || !lastName ? 'Loading...' : `${firstName} ${lastName}`}
        </div>
    );
}

export default Company;