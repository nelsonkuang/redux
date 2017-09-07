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

export const receivePosts = (topic, posts) => ({
  type: RECEIVE_POSTS,
  topic,
  posts: posts,
  receivedAt: Date.now()
})