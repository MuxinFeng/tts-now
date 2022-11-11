import { observer } from 'mobx-react'
import { useMemo, useRef, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import useAppSetting from '@/hook/app'
import pageStore, { PageEnum } from '@/store/page'

import './index.scss'
import MineCalendar from '@/pages/MineCalendar'
import MindMap from '@/pages/MindMap'
import Chatting from '@/pages/Chatting'
import Marvel from '@/pages/Marvel'
import TracelessBrowser from '@/pages/TracelessBrowser'
import QiLin from '@/pages/QiLin'

const Index = () => {
  const { currentPage } = pageStore
  const { appSetting, setAppSetting } = useAppSetting()
  const wrapper = useRef(null)
  const changeTagHandle = (actionMode: string) => {
    setAppSetting({
      customSetting: Object.assign(appSetting.customSetting, { actionMode })
    })
  }
  useEffect(() => {
    console.log(wrapper)
    const current: any = wrapper?.current
    if (current) {
      // const {
      //   offsetTop, offsetLeft, offsetWidth, offsetHeight
      // } = current
      ipcRenderer.send('view_position', {
        x: 200, y: 48, width: 824, height: 697
      })
    }
  }, [wrapper])

  const changePage = useMemo(() => {
    switch (currentPage) {
      case PageEnum.qilin:
        return <QiLin />
      case PageEnum.browser:
        return <TracelessBrowser />
      case PageEnum.calendar:
        return <MineCalendar />
      case PageEnum.chat:
        return <Chatting />
      case PageEnum.marvel:
        return <Marvel />
      case PageEnum.mindMap:
        return <MindMap />

      default:
        return <MineCalendar />
    }
  }, [currentPage])

  return <div className="main-wrapper" ref={wrapper}>{changePage}</div>
}

export default observer(Index)
