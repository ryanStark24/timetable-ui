import React from 'react';
import {BrowserRouter as Router,Switch} from 'react-router-dom'
import Homepage from './components/Homepage';
import DashBoard from './components/dashboard';
import AuthCheck from './components/AuthCheck';
import IsLoggedIn from './components/IsLoggedIn';
const App = () => (<Router basename={process.env.PUBLIC_URL} >
  <Switch>
  <AuthCheck path="/dashboard" component={DashBoard}/>
  <IsLoggedIn path ='/' component={Homepage}/>

  </Switch>
</Router>);

export default App;
