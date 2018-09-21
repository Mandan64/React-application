import React, { Component } from 'react';

import './App.css';
import Loginpage from './Components/Loginpage'

class App extends Component {
  render() {
    let logo =<img src={logo} />;
    return (
      <div className="App">
      <Loginpage logo={logo}/>

      </div>
    );
  }
}

export default App;
