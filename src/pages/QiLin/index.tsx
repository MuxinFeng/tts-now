import { useEffect } from 'react'
import { ipcRenderer } from 'electron'

const QiLin = () => {
  useEffect(() => {
    ipcRenderer.send('open-qilin-view', { x: 210, y: 60 })
    return () => {
      ipcRenderer.send('hidden_traceless_view')
    }
  }, [])
  return (
    <></>
  )
}
export default QiLin
