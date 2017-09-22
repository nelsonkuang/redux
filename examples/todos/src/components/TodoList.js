import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

const TodoList = ({ todos, onTodoClick, onEdit, onDelete }) => (
  <ul className="todos__list">
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
        onDelete={(e) => {
            e.stopPropagation()
            e.nativeEvent.stopImmediatePropagation()
            onDelete(todo.id)
          }
        }
        onEdit={(e) => {
            e.stopPropagation()
            e.nativeEvent.stopImmediatePropagation()
            onEdit(todo)
          }
        }
      />
    )}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    created: PropTypes.string
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default TodoList
