import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Homepage from './components/Homepage';
const App = () => (<Router basename={process.env.PUBLIC_URL} >
  <Route exact url="/"component={Homepage}/>
</Router>);

export default App;
// <Route exact path='/dashboard' component={DashBoard}/>
