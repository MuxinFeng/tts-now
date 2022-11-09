import { Button, Menu } from 'antd'
import {
  RocketOutlined,
  RedditOutlined,
  ChromeOutlined,
  BellOutlined,
  CalendarOutlined,
  WechatOutlined,
  SketchOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import React, { useState } from 'react'
import pageStore, { PageEnum } from '@/store/page'

import styles from './index.module.scss'

type MenuItem = Required<MenuProps>['items'][number]

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
  // type?: 'group'
): MenuItem =>
  // eslint-disable-next-line implicit-arrow-linebreak
  ({
    key,
    icon,
    children,
    label
    // type
  } as MenuItem)

const SiderBar = () => {
  const { setCurrentPage } = pageStore
  const items: MenuItem[] = [
    getItem('麒麟', PageEnum.qilin, <RedditOutlined />),
    getItem('浏览器', PageEnum.browser, <ChromeOutlined />),
    getItem('通知栏', PageEnum.notice, <BellOutlined />),
    getItem('工具箱', PageEnum.toolbox, <RocketOutlined />),
    getItem('日历', PageEnum.calendar, <CalendarOutlined />),
    getItem('会话', PageEnum.chat, <WechatOutlined />),
    getItem('造物', PageEnum.marvel, <SketchOutlined />)
  ]
  return (
    <div className={styles.wrapper} style={{ color: '#3d4a5f' }}>
      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        inlineCollapsed
        inlineIndent={48}
        items={items}
        onSelect={(item) => {
          setCurrentPage(item.key as any)
        }}
        theme="dark"
      />
    </div>
  )
}

export default SiderBar
