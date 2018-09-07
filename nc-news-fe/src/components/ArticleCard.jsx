import React, { Component } from 'react';
import AddComment from './AddComment'
import Comments from './Comments';
import Votes from './Votes';
import * as api from '../api'


class ArticleCard extends Component {
  state = {
    comments: [],
    error: {}
  }
  render() {
    return (
      <div>
        <span onClick={this.props.close}>X</span>
        <div className='signle-article-votes'>
          <Votes votes={this.props.article.votes} id={this.props.article._id} category={'articles'} updateVote={this.props.updateVote} />
        </div>
        <h1>{this.props.article.title}</h1>
        <p>{this.props.article.topic}</p>
        <p>{this.props.article.belongs_to}</p>
        <p>{this.props.article.body}</p>
        <AddComment user={this.props.loggedUser} articleId={this.props.article._id} renderNewComment={this.handleNewComment}/>
        <h3>Comments:</h3>
        <Comments comments={this.state.comments} user={this.props.loggedUser} removeComment={this.handleCommentDelete}/>
      </div>
    );
  }

  componentDidMount() {
    api.fetchComments(this.props.article._id)
      .then(({comments}) => {
        this.setState({ comments })
      })
      .catch(err => {
        console.log(err)
        this.setState({ error: { err: true, errCode: err.status, errText: err.statusText } })
      })
  }

  handleNewComment = (newComment) => {
    this.setState({comments: [...this.state.comments, newComment] })
  }

  handleCommentDelete = (id) => {
    api.deleteComment(id)
      .then(({comment}) => {
        const newComments =  this.state.comments.filter(oldComment => {
          return oldComment._id !== comment._id
        })
        this.setState({comments: newComments})
      })
      .catch(err => {
        console.log(err)
        this.setState({ error: { err: true, errCode: err.status, errText: err.statusText } })
      })
  }
}

export default ArticleCard;