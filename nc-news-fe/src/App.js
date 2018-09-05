import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Articles from './components/Articles';
import {Route} from 'react-router-dom';
import Topics from './components/Topics';

class App extends Component {
  state = {
    loggedUser: 'jessjelly'
  }
  render() {
    return (
      <div className="App">
        <Navbar />
        <Topics />
        <Route path='/topics/:topic' render={({ match }) => <Articles match={match} loggedUser={this.state.loggedUser} />} />
        <Route exact path='/' render={({match}) => <Articles match={match} loggedUser={this.state.loggedUser} />} />
      </div>
    );
  }
}

export default App;
