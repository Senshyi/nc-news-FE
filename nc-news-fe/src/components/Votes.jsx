import React, { Component } from 'react';
import * as api from '../api'

class Votes extends Component {
  state = {
    updateVote: 0,
  }
  render() {
    return (
      <div className='votes-component'>
        <button onClick={() => this.handleVote('up')}>up</button>
        <span>{this.props.votes}</span>
        <button onClick={() => this.handleVote('down')}>down</button>
      </div>
    );
  }

  handleVote = (vote) => {
    api.updateVotes(this.props.category, this.props.id, vote)
      .then(_ => {
          this.setState({
          updateVote: vote === 'up' ? 1 : -1 
        }, () => {
          if (this.props.category === 'articles' && this.props.updateVote) {
            console.log(this.props.votes + this.state.updateVote, '<<<<<<<<<')
            this.props.updateVote(this.props.votes + this.state.updateVote, this.props.id)
          }
        }) 
      })
  }
}

export default Votes;