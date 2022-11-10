/* eslint-disable object-curly-newline */
import { useState, useEffect, useMemo } from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

import { AppContext, appSetting, appSettingCacheKey, store } from '@/config'
import { appReset } from '@/utils/core'

import Login from './pages/login'
import Index from './layout'

appReset()

export default () => {
  const [setting, setSetting] = useState(appSetting)
  const [isLogin, setIsLogin] = useState(false)

  const updateConfig = (newSetting: {
    [T in keyof APP.AppSetting]?: APP.AppSetting[T]
  }) => {
    setSetting({ ...setting, ...newSetting })
  }

  useEffect(() => {
    store.set(appSettingCacheKey, setting)
  }, [setting])

  const appContextValue = useMemo(
    () => ({
      appSetting: setting,
      setAppSetting: updateConfig
    }),
    [setting, updateConfig]
  )

  return (
    <ConfigProvider direction="ltr" locale={zhCN}>
      <AppContext.Provider value={appContextValue}>
        {isLogin ? <Index /> : <Login loginSuccess={() => setIsLogin(true)} />}
      </AppContext.Provider>
    </ConfigProvider>
  )
}
