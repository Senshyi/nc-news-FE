import React from 'react';
import Votes from './Votes';

const Comments = ({ comments, user, removeComment}) => {
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
            {user._id === comment.created_by._id && <span onClick={() => removeComment(comment._id)}>delete</span>}
          </div>
        </div>
      })}
    </div>
  );
};

export default Comments;