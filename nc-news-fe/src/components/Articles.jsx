import React, { Component } from 'react';
import ArticleCard from './ArticleCard';
import Votes from './Votes'
import Modal from 'react-modal';
import * as api from '../api';

class Articles extends Component {
  state = {
    articles: [],
    modalIsOpen: false,
    selectedArticle: {}
  }
  render() {
    return (
      <div className='articles'>
          {this.state.articles.map((article, i) => {
          return <div className='single-article' key={i}>
            <div className='article-votes-card'>
              <Votes votes={article.votes} id={article._id} category={'articles'}/>
            </div>
            <div className='article-preview' onClick={() => this.openModal(article)}>
              <h3>{article.title}</h3>
              <p>{article.belongs_to}</p>
              <p>{article.topic}</p>
              <p onClick={this.handleCommentClick}>{article.comments}</p>
            </div>
          </div>
          })}
        <Modal isOpen={this.state.modalIsOpen} >
          <ArticleCard close={this.closeModal} article={this.state.selectedArticle} loggedUser={this.props.loggedUser}/>
        </Modal>
      </div>
    );
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  componentDidMount = () => {
    this.handleFetchArticles()
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps !== this.props) {
      this.handleFetchArticles()
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

  handleCommentClick = () => {
    
  }

  handleFetchArticles = () => {
      const { topic } = this.props.match.params;
      if(topic) {
        api.fetchTopicArticles(topic)
          .then(({ articles }) => this.setState({ articles }))
      } else {
        api.fetchArticles()
          .then(({ articles }) => this.setState({ articles }))
      }
  }
}

export default Articles;