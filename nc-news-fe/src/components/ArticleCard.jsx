import React from 'react';
import AddComment from './AddComment'
import Comments from './Comments';

const ArticleCard = ({close, article, loggedUser}) => {
  return (
    <div>
      <span onClick={close}>X</span>
      <h1>{article.title}</h1>
      <p>{article.topic}</p>
      <p>{article.belongs_to}</p>
      <p>{article.body}</p>
      <AddComment user={loggedUser} articleId={article._id}/>
      <h3>Comments:</h3>
      <Comments articleId={article._id}/>
    </div>
  );
};

export default ArticleCard;