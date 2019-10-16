import React from 'react';
import { connect } from 'react-redux';
import Stocklist from "./Stocklist";

class Favorite extends React.Component {
    remove = () => {
        this.props.dispatch({ type: 'REMOVE', data: {slug: 'BL', price: 50} });
    };

    render() {
        return (
            <div>
                <Stocklist stocks={this.props.storeData} data="My favorite stock"/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    // console.log(state)
  return {
      storeData: state
  };
}

export default connect(mapStateToProps)(Favorite);
