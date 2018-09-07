import React, { Component } from 'react';
import * as api from '../api';
import { Link } from 'react-router-dom'

class Topics extends Component {
  state = {
    topics: []
  }
  render() {
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
  }
}

export default Topics;