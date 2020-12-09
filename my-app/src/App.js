import React, { useState } from "react";
import "./App.css";
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import LabTech from './components/LabTech'
import Employee from './components/Employee'
import LabHome from './components/LabHome'
import TestCollection from './components/TestCollection'
import PoolMapping from './components/PoolMapping'
import WellTesting from './components/WellTesting'



export default function App() {

  return (
    <div className="App">
          <Switch>
            <Route path="/labtech"  render={()=><LabTech/>}/>
            <Route path="/employee" render={()=><Employee/>}/>
            <Route path="/labhome"  render={()=><LabHome/>}/>
            <Route path="/testcol"  render={()=><TestCollection/>}/>
            <Route path="/poolmap"  render={()=><PoolMapping/>}/>
            <Route path="/welltest"  render={()=><WellTesting/>}/>
            <Route path="/"         render={()=><Home/>}/>
          </Switch>
    </div>
  );
}