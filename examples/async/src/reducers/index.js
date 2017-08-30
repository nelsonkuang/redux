import { combineReducers } from 'redux'
import {
  SELECT_TOPIC, INVALIDATE_TOPIC,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'

const selectedTopic = (state = 'ask', action) => {
  switch (action.type) {
    case SELECT_TOPIC:
      return action.topic
    default:
      return state
  }
}

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_TOPIC:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const postsByTopic = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_TOPIC:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.topic]: posts(state[action.topic], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsByTopic,
  selectedTopic
})

export default rootReducer
