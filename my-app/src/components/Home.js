import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {

 render() {
  return (
          <div>
            <Link to="/labtech">
              <button>LabTech Login</button>
            </Link>
            <br/>
            <Link to="/employee">
              <button>Employee Login</button>
            </Link>
          </div>
    );
  }

}

export default Home;
