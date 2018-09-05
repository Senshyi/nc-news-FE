import React, { Component } from 'react';

class Articles extends Component {
  state = {
    articles: []
  }
  render() {
    return (
      <div className='articles'>
          {this.state.articles.map((article, i) => {
            console.log(article)
            return <div className='single-article' key={i}>
              <div className='article-votes'>
                <span>{article.votes}</span>
              </div>
              <div className='article-preview'>
                <h3>{article.title}</h3>
                <p>{article.belongs_to}</p>
                <p>{article.topic}</p>
                <p>{article.comments}</p>
              </div>
            </div>
          })}
      </div>
    );
  }

  componentDidMount = () => {
    console.log(this.props.match)
    fetch('https://jan-nc-news.herokuapp.com/api/articles')
      .then(res => res.json())
      .then(({articles}) => this.setState({articles}))
  }
}

export default Articles;