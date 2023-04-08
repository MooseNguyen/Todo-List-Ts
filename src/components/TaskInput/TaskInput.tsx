import { useState } from 'react'
import styles from './taskInput.module.scss'
import { Todo } from '../../@types/todo.type'

interface TaskInputProps {
  addTodo: (name: string) => any
  currentTodo: Todo | null
  editTodo: (name: string) => any
  finishEditTodo: () => any
}

function TaskInput(props: TaskInputProps) {
  const { addTodo, currentTodo, editTodo, finishEditTodo } = props
  const [name, setName] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentTodo) {
      finishEditTodo()
      if (name) setName('')
    } else {
      addTodo(name)
      setName('')
    }
  }
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (currentTodo) {
      editTodo(value)
    } else {
      setName(value)
    }
  }

  return (
    <div className='mb-2'>
      <h1 className={styles.title}>ToDo List</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='caption goes here'
          onChange={onChangeInput}
          value={currentTodo ? currentTodo.name : name}
        />
        <button type='submit'>+</button>
      </form>
    </div>
  )
}

export default TaskInput
