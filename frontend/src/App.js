import React, { Component } from 'react';
import './App.css';
import Clock from './clock.js';

class App extends Component {
  render() {
    return (
      <div class="mdl-grid">
        <div className="mdl-layout-spacer"></div>
        <Clock />
        <div className="mdl-layout-spacer"></div>
      </div>
    );
  }
}

export default App;
