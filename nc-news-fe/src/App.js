import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Articles from './components/Articles';
import {Route} from 'react-router-dom';
import Topics from './components/Topics';
import * as api from './api'

class App extends Component {
  state = {
    loggedUser: {}
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

  componentDidMount() {
    api.fetchUser('jessjelly')
      .then(({user}) => this.setState({loggedUser: user}))
  }
}

export default App;
