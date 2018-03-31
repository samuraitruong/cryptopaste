import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import Home from './containers/home'
class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <img src={logo} className="app-header-logo app-logo-spin" alt="logo" />
          <h1 className="app-header-title">Text Crypto Paste</h1>
        </header>
        <div className="container app-main">
         <Home />
        </div>
      </div>
    );
  }
}

export default App;
