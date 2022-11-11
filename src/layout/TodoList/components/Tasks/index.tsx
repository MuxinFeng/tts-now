/* eslint-disable react/prop-types */
import { useMemo } from 'react'

import { JSX } from '@emotion/react/jsx-runtime'
import { Task } from '../Task'
import { BoxAlert } from '../BoxAlert'

import styles from './index.module.css'

// eslint-disable-next-line react/prop-types
export const Tasks = ({
  tasks,
  searchTaskName,
  onRemoveTask,
  onChangeCompletedTask
}) => {
  const isVisibleTask = (task: { name: string }) => {
    const taskName = task.name.toLocaleLowerCase()
    return taskName.includes(searchTaskName)
  }

  const stateTasks = useMemo(() => {
    // eslint-disable-next-line react/prop-types
    if (tasks.length === 0) {
      return 'empty'
      // eslint-disable-next-line react/prop-types
    }
    if (!tasks.some((task: any) => isVisibleTask(task))) {
      return 'search-empty'
    }

    return 'default'
  }, [tasks, searchTaskName])

  if (stateTasks === 'empty') {
    return <BoxAlert type={stateTasks} />
  }

  if (stateTasks === 'search-empty') {
    return <BoxAlert type="warning" />
  }

  return (
    <ul className={styles.tasks}>
      {tasks.map(
        (
          task: JSX.IntrinsicAttributes & {
            id: any
            name: any
            completed: any
            onRemove: any
            onChangeCompleted: any
          }
        ) =>
          // eslint-disable-next-line react/jsx-props-no-spreading, implicit-arrow-linebreak
          isVisibleTask(task) && (
            <Task
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...task}
              key={task.id}
              onRemove={onRemoveTask}
              onChangeCompleted={onChangeCompletedTask}
            />
          )
      )}
    </ul>
  )
}
