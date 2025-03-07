import { FaTrashAlt } from 'react-icons/fa'

import styles from './index.module.css'

export const Task = ({
  // eslint-disable-next-line react/prop-types
  id, name, completed, onRemove, onChangeCompleted
}) => (
  <li className={`${styles.task} ${completed ? styles.completed : ''}`}>
    <input
      type="checkbox"
      checked={completed}
      className={styles.task__checkbox}
      onChange={() => onChangeCompleted(id)}
    />

    <span className={styles.task__name}>
      {name}
    </span>

    <button
      type="button"
      className={styles.task__button}
      onClick={() => onRemove(id)}
    >
      <FaTrashAlt size={16} />
    </button>
  </li>
)
