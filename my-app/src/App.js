import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import {Switch , Route, withRouter} from 'react-router-dom'
import Home from './components/Home'
import LabTech from './components/LabTech'
import Employee from './components/Employee'
import LabHome from './components/LabHome'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
    this.handleClick = this.handleClick.bind(this); //required to bind event to button
  }

  callAPI = async () => {     //callAPI is our function, async is telling it that this is an async task
    const res = await fetch('http://localhost:9000/testAPI');   //await means that the code will wait for the fetch's promise to complete
    const json = await res.json();                              //await means that we're waiting for the json to be finished parsing
    console.log(json);                                          //the json is an array of each sql query return
  }

  componentDidMount() {     //calls our API when the page first loads
    this.callAPI();
  }

  handleClick() {           //when we click our button it does the thing
    this.callAPI();
  }

  render() {
    return (
    //  <div className="App">
    //    <header className = "App-header">
    //      <img src={logo} className="App-logo" alt="logo" />
    //      <h1 className="App-title">Welcome to React</h1>
    //    </header>
         //sets to whatever testAPI.js gives it
    //  <p className="App-intro">{this.state.apiResponse}</p>
    //    </div>
    <div className="App">

          <Switch>
            <Route path="/labtech"  render={()=><LabTech/>}/>
            <Route path="/employee" render={()=><Employee/>}/>
            <Route path="/labhome"  render={()=><LabHome/>}/>
            <Route path="/"         render={()=><Home/>}/>
          </Switch>
          <button onClick={this.handleClick}> hi </button>
    </div>
    );
  }

}

export default App;
