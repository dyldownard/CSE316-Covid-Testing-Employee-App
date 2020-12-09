import React from "react";
import "./App.css";
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import LabTech from './components/LabTech'
import EmployeeLogin from './components/EmployeeLogin'
import EmployeeHome from './components/EmployeeHome'
import LabHome from './components/LabHome'
import TestCollection from './components/TestCollection'
import PoolMapping from './components/PoolMapping'
import WellTesting from './components/WellTesting'



export default function App() {

  return (
    <div className="App">
          <Switch>
            <Route path="/labtech"  render={()=><LabTech/>}/>
            <Route path="/employeelogin" render={()=><EmployeeLogin/>}/>
            <Route path="/emphome" render={()=><EmployeeHome/>}/>
            <Route path="/labhome"  render={()=><LabHome/>}/>
            <Route path="/testcol"  render={()=><TestCollection/>}/>
            <Route path="/poolmap"  render={()=><PoolMapping/>}/>
            <Route path="/welltest"  render={()=><WellTesting/>}/>
            <Route path="/"         render={()=><Home/>}/>
          </Switch>
    </div>
  );
}