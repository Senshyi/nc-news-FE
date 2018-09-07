const DB_URL = 'https://jan-nc-news.herokuapp.com/api';

export const fetchArticles = () => {
  return fetch(`${DB_URL}/articles`)
    .then(res => {
      if (res.status !== 200) throw res;
      return res.json()
    })
}

export const fetchTopicArticles = (topic) => {
  return fetch(`${DB_URL}/topics/${topic}/articles`)
    .then(res => {
      if(res.status !== 200) throw res;
      else return res.json()
    })
}

export const fetchTopics = () => {
  return fetch(`${DB_URL}/topics`)
    .then(res => {
      if (res.status !== 200) throw res;
      return res.json()
    })
}

export const fetchComments = (articleId) => {
  return fetch(`${DB_URL}/articles/${articleId}/comments`)
    .then(res => {
      if (res.status !== 200) throw res;
      return res.json()
    })
}

export const fetchUser = (username) => {
  return fetch(`${DB_URL}/users/${username}`)
    .then(res => {
      if (res.status !== 200) throw res;
      return res.json()
    })
}

export const addComment = (articleId, userId, comment) => {
  const bodyObj = {
    body: comment,
    created_by: userId }
  return fetch(`${DB_URL}/articles/${articleId}/comments`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyObj)
  })
    .then(res => {
      if (res.status !== 201) throw res;
      return res.json()
    })
}

export const addArticle = ({topic, body, title}, userId) => {
  const bodyObj = {
    body,
    title,
    created_by: userId
  }
  return fetch(`${DB_URL}/topics/${topic}/articles`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyObj)
  })
    .then(res => {
      if (res.status !== 201) throw res;
      return res.json()
    })
}

export const updateVotes = (category, id, vote) => {
  return fetch(`${DB_URL}/${category}/${id}?vote=${vote}`, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (res.status !== 201) throw res;
      return res.json()
    })
}

export const deleteComment = (id) => {
  return fetch(`${DB_URL}/comments/${id}`, {
    method: 'delete',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (res.status !== 200 || 201) throw res;
      return res.json()
    })
}