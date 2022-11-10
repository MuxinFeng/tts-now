import { useEffect } from 'react'
import { ipcRenderer } from 'electron'

const QiLin = () => {
  useEffect(() => {
    // ipcRenderer.send('add_traceless_view', 'https://qilin.kezaihui.com/')
    // return () => {
    //   ipcRenderer.send('hidden_traceless_view')
    // }
  }, [])
  return (
    <></>
  )
}
export default QiLin
