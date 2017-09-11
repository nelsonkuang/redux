import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadTodo, toggleTodo } from '../actions'
import TodoList from '../components/TodoList'

class VisibleTodoList extends React.Component {

  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.handleTodoClick = this.handleTodoClick.bind(this)
  } 

  componentDidMount() {
    this.props.dispatch(loadTodo())
  }

  handleTodoClick = id => {
    this.props.dispatch(toggleTodo(id))
  }

  render() {
    const { todos } = this.props
    return (
      <TodoList 
        todos={todos} 
        onTodoClick={this.handleTodoClick}
        />
    );
  }
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = (state) => ({
  todos: getVisibleTodos(state.todos.data, state.visibilityFilter),
})


export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(VisibleTodoList)