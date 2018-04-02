import React, { Component } from 'react';
import { Route , Switch} from 'react-router-dom'
import logo from './logo.svg';
import './App.scss';
import Home from './containers/home'

const ViewTicket = ({match}) => <Home ticketId={match.params.ticketid}/>

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <img src={logo} className="app-header-logo app-logo-spin" alt="logo" />
          <h1 className="app-header-title">Text Crypto Paste</h1>
        </header>
        <div className="container app-main">
          <div className="row mt-5">
              <div className="col-md-12 text-left">
                <Switch>
                  <Route exact path="/:ticketid" component={ViewTicket}/>
                  <Route path="/" component={Home}/>
                </Switch>
            </div>
         </div>
        </div>
        <footer className="footer">
          <div className="container">
            Copyright@2018 by samuraitruong@hotmail.com
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
