import React from 'react'
import PropTypes from 'prop-types'

const Todo = ({ onClick, completed, text, onEdit, onDelete, created }) => (
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
  >删除</i>
  <i
    onClick={onEdit}
    className="todos__edit_btn"
  >编辑</i>
  <span style={{float: 'right', paddingRight: '20px', color: '#999', fontSize: '12px'}}>{created}</span>
  </li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  created: PropTypes.string.isRequired
}

export default Todo
