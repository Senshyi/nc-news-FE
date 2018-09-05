import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Articles from './components/Articles';
import {Route, Switch} from 'react-router-dom'

class App extends Component {
  state = {
    loggedUser: ''
  }
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Articles}/>
          <Route path='/topics/:topic' render={({match}) => <Articles match={match}/>} />
        </Switch>
        
      </div>
    );
  }
}

export default App;
