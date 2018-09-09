import React, { Component } from 'react';
import * as api from '../api'

class Votes extends Component {
  state = {
    updateVote: 0,
  }
  render() {
    return (
      <div className='votes-component'>
        <i onClick={() => this.handleVote('up')} className="fas fa-angle-up"></i>
        <span>{this.props.category === 'articles' ? this.props.votes : this.props.votes + this.state.updateVote}</span>
        <i onClick={() => this.handleVote('down')} className="fas fa-angle-down"></i>
      </div>
    );
  }

  handleVote = (vote) => {
    api.updateVotes(this.props.category, this.props.id, vote)
    this.setState({
      updateVote: vote === 'up' ? 1 : -1 
    }, () => {
      if (this.props.category === 'articles' && this.props.updateVote) {
        console.log(this.props.votes + this.state.updateVote, '<<<<<<<<<')
        this.props.updateVote(this.props.votes + this.state.updateVote, this.props.id)
      }
    })
  }
}

export default Votes;