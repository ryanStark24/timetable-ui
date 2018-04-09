import React from 'react';
import {BrowserRouter as Router,Switch} from 'react-router-dom'
import Homepage from './components/Homepage';
import MainComp from './components/masterComponent';
import AuthCheck from './components/AuthCheck';
import IsLoggedIn from './components/IsLoggedIn';
const App = () => (<Router basename={process.env.PUBLIC_URL} >
  <Switch>
  <AuthCheck path="/dashboard" component={MainComp}/>
  <IsLoggedIn path ='/' component={Homepage}/>

  </Switch>
</Router>);

export default App;
