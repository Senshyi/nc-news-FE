import React, { Component } from 'react';
import * as api from '../api';
import { Link, Redirect } from 'react-router-dom'

class Topics extends Component {
  state = {
    topics: [],
    error: {}
  }
  render() {
    if (this.state.error.err) return <Redirect to={{
      pathname: '/error',
      state: this.state.error
    }} />
    return (
      <div className='topics'>
        <Link to='/'><span className='topic'>Home</span></Link>
        {this.state.topics.map((topic, i) => {
          return <Link key={i} to={`/t/${topic.slug}`}><span className='topic'>{topic.title}</span></Link>
        })}
      </div>
    );
  }

  componentDidMount() {
    api.fetchTopics()
      .then(({topics}) => this.setState({topics}))
      .catch(err => {
        this.setState({ error: { err: true, errCode: err.status, errText: err.statusText } })
      })
  }
}

export default Topics;