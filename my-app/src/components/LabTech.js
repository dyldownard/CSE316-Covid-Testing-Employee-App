import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

class LabTech extends Component {
  constructor(props) {
    super(props);
    this.state = {labID: '',
                  pass: ''};
    this.IDhandleChange = this.IDhandleChange.bind(this);
    this.IDhandleSubmit = this.IDhandleSubmit.bind(this);
    this.PasshandleChange = this.PasshandleChange.bind(this);
    this.PasshandleSubmit = this.PasshandleSubmit.bind(this);
  }

  IDhandleChange(event) {
    this.setState({labID: event.target.value});
  }

  IDhandleSubmit(event) {
    alert('A name was submitted: ' + this.state.labID);
    event.preventDefault();
  }

  PasshandleChange(event) {
    this.setState({pass: event.target.value});
  }

  PasshandleSubmit(event) {
    alert('A name was submitted: ' + this.state.pass);
    event.preventDefault();
  }

 render() {
  return (
          <div>
            <h1> LabTech Login </h1>
            <br/>
            <p style={{display: "inline-block"}}> Lab ID: </p>
            <input type="text" onChange={this.IDhandleChange}/>
            <br/>
            <p style={{display: "inline-block"}}> Password: </p>
            <input type="password" onChange={this.PasshandleChange}/>
            <br/>
            <Link to={{pathname: '/labhome', labIDProp:{labID: this.state.labID}, passProp:{pass: this.state.pass}}}>
              <button>Login</button>
            </Link>
          </div>
    );
  }
}

export default withRouter(LabTech);
