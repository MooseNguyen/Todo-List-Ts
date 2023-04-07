import styles from './taskInput.module.scss'

function TaskInput() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e)
  }
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {}

  return (
    <div className='mb-2'>
      <h1 className={styles.title}>ToDo List</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type='text' placeholder='caption goes here' onChange={onChangeInput} />
        <button type='submit'>+</button>
      </form>
    </div>
  )
}

export default TaskInput
