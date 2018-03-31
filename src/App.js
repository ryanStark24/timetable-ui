import React from 'react';
import {BrowserRouter as Router, Route,Switch,Redirect} from 'react-router-dom'
import Homepage from './components/Homepage';
import DashBoard from './components/dashboard';
const App = () => (<Router basename={process.env.PUBLIC_URL} >
  <Switch>
    {console.log(sessionStorage.getItem('token'))}
    {sessionStorage.getItem('token')?  (<Route exact strict path="/dashboard" component={DashBoard}/>):(<Redirect from="/dashboard" to="/" />)}

  <Route exact strict  path="/" component={Homepage}/>

  </Switch>
</Router>);

export default App;
// <Route exact path='/dashboard' component={DashBoard}/>
