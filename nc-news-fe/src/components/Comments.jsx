import React from 'react';
import Votes from './Votes';
import moment from 'moment';

const Comments = ({ comments, user, removeComment}) => {
  return (
    <div className='comments-container'>
      {comments.map((comment, i) => {
        return <div className='single-comment' key={i}>
          <div className='single-comment-votes'>
            <Votes votes={comment.votes} id={comment._id} category={'comments'} />
          </div>
          <div className='comment-body'>
            <div className='comment-body-head'>
              <p>Author: {comment.created_by.username}</p>
              <span>{moment(comment.created_at).format('LT ll')}</span> 
            </div>
            <p>{comment.body}</p>
            {user._id === comment.created_by._id && <span className='delete' onClick={() => removeComment(comment._id)}><i className="fas fa-trash"></i></span>}
          </div>
        </div>
      })}
    </div>
  );
};

export default Comments;