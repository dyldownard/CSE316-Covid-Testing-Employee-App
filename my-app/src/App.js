import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import {Switch, Route, withRouter} from 'react-router-dom'
import Home from './components/Home'
import LabTech from './components/LabTech'
import Employee from './components/Employee'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse : res}))
      .catch(err => err);
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
    //  <div className="App">
    //    <header className = "App-header">
    //      <img src={logo} className="App-logo" alt="logo" />
    //      <h1 className="App-title">Welcome to React</h1>
    //    </header>
    //    <p className="App-intro">{this.state.apiResponse}</p>       //sets to whatever testAPI.js gives it
    //    </div>
    <div className="App">
          <Switch>
            <Route path="/labtech"  render={()=><LabTech/>}/>
            <Route path="/employee" render={()=><Employee/>}/>
            <Route path="/"         render={()=><Home/>}/>
          </Switch>
    </div>
    );
  }
}

export default App;
