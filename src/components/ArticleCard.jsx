import React, { Component } from 'react';
import moment from 'moment';
import AddComment from './AddComment'
import Comments from './Comments';
import Votes from './Votes';
import * as api from '../api';


class ArticleCard extends Component {
  state = {
    comments: [],
    error: {}
  }
  render() {
    return (
      <div className='single-article-card'>
        <div className='single-article-votes'>
        <span className='single-article-close-span' onClick={this.props.close}>X</span>
          <Votes votes={this.props.article.votes} id={this.props.article._id} category={'articles'} updateVote={this.props.updateVote} />
        </div>
        <h2>{this.props.article.title}</h2>
        <p className='article-preview-body-topic'>Topic: {this.props.article.topic}</p>
        <p className='single-article-card-author'>Author: {this.props.article.belongs_to}</p>
        <span className='single-article-card-timestamp'>{moment(this.props.article.created_at).format('LT ll')}</span>
        <p className='single-article-card-body'>{this.props.article.body}</p>
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
        this.setState({ error: { err: true, errCode: err.status, errText: err.statusText } })
      })
  }
}

export default ArticleCard;