import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './views/Home';
import Login from './views/Login';

const App = () => (
  <div className="root">
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/accounts/login' component={Login}/>
      {/* <Route path='/schedule' component={Schedule}/> */}
    </Switch>
  </div>
)

export default App;
