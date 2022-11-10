import { useEffect } from 'react'
import { ipcRenderer } from 'electron'

const QiLin = () => {
  useEffect(() => {
    ipcRenderer.send('open-qilin-view', {
      x: 230, y: 0, width: 824, height: 697
    })
    return () => {
      ipcRenderer.send('hidden_traceless_view')
    }
  }, [])
  return (
    <></>
  )
}
export default QiLin
