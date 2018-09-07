import React from 'react';
import Votes from './Votes';
import * as api from '../api'

const Comments = ({comments, user}) => {
  return (
    <div>
      {comments.map((comment, i) => {
        return <div className='single-comment' key={i}>
          <div className='comment-votes'>
            <Votes votes={comment.votes} id={comment._id} category={'comments'} />
          </div>
          <div>
            <p>{comment.created_by.username}</p>
            <p>timestamp</p>
            <p>{comment.body}</p>
            {user._id === comment.created_by._id &&<span onClick={() => api.deleteComment(comment._id)}>delete</span>}
          </div>
        </div>
      })}
    </div>
  );
};

export default Comments;