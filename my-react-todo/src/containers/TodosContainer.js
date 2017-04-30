// src/containers/TodosContainer.js
import React, {Component} from 'react'
import TodoModel from '../models/Todo'
import TodoList from '../components/TodoList'
import CreateTodoForm from '../components/CreateTodoForm.js'

class TodosContainer extends Component {
  constructor(){
    super()
    this.state = {
      todos: []
    }
  }
  componentDidMount(){
    this.fetchData()
  }
  fetchData(){
    TodoModel.all().then( (res) => {
      this.setState ({
        todos: res.data.todos
      })
    })
  }
  createTodo(newBody) {
    console.log('creating todo', newBody)
    let newTodo = {
      body: newBody,
      completed: false
    }
    TodoModel.create(newTodo).then((res) => {
      console.log('created todo', res.data)
      let todos = this.state.todos
      let newTodos = todos.push(res.data)
      this.setState({newTodos})
    })
  }
  deleteTodo(todo) {
    console.log('deleting todo', todo)
    TodoModel.delete(todo).then((res) => {
        let todos = this.state.todos.filter(function(todo) {
          return todo._id !== res.data._id
        });
        this.setState({todos})
    })
  }
  updateTodo(todo) {
    console.log('updating todo from TodosContainer', todo)
  }
  render(){
    return (
      <div className='todosContainer'>
        <CreateTodoForm
        createTodo={this.createTodo.bind(this)} />
        <TodoList
          todos={this.state.todos} 
          onDeleteTodo={this.deleteTodo.bind(this)} />
      </div>
    )
  }
}

export default TodosContainer