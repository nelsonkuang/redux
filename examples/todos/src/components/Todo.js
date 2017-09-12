import React from 'react'
import PropTypes from 'prop-types'

const Todo = ({ onClick, completed, text, onDelete, created }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  <i
    onClick={onDelete}
    className="todos__delete_btn"
  >X</i>
  <span style={{float: 'right', paddingRight: '20px'}}>{created}</span>
  </li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  created: PropTypes.string.isRequired
}

export default Todo
