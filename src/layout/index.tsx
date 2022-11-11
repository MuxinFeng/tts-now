/* eslint-disable react/jsx-closing-bracket-location */
import styled from '@emotion/styled'
import { useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'

import { Input, Layout, Modal } from 'antd'
import { ipcRenderer } from 'electron'
import AppMain from './AppMain'
import SiderBar from './SiderBar'
import TodoList from './TodoList'
import './index.scss'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`
// eslint-disable-next-line object-curly-newline
const { Header, Content, Footer, Sider } = Layout

const Index = () => {
  const [searchText, setSearchText] = useState<string>()
  const [showTodoList, setShowTodoList] = useState<boolean>(false)

  return (
    <Layout className="app-container">
      <Header>
        <div className="search-container">
          <Input
            placeholder="搜索Ctrl+K"
            value={searchText}
            onClick={() => {
              ipcRenderer.send('close-qilin-view')
              setShowTodoList(true)
            }}
            suffix={<SearchOutlined className="search-icon" />}
          />
          {showTodoList ? (
            <TodoList
              visible={showTodoList}
              onClose={() => {
                setShowTodoList(false)
                ipcRenderer.send('open-qilin-view', { x: 210, y: 60 })
              }}
            />
          ) : null}
        </div>
      </Header>
      <Layout className="content">
        <Sider>
          <SiderBar />
        </Sider>
        <Layout>
          <Content>
            <AppMain />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Index
