import React, { Component } from 'react';

class Employee extends Component {
  render() {
    return (<div>
      <h1>
        Employee Login
      </h1>
      <br/>
      <p style={{display: "inline-block"}}>
        Email:
      </p>
      <input type="text"/>
      <br/>
      <p style={{display: "inline-block"}}>
        Password:
      </p>
      <input type="password"/>
      <br/>
      <button>Login</button>
    </div>);
  }
}

export default Employee;