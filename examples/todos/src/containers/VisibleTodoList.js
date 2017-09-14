import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadTodo, toggleTodo, SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE, deleteTodo } from '../actions'
import TodoList from '../components/TodoList'
import SDialog, {defaultProps as defaultSDialogOptions} from '../components/SDialog'

class VisibleTodoList extends React.Component {

  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    operating: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.handleTodoClick = this.handleTodoClick.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDeleteOk = this.handleDeleteOk.bind(this)
    this.showSDialog = this.showSDialog.bind(this)
    this.hideSDialog = this.hideSDialog.bind(this)
    this.state = {
      sDialogOptions: defaultSDialogOptions
    }    
  } 

  componentDidMount() {
    this.props.dispatch(loadTodo())
  }

  handleTodoClick(id) {
    this.props.dispatch(toggleTodo(id))
  }

  handleDelete(id) {
    this.showSDialog({
      content: '确定要删除此项目?',
      okBtn: true,
      cancelBtn: true,
      onOk: () => {
        this.props.dispatch(deleteTodo(id))
        this.hideSDialog()
      },
      onCancel: () => this.hideSDialog(),
      onDestroy: () => this.hideSDialog(),      
    })
  }

  showSDialog(options) {
    this.setState({
      sDialogOptions: {
        ...defaultSDialogOptions,
        show: true,
        ...options
      }
    })
  }

  hideSDialog() {
    this.setState({
      sDialogOptions: {
        ...defaultSDialogOptions,
        show: false
      }
    })
  }

  render() {
    const { todos, operating } = this.props
    const { sDialogOptions } = this.state
    let operatingTips =(
      <div style={{textAlign:'center', padding:'10px 0', fontSize:'16px', display: operating ? 'block' : 'none'}}>
        处理中...
      </div>
      )
    return (
      <div>
        <TodoList 
          todos={todos} 
          onTodoClick={this.handleTodoClick}
          onDelete={this.handleDelete}
          />
        {operatingTips}
        <SDialog {...sDialogOptions} />
      </div>
    );
  }
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case SHOW_ALL:
      return todos
    case SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = (state) => ({
  todos: getVisibleTodos(state.todos.data, state.visibilityFilter),
  operating: state.todos.operating
})


export default connect(
  mapStateToProps,
)(VisibleTodoList)