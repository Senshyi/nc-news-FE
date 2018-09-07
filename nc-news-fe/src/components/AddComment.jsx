import React, { Component } from 'react';
import * as api from '../api'

class AddComment extends Component {
  state = {
    newComment: '',
    error: {}
  }
  render() {
    return (
      <div>
        <input type="text" value={this.state.newComment} onChange={this.handleInputChange} placeholder='Enter comment...'/>
        <button type='button' onClick={this.handleSubmit}>Send Comment</button>
      </div>
    );
  }

  handleInputChange = (e) => {
    e.preventDefault();

    this.setState({
      newComment: e.target.value
    })
  }

  handleSubmit = () => {
    api.addComment(this.props.articleId, this.props.user._id, this.state.newComment)
      .then(({ comment }) => this.props.renderNewComment(comment))
      .catch(err => {
        console.log(err)
        this.setState({ error: { err: true, errCode: err.status, errText: err.statusText }})
      })
  }
}

export default AddComment;