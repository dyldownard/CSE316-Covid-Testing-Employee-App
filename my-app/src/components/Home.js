import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {

  render() {
    return (
      <div>
            <br/>
            <br/>
            <Link to="/labtech">
              <button>LabTech Login</button>
            </Link>
            <br/>
            <br/>
            <br/>
            <Link to="/employee">
              <button>Employee Login</button>
            </Link>
          </div>
    );
  }

}

export default Home;