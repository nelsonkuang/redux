import uid from 'uid'

export const LOAD_TODO = 'LOAD_TODO'
export const LOAD_REQUEST = 'LOAD_REQUEST'
export const LOAD_SUCCESS = 'LOAD_SUCCESS'
export const LOAD_FAILURE = 'LOAD_FAILURE'
export const loadTodo = () => ({
  type: LOAD_TODO,
  types: [LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE]
})

export const ADD_TODO = 'ADD_TODO'
export const ADD_REQUEST = 'ADD_REQUEST'
export const ADD_SUCCESS = 'ADD_SUCCESS'
export const ADD_FAILURE = 'ADD_FAILURE'
export const addTodo = (text) => ({
  type: ADD_TODO,
  types: [ADD_REQUEST, ADD_SUCCESS, ADD_FAILURE],
  id: 'id_' + uid(),
  text,
  created: new Date().toLocaleString()
})

export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const SHOW_ALL = 'SHOW_ALL'
export const SHOW_COMPLETED = 'SHOW_COMPLETED'
export const SHOW_ACTIVE = 'SHOW_ACTIVE'
export const setVisibilityFilter = (filter) => ({
  type: SET_VISIBILITY_FILTER,
  filter
})

export const TOGGLE_TODO = 'TOGGLE_TODO'
export const TOGGLE_REQUEST = 'TOGGLE_REQUEST'
export const TOGGLE_SUCCESS = 'TOGGLE_SUCCESS'
export const TOGGLE_FAILURE = 'TOGGLE_FAILURE'
export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  types: [TOGGLE_REQUEST, TOGGLE_SUCCESS, TOGGLE_FAILURE],
  id
})

export const EDIT_TODO = 'EDIT_TODO'
export const EDIT_REQUEST = 'EDIT_REQUEST'
export const EDIT_SUCCESS = 'EDIT_SUCCESS'
export const EDIT_FAILURE = 'EDIT_FAILURE'
export const editTodo = (todo) => ({
  type: EDIT_TODO,
  types: [EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAILURE],
  todo
})


export const DELETE_TODO = 'DELETE_TODO'
export const DELETE_REQUEST = 'DELETE_REQUEST'
export const DELETE_SUCCESS = 'DELETE_SUCCESS'
export const DELETE_FAILURE = 'DELETE_FAILURE'
export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  types: [DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE],
  id
})
