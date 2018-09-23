import React, { Component } from 'react';
import * as api from '../api'

class Votes extends Component {
  state = {
    updateVote: this.props.votes,
    disableUp: false,
    disableDown: false
  }
  render() {
    return (
      <div className='votes-component'>
        <i onClick={() => this.handleVote('up')} disabled={this.state.disableUp} className="fas fa-angle-up"></i>
        <span>{this.state.updateVote}</span>
        <i  onClick={() => this.handleVote('down')} disabled={this.state.disableDown} className="fas fa-angle-down"></i>
      </div>
    );
  }

  //temporary logic
  // need refactor
  handleVote = (vote) => {
    if (vote === 'up' && this.state.disableUp === false && this.state.disableDown === false ) {
      api.updateVotes(this.props.category, this.props.id, vote)
      this.setState({
        updateVote: this.state.updateVote + 1,
        disableUp: true,
        disableDown: false
      }, () => {
        if (this.props.category === 'articles' && this.props.updateVote) {
          this.props.updateVote(this.state.updateVote, this.props.id)
        }
      })
    } else if (vote === 'up' && this.state.disableDown === true) {
      api.updateVotes(this.props.category, this.props.id, vote, true)
      this.setState({
        updateVote: this.state.updateVote + 2,
        disableUp: true,
        disableDown: false
      }, () => {
        if (this.props.category === 'articles' && this.props.updateVote) {
          this.props.updateVote(this.state.updateVote, this.props.id)
        }
      })
    } else if (vote === 'down' && this.state.disableUp === true) {
      api.updateVotes(this.props.category, this.props.id, vote, true)
      this.setState({
        updateVote: this.state.updateVote - 2,
        disableUp: false,
        disableDown: true,
      }, () => {
        if (this.props.category === 'articles' && this.props.updateVote) {
          this.props.updateVote(this.props.votes + this.state.updateVote, this.props.id)
        }
      })
    } else if (vote === 'down' && this.state.disableDown === false) {
      api.updateVotes(this.props.category, this.props.id, vote)
      this.setState({
        updateVote: this.state.updateVote - 1,
        disableUp: false,
        disableDown: true,
      }, () => {
        if (this.props.category === 'articles' && this.props.updateVote) {
          this.props.updateVote(this.props.votes + this.state.updateVote, this.props.id)
        }
      })
    } 
  }
}

export default Votes;