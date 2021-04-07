// eslint-disable-next-line
//import React, { useEffect } from 'react';
import React, { Component } from 'react';
// eslint-disable-next-line
import logo from './images/greyLogoCropped.png';
import './App.css';
import Home from './pages/Home'
import About from './pages/About'
import Help from './pages/Help'
import Features from './pages/Features'
import LandingPage from './pages/LandingPage'
// eslint-disable-next-line
import {Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Graphs from './pages/Graphs';
import Watchlist from './components/Watchlist';
import Education from './pages/Education';
//import OverviewData from './data/overviewData';

class App extends Component {
  render() {
    return (
      <div className="App">
      <div className="Nav-bar">
        <NavBar />
      </div>
      <div className="Content">
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/features" component={Features} />
          <Route exact path="/help" component={Help} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/graphs" component={Graphs} />
          <Route exact path="/watchlist" component={Watchlist} />
          <Route exact path="/education" component={Education} />
          {/* <Route exact path="/overview" component={OverviewData} /> */}

          </div>
        </div>
    );
  }
}

export default App;
