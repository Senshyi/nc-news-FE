import React, { Component } from 'react';
import * as api from '../api'
import Votes from './Votes';

class Comments extends Component {
  state = {
    comments: []
  }
  render() {
    return (
      <div>
        {this.state.comments.map((comment, i) => {
          return <div className='single-comment' ref='commentsStart' key={i}>
            <div className='comment-votes'>
              <Votes votes={comment.votes} id={comment._id} category={'comments'}/>
            </div>
            <div>
              <p>{comment.created_by.username}</p>
              <p>timestamp</p>
              <p>{comment.body}</p>
              <span>delete</span>
            </div>
          </div>
        })}
      </div>
    );
  }

  componentDidMount() {
    api.fetchComments(this.props.articleId)
      .then(({comments}) => this.setState({comments}))
  }
}

export default Comments;