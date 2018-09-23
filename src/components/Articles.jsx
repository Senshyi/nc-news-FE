import React, { Component } from 'react';
import ArticleCard from './ArticleCard';
import Votes from './Votes'
import Modal from 'react-modal';
import * as api from '../api';
import AddArticle from './AddArticle';
import Topics from './Topics';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import MediaQuery from 'react-responsive';

const customStyles = {
  content: {
    top: '10%',
    left: '15%',
    right: '15%',
    bottom: '5%'
  }
};

class Articles extends Component {
  state = {
    articles: [],
    modalIsOpen: false,
    selectedArticle: {},
    error: {}
  }
  render() {
    if(this.state.error.err) return <Redirect to={{
      pathname: '/error',
      state: this.state.error
    }} />
    else if(this.state.articles.length === 0) {
      return (
      <div className='loading-circle'>
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>)
    }
    else {
      return (
        <div className='articles'>
          
          <MediaQuery maxWidth={700}>
            {(matches) => {
              if (matches) {
                return <div className='mobile-view'>
                  <button onClick={() => this.openModal({})}>Add new Article</button>
                  <div className='topics-newArticle-div'>
                  <Topics />
                </div>
                </div>
                
              } else {
                return <div className='topics-newArticle-div'>
                          <Topics />
                          <button onClick={() => this.openModal({})}>Add new Article</button>
                       </div>
              }
            }}
          </MediaQuery>
            {this.state.articles.map((article, i) => {
            return <div className='single-article' key={i}>
              <div className='article-votes-card'>
                <Votes votes={article.votes} id={article._id} category={'articles'} updateVote={this.updateVote}/>
              </div>
              <div className='article-preview' onClick={() => this.openModal(article)}>
                <div className='article-preview-header'>
                  <h3>{article.title}</h3>
                  <span>{moment(article.created_at).format('LT ll')}</span>
                </div>
                <div className='article-preview-body'>
                  <p className='article-preview-body-topic'>Topic: {article.topic}</p>
                  <p>Author: {article.belongs_to}</p>
                </div>
                <div className='article-preview-body-comments'>
                  <p>{article.comments}<i className="fas fa-comment-alt"></i></p>
                </div>
                
              </div>
            </div>
            })}
          <Modal 
            isOpen={this.state.modalIsOpen}
            style={customStyles}
            shouldCloseOnOverlayClick={true}
            onRequestClose={this.closeModal}
          >
          {
            Object.keys(this.state.selectedArticle).length === 0 ?
              <AddArticle close={this.closeModal} topic={this.props.match.params.topic} loggedUser={this.props.loggedUser}  handlenewArticle={this.handleNewArticleRender}/> :
                <ArticleCard close={this.closeModal} article={this.state.selectedArticle} loggedUser={this.props.loggedUser} updateVote={this.updateVote}/>
          }
          </Modal>
        </div>
      );
    }
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  componentDidMount = () => {
    this.fetchArticles()
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps !== this.props) {
      this.fetchArticles()
    }
  }

  openModal = (article) => {
    this.setState({ 
      modalIsOpen: true,
      selectedArticle: article
    });
  }

  closeModal = () => {
    this.setState({ 
      modalIsOpen: false,
      selectedArticle: {}
    });
  }

  updateVote = (vote, id) => {
    const articles = this.state.articles.map(article => {
      if (article._id === id) article.votes = vote;
      return article
    })
    this.setState({
      articles
    })
  }

  handleNewArticleRender = (newArticle) => {
    this.setState({ articles: [newArticle, ...this.state.articles] })
  }

  fetchArticles = () => {
      const { topic } = this.props.match.params;
      if(topic) {
        api.fetchTopicArticles(topic)
          .then(({articles}) => {
            return this.setState({
              articles: articles.sort((a, b) => a.created_at < b.created_at ? 1 : -1)
            })
          })
          .catch(err => {
            this.setState({error: {err: true, errCode: err.status, errText: err.statusText}})
          })
      } else {
        api.fetchArticles()
          .then(({ articles }) => this.setState({ articles: articles.sort((a, b) => a.created_at < b.created_at ? 1 : -1) }))
          .catch(err => {
            this.setState({ error: { err: true, errCode: err.status, errText: err.statusText } })
          })
      }
  }
}

export default Articles;