import React, { Component } from 'react';
import * as api from '../api'

class AddArticle extends Component {
  state = {
    newArticle: {
      body: '',
      title: '',
      topic: this.props.topic
    }
  }

  render() {
    return (
      <div>
        <span onClick={this.props.close}>X</span>
        <div>
          <h3>New Article</h3>
          <div>
            <label>title</label>
            <input onChange={this.handleTitle} value={this.state.newArticle.title} type="text" />
            <select onChange={this.handleTopicChange} value={this.state.newArticle.topic}>
              <option value="">Select Topic</option>
              <option value="coding">Coding</option>
              <option value="football">Football</option>
              <option value="cooking">Cooking</option>
            </select>
            <label>newArticle</label>
            <input onChange={this.handleArticle} value={this.state.newArticle.body} type="text" />
            <button onClick={this.handleSubmit}>Post Article</button>
          </div>
        </div>
      </div>
    );
  }
  
  handleSubmit = () => {
    api.addArticle(this.state.newArticle, this.props.loggedUser._id)
      .then(({ article }) => {
        console.log(article)
        this.props.handlenewArticle(article)
      })
  }

  handleArticle = (e) => {
    this.setState({
      newArticle: {
        ...this.state.newArticle,
        body: e.target.value
      }
    })
  }

  handleTitle = (e) => {
    this.setState({
      newArticle: {
        ...this.state.newArticle,
        title: e.target.value
      }
    })
  }

  handleTopicChange = (e) => {

    this.setState({
      newArticle: {
        ...this.state.newArticle, 
        topic: e.target.value
      }
    })
  }
}

export default AddArticle;