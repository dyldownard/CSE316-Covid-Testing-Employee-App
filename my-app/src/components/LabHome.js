import React, { Component } from 'react';
import {Link, withRouter} from "react-router-dom";

class LabHome extends Component {

    render() {
      console.log(this.props.location.passProp)
      return (
        <div>
        <Link to="/labtech">
          <button>Back</button>
        </Link>
        </div>
      );
    }
}

export default withRouter(LabHome);
