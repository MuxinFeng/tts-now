import { Button, Menu } from 'antd'
import {
  RocketOutlined,
  RedditOutlined,
  ChromeOutlined,
  BellOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import React, { useState } from 'react'

import styles from './index.module.scss'

type MenuItem = Required<MenuProps>['items'][number]
const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
  // type?: 'group'
): MenuItem =>
  ({
    key,
    icon,
    children,
    label
    // type
  } as MenuItem)

const SiderBar = () => {
  const items: MenuItem[] = [
    getItem('麒麟', '1', <RedditOutlined />),
    getItem('浏览器', '2', <ChromeOutlined />),
    getItem('通知栏', '3', <BellOutlined />),
    getItem('工具箱', '4', <RocketOutlined />)
  ]
  return (
    <div className={styles.wrapper} style={{ color: '#3d4a5f' }}>
      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        inlineCollapsed
        inlineIndent={48}
        items={items}
        theme="dark"
      />
    </div>
  )
}

export default SiderBar
