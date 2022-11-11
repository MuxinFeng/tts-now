import { FaInfoCircle } from 'react-icons/fa'

import styles from './index.module.css'

// eslint-disable-next-line react/prop-types
export const BoxAlert = ({ type }) => (
  <div className={`${styles.boxAlert} ${styles[type]}`}>
    {type === 'empty' && (
      <>
        <FaInfoCircle size={36} />
        <p> 没有新建的任务</p>
      </>
    )}

    {type === 'warning' && (
      <>
        <FaInfoCircle size={36} />
        <p>搜索不到任务</p>
      </>
    )}
  </div>
)
