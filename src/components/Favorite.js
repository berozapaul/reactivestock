import React from 'react';
import { connect } from 'react-redux';
import Stocklist from "./Stocklist";

class Favorite extends React.Component {

    render() {
        return (
            <div>
                <Stocklist stocks={this.props.storeData} data={this.props.data}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
  return {
      storeData: state
  };
}

export default connect(mapStateToProps)(Favorite);
