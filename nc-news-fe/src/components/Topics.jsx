import React, { Component } from 'react';
import * as api from '../api';
import { Link } from 'react-router-dom'

class Topics extends Component {
  state = {
    topics: []
  }
  render() {
    return (
      <div>
        <Link to='/'>Home</Link>
        {this.state.topics.map((topic, i) => {
          return <Link key={i} to={`/topics/${topic.slug}`}>{topic.title}</Link>
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