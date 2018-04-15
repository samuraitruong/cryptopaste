import React, { Component } from 'react';

import { Route , Switch} from 'react-router-dom'
import './App.scss';
import Moment from 'moment'
import Home from './containers/home'
import AppHeader from './components/app-header'
import StatisticWidget from './containers/statistic-widget'
import FAQ from './containers/faq'

const ViewTicket = ({match}) => <Home ticketId={match.params.ticketid}/>

class App extends Component {
  
  render() {
    return (
      <div className="app">
        <AppHeader></AppHeader>
        
        <div className="container app-main">
          <div className="row">
              <div className="col-md-12 text-left">
                <Switch>
                  <Route exact path="/faq" component={FAQ}/>
                  <Route exact path="/:ticketid" component={ViewTicket}/>
                  <Route path="/" component={Home}/>
                </Switch>
            </div>
         </div>
        </div>
        <footer className="footer">
          <div className="container">
            <div className="float-left">
              ©Copyright 2018 - <StatisticWidget />   <br/>
            
              <span className="font-weight-light last-update">Last update at: {Moment(process.env.buildTime).format()} </span>


            </div>
            <div className="float-right">
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/samuraitruong/cryptopaste" title="Go to Github">
              <img src="https://git-scm.com/images/logos/downloads/Git-Logo-1788C.png" className="github-icon" alt="Go to github"/>
            </a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
