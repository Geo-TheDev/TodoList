import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid';
import css from './App.css';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    // localStorage.removeItem(localStorage.getItem(LOCAL_STORAGE_KEY))
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos( prevTodos => [...prevTodos, ...storedTodos] );
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name == '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input class="addTodoBox" ref={todoNameRef} type="text" />
      <div>
        <button class="addBtn" onClick={handleAddTodo}>Add</button>
        <button class="removeBtn" onClick={handleClearTodos}>Clear Completed</button>
      </div>
      <div>
        <h2>{todos.filter(todo => !todo.complete).length} left to do</h2>
      </div>
    </>
    )
}

export default App
