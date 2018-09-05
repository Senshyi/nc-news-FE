import React, { Component } from 'react';
import * as api from '../api'

class AddComment extends Component {
  state = {
    newComment: '',
    user: {}
  }
  render() {
    return (
      <div>
        <input type="text" value={this.state.newComment} onChange={this.handleInputChange} placeholder='Enter comment...'/>
        <button type='button' onClick={this.handleSubmit}>Send Comment</button>
      </div>
    );
  }

  componentDidMount() {
    api.fetchUser(this.props.user)
      .then(({ user }) => this.setState({user}))
  }

  handleInputChange = (e) => {
    e.preventDefault();

    this.setState({
      newComment: e.target.value
    })
  }

  handleSubmit = () => {
    console.log(this.state.user._id)
    api.addComment(this.props.articleId, this.state.user._id, this.state.newComment)
  }
}

export default AddComment;