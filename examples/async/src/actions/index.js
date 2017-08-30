export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_TOPIC = 'SELECT_TOPIC'
export const INVALIDATE_TOPIC = 'INVALIDATE_TOPIC'

export const selectTopic = topic => ({
  type: SELECT_TOPIC,
  topic
})

export const invalidateTopic = topic => ({
  type: INVALIDATE_TOPIC,
  topic
})

export const requestPosts = topic => ({
  type: REQUEST_POSTS,
  topic
})

export const receivePosts = (topic, json) => ({
  type: RECEIVE_POSTS,
  topic,
  posts: json.data.map(child => child),
  receivedAt: Date.now()
})

const fetchPosts = topic => dispatch => {
  dispatch(requestPosts(topic))
  return fetch(`https://cnodejs.org/api/v1/topics?tab=${topic}`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(topic, json)))
}

const shouldFetchPosts = (state, topic) => {
  const posts = state.postsByTopic[topic]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeeded = topic => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), topic)) {
    return dispatch(fetchPosts(topic))
  }
}
