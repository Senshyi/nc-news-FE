import React from 'react';
import * as api from '../api'

const Votes = ({votes, id, category}) => {
  return (
    <div className='votes-component'>
      <button onClick={() => api.updateVotes(category, id, 'up')}>up</button>
      <span>{votes}</span> 
      <button onClick={() => api.updateVotes(category, id, 'down')}>down</button>
    </div>
  );
};

export default Votes;