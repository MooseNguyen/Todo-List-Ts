import { useEffect, useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import { Todo } from '../../@types/todo.type'

type HandlerNewTodos = (todos: Todo[]) => Todo[]

const syncTodosToLocal = (hanlderNewTodos: HandlerNewTodos) => {
  const todosString = localStorage.getItem('todos')
  const todosObj: Todo[] = JSON.parse(todosString || '[]')
  const newTodosObj = hanlderNewTodos(todosObj)
  localStorage.setItem('todos', JSON.stringify(newTodosObj))
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

  const doneTodo = todos.filter((todo) => todo.done)
  const notdoneTodo = todos.filter((todo) => !todo.done)

  useEffect(() => {
    const todosString = localStorage.getItem('todos')
    const todosObj: Todo[] = JSON.parse(todosString || '[]')
    setTodos(todosObj)
  }, [])

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos((prev) => [...prev, todo])
    syncTodosToLocal((todosObj: Todo[]) => [...todosObj, todo])
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
    const handler = (todosObj: Todo[]) => {
      return todosObj.map((todo) => {
        if (todo.id === currentTodo?.id) {
          return currentTodo
        }
        return todo
      })
    }
    setTodos(handler)
    setCurrentTodo(null)
    syncTodosToLocal(handler)
  }

  const deleteTodo = (idTodo: string) => {
    if (currentTodo) setCurrentTodo(null)
    const handler = (todosObj: Todo[]) => {
      const findIndexTodo = todosObj.findIndex((todo) => todo.id === idTodo)
      if (findIndexTodo > -1) {
        const result = [...todosObj]
        result.splice(findIndexTodo, 1)
        return result
      }
      return todosObj
    }
    setTodos(handler)
    syncTodosToLocal(handler)
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} currentTodo={currentTodo} editTodo={editTodo} finishEditTodo={finishEditTodo} />
        <TaskList
          todos={notdoneTodo}
          handlerDoneTodo={handlerDoneTodo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
        <TaskList
          doneTaskList
          todos={doneTodo}
          handlerDoneTodo={handlerDoneTodo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  )
}

export default TodoList
