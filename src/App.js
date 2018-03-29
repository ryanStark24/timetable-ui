import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Homepage from './components/Homepage';
const App = () => (<Router>
  <Route exact path='/' component={Homepage}/>
</Router>);

export default App;
// <Route exact path='/dashboard' component={DashBoard}/>
