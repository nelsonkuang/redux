import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import paginate from './paginate'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

// Updates an entity cache in response to any action with response.entities.
const entities = (state = { users: {}, repos: {} }, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return error
  }

  return state
}

// Updates the pagination data for different actions.
/*
如果不封装处理则写法如下：
const starredByUser = (state = {
    isFetching: false,
    nextPageUrl: undefined,
    pageCount: 0,
    ids: []
  }, action) => {
  switch (action.type) {
    case ActionTypes.STARRED_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case ActionTypes.STARRED_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: union(state.ids, action.response.result),
        nextPageUrl: action.response.nextPageUrl,
        pageCount: state.pageCount + 1
      }
    case ActionTypes.STARRED_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}
下面是封装处理，写法如下，省掉1.5/3左右代码冗余，因为原作者后面需要加了代码边界判断：
*/
const pagination = combineReducers({
  starredByUser: paginate({ // paginate函数参数入口是一个类似写jQuery插件的参数options对象，返回的是一个正常reducer的格式，
    mapActionToKey: action => action.login,
    types: [
      ActionTypes.STARRED_REQUEST,
      ActionTypes.STARRED_SUCCESS,
      ActionTypes.STARRED_FAILURE
    ]
  }),
  ownedByUser: paginate({
    mapActionToKey: action => action.login,
    types: [
      ActionTypes.OWN_REQUEST,
      ActionTypes.OWN_SUCCESS,
      ActionTypes.OWN_FAILURE
    ]
  }),
  stargazersByRepo: paginate({
    mapActionToKey: action => action.fullName,
    types: [
      ActionTypes.STARGAZERS_REQUEST,
      ActionTypes.STARGAZERS_SUCCESS,
      ActionTypes.STARGAZERS_FAILURE
    ]
  })
})
/*
汇总的state的组织结构如下：
- root
  - entities
    - users
    - repos
  - pagination
    - starredByUser
      - nelsonkuang(用户名)
        - ids
        - isFetching
        - nextPageUrl
        - pageCount
    - ownedByUser
    - stargazersByRepo
  - errorMessage
  - routing
*/
const rootReducer = combineReducers({
  entities,
  pagination,
  errorMessage,
  routing
})

export default rootReducer
