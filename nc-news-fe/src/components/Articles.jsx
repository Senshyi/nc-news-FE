import React, { Component } from 'react';
import ArticleCard from './ArticleCard';
import Votes from './Votes'
import Modal from 'react-modal';
import * as api from '../api';
import AddArticle from './AddArticle';

class Articles extends Component {
  state = {
    articles: [],
    modalIsOpen: false,
    selectedArticle: {},
  }
  render() {
    return (
      <div className='articles'>
        <div>
          <button onClick={() => this.openModal({})}>Add new Article</button>
        </div>
          {this.state.articles.map((article, i) => {
          return <div className='single-article' key={i}>
            <div className='article-votes-card'>
              <Votes votes={article.votes} id={article._id} category={'articles'} updateVote={this.updateVote}/>
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
        {
          Object.keys(this.state.selectedArticle).length === 0 ?
            <AddArticle close={this.closeModal} topic={this.props.match.params.topic} loggedUser={this.props.loggedUser}  handlenewArticle={this.handleNewArticleRender}/> :
              <ArticleCard close={this.closeModal} article={this.state.selectedArticle} loggedUser={this.props.loggedUser} updateVote={this.updateVote}/>
        }
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
    console.log(newArticle);
    this.setState({ articles: [...this.state.articles, newArticle] })
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