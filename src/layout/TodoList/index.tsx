import { Modal, Input } from 'antd'
import {
  useEffect, useMemo, useState, FC
} from 'react'

import { Form } from './components/Form'
import { Tasks } from './components/Tasks'
import './index.scss'

const LOCALSTORAGE_TASKS_KEY = 'todolist-tasks'

interface Props {
  visible: boolean
  onClose: () => void
}

const TodoList: FC<Props> = ({ visible, onClose }) => {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTaskName, setSearchTaskName] = useState('')
  const onAddTask = (newTask) => {
    setTasks((currentState) => [...currentState, newTask] as any)
    // eslint-disable-next-line no-new
    new Notification('火枪手你好', {
      title: '温馨提示',
      body: `${newTask.name}的任务已经建好等待完成`
    } as any)
    setSearchTaskName('')
  }

  const onRemoveTask = (taskId) => {
    setTasks((currentState) => currentState.filter((task: any) => task.id !== taskId))
  }

  const onChangeCompleted = (taskId) => {
    const taskIndex = tasks.findIndex((task: any) => task.id === taskId)

    const updatedTask = [...tasks] as any
    updatedTask[taskIndex].completed = !updatedTask[taskIndex].completed

    setTasks(updatedTask)
  }

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(LOCALSTORAGE_TASKS_KEY, JSON.stringify(tasks))
    }
  }, [tasks])

  useEffect(() => {
    const tasksLocal = localStorage.getItem(LOCALSTORAGE_TASKS_KEY)
    // eslint-disable-next-line no-unused-expressions
    tasksLocal && setTasks(JSON.parse(tasksLocal))
    setIsLoading(false)
  }, [])

  const handleTermSearch = (e) => {
    const valueTerm = e.target.value.toLocaleLowerCase()
    setSearchTaskName(valueTerm)
  }

  const totalTasks = useMemo(() => tasks.length, [tasks])

  const totalCompletedTasks = useMemo(
    () => tasks.filter((task: any) => task.completed).length,
    []
  )

  return (
    <div className="todoList-container">
      <Modal
        title={(
          <Input
            style={{ width: '95%' }}
            type="text"
            value={searchTaskName}
            onChange={handleTermSearch}
            placeholder="搜索任务"
          />
        )}
        open={visible}
        centered
        width={1000}
        footer={null}
        onCancel={() => onClose()}
      >
        <div>
          <Form onSubmit={onAddTask} />
          <Tasks
            tasks={tasks}
            searchTaskName={searchTaskName}
            onRemoveTask={onRemoveTask}
            onChangeCompletedTask={onChangeCompleted}
          />
          <footer>
            <div>
              任务
              <span>{totalTasks}</span>
            </div>
            <div>
              已完成任务
              <span>{totalCompletedTasks}</span>
            </div>
          </footer>
        </div>
      </Modal>
    </div>
  )
}
export default TodoList
