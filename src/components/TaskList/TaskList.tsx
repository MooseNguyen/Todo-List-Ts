import { Todo } from '../../@types/todo.type'
import styles from './taskList.module.scss'

interface TaskListProps {
  doneTaskList?: boolean
  todos: Todo[]
  handlerDoneTodo: (idTodo: string, done: boolean) => any
  startEditTodo: (idTodo: string) => any
  deleteTodo: (idTodo: string) => any
}

function TaskList(props: TaskListProps) {
  const { doneTaskList, todos, handlerDoneTodo, startEditTodo, deleteTodo } = props

  const handlerCheckbox = (idTodo: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    handlerDoneTodo(idTodo, e.target.checked)
  }

  return (
    <div className='mb-2 '>
      <h2 className={styles.title}>{doneTaskList ? 'Finish' : 'Not Finish'}</h2>
      <div className={styles.tasks}>
        {todos.map((todo) => (
          <div className={styles.task} key={todo.id}>
            <input
              type='checkbox'
              className={styles.taskCheckbox}
              onChange={handlerCheckbox(todo.id)}
              checked={todo.done}
            />
            <span className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}>{todo.name}</span>
            <div className={styles.taskActions}>
              <button className={styles.taskBtn} onClick={() => startEditTodo(todo.id)}>
                ✎
              </button>
              <button className={styles.taskBtn} onClick={() => deleteTodo(todo.id)}>
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskList
