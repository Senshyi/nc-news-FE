import React, { Component } from 'react';

class Articles extends Component {
  state = {
    articles: []
  }
  render() {
    return (
      <div>
          {this.state.articles.map(article => {
            return <div>{article.title}</div>
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