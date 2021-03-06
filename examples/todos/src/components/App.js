import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import '../style/App.css';
import '../style/SDialog.css';
import '../style/Dialog.css';

const App = () => (
  <div className="todos">
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App
