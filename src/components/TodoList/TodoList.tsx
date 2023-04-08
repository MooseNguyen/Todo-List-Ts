import { useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import { Todo } from '../../@types/todo.type'

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

  const doneTodo = todos.filter((todo) => todo.done)
  const notdoneTodo = todos.filter((todo) => !todo.done)

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos((prev) => [...prev, todo])
  }

  const handlerDoneTodo = (idTodo: string, done: boolean) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === idTodo) {
          return { ...todo, done }
        }
        return todo
      })
    })
  }

  const startEditTodo = (idTodo: string) => {
    const findedTodo = todos.find((todo) => todo.id === idTodo)
    if (findedTodo) {
      setCurrentTodo(findedTodo)
    }
  }

  const editTodo = (name: string) => {
    setCurrentTodo((prev) => {
      if (prev) return { ...prev, name }
      return null
    })
  }

  const finishEditTodo = () => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === currentTodo?.id) {
          return currentTodo
        }
        return todo
      })
    })
    setCurrentTodo(null)
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} currentTodo={currentTodo} editTodo={editTodo} finishEditTodo={finishEditTodo} />
        <TaskList todos={notdoneTodo} handlerDoneTodo={handlerDoneTodo} startEditTodo={startEditTodo} />
        <TaskList doneTaskList todos={doneTodo} handlerDoneTodo={handlerDoneTodo} startEditTodo={startEditTodo} />
      </div>
    </div>
  )
}

export default TodoList
