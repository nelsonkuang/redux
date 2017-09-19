export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_TOPIC = 'SELECT_TOPIC'
export const INVALIDATE_TOPIC = 'INVALIDATE_TOPIC'
export const LOADMORE_POSTS = 'LOADMORE_POSTS'

export const selectTopic = topic => ({
  type: SELECT_TOPIC,
  topic
})

export const invalidateTopic = topic => ({
  type: INVALIDATE_TOPIC,
  topic
})

export const requestPosts = (topic, page) => ({
  type: REQUEST_POSTS,
  topic,
  page
})

export const loadMoreByTopic = (topic, page) => ({
  type: LOADMORE_POSTS,
  topic,
  page
})

export const receivePosts = (topic, posts, page) => ({
  type: RECEIVE_POSTS,
  topic,
  posts: posts,
  page,
  receivedAt: Date.now()
})