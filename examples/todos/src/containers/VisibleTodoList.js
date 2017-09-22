import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadTodo, toggleTodo, SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE, deleteTodo, editTodo } from '../actions'
import TodoList from '../components/TodoList'
import SDialog, {defaultProps as defaultSDialogOptions} from '../components/SDialog'
import Dialog, {defaultProps as defaultDialogOptions} from '../components/Dialog'

class VisibleTodoList extends React.Component {

  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
      created: PropTypes.string
    }).isRequired).isRequired,
    operating: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.handleTodoClick = this.handleTodoClick.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleEditInputChange = this.handleEditInputChange.bind(this)
    this.handleEditCheckboxChange = this.handleEditCheckboxChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.showSDialog = this.showSDialog.bind(this)
    this.hideSDialog = this.hideSDialog.bind(this)
    this.showDialog = this.showDialog.bind(this)
    this.hideDialog = this.hideDialog.bind(this)
    this.state = {
      sDialogOptions: defaultSDialogOptions,
      dialogOptions: defaultDialogOptions,
      editingTodo: {}
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

  handleEdit(todo) {
    this.setState({
      editingTodo: {
        ...todo
      }
    })
    this.showDialog({
      okBtn: true,
      cancelBtn: true,
      onOk: () => {
        this.props.dispatch(editTodo(this.state.editingTodo))
        this.hideDialog()
      },
      onCancel: () => {
        this.setState({
          editingTodo: {}
        })       
        this.hideDialog()  
      },
      onCreated: () => {
        this.todoEditInput.focus()
      }
    })
  }

  handleEditInputChange(e) {
    this.setState({
      editingTodo: {
        ...this.state.editingTodo,
        text: e.target.value
      }
    })
  }
  handleEditCheckboxChange(e) {
    this.setState({
      editingTodo: {
        ...this.state.editingTodo,
        completed: e.target.checked
      }
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

  showDialog(options) {
    this.setState({
      dialogOptions: {
        ...defaultDialogOptions,
        show: true,
        ...options
      }
    })
  }

  hideDialog() {
    this.setState({
      dialogOptions: {
        ...defaultDialogOptions,
        show: false
      }
    })
  }

  render() {
    const { todos, operating } = this.props
    const { sDialogOptions, dialogOptions, editingTodo } = this.state
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
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
          />
        {operatingTips}
        <Dialog {...dialogOptions} >
          <div className="todo__edit_input"><label><textarea defaultValue={editingTodo.text} onChange={this.handleEditInputChange} rows="2" ref={ input => { this.todoEditInput = input }} /></label></div>
          <div className="todo__edit_checkbox"><label><input type="checkbox" name="completed" defaultChecked={editingTodo.completed} onChange={this.handleEditCheckboxChange} /> 已完成</label></div>
        </Dialog>
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