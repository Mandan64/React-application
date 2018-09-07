import React, { Component } from 'react';
import Usurvey from './Components/Usurvey';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        <Usurvey />
        </p>
      </div>
    );
  }
}

export default App;
