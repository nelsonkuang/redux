import { combineReducers } from 'redux'
import {
  SELECT_TOPIC, INVALIDATE_TOPIC,
  REQUEST_POSTS, RECEIVE_POSTS,
  LOADMORE_POSTS
} from '../actions'
import { FIRSTPAGE } from '../sagas'

export const DEFAULTTOPIC = 'ask'
const selectedTopic = (state = DEFAULTTOPIC, action) => {
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
  currentPage: FIRSTPAGE,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_TOPIC:
      return {
        ...state,
        didInvalidate: true
      }
    case LOADMORE_POSTS:
      return {
        ...state
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
        currentPage: action.page,
        items: action.page === 1 ? action.posts : [...state.items, ...action.posts],
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const postsByTopic = (state = {}, action) => {
  switch (action.type) {
    case INVALIDATE_TOPIC:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
    case LOADMORE_POSTS:
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
