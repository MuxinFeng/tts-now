import { observer } from 'mobx-react'
import { useMemo } from 'react'
import useAppSetting from '@/hook/app'
import pageStore, { PageEnum } from '@/store/page'

import './index.scss'
import MineCalendar from '@/pages/MineCalendar'
import MindMap from '@/pages/MindMap'
import Chatting from '@/pages/Chatting'
import Marvel from '@/pages/Marvel'

const Index = () => {
  const { currentPage } = pageStore
  const { appSetting, setAppSetting } = useAppSetting()

  const changeTagHandle = (actionMode: string) => {
    setAppSetting({
      customSetting: Object.assign(appSetting.customSetting, { actionMode })
    })
  }

  const changePage = useMemo(() => {
    switch (currentPage) {
      case PageEnum.qilin:
        return <div>11111</div>

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

  return <div className="main-wrapper">{changePage}</div>
}

export default observer(Index)
