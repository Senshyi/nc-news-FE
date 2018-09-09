import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Articles from './components/Articles';
import {Route} from 'react-router-dom';
import * as api from './api'
import ErrorHandler from './components/ErrorHandler';

class App extends Component {
  state = {
    loggedUser: {}
  }
  render() {
    return (
      <div className="App">
        <Navbar />
        <Route path='/t/:topic' render={({ match }) => <Articles match={match} loggedUser={this.state.loggedUser} />} />
        <Route exact path='/' render={({match}) => <Articles match={match} loggedUser={this.state.loggedUser} />} />
        <Route path='/error' component={ErrorHandler} />
      </div>
    );
  }

  componentDidMount() {
    api.fetchUser('jessjelly')
      .then(({user}) => this.setState({loggedUser: user}))
  }
}

export default App;
