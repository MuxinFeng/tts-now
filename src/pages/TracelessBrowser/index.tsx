import { LinkOutlined } from '@ant-design/icons'
import {
  Button, Layout, List, Col, Row, Image
} from 'antd'
import React, { useEffect } from 'react'
import { ipcRenderer } from 'electron'
import './index.scss'
import mtImg from '../../static/imgs/mt.png'
import elmImg from '../../static/imgs/elm.png'

const {
  Content, Sider
} = Layout
const urlList: string[] = []
const App: React.FC = () => {
  const openView = (url: string) => {
    urlList.push(url)
    ipcRenderer.send('add_traceless_view', url)
  }
  useEffect(() => ipcRenderer.send('hidden_traceless_view'), [])
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" style={{ padding: '6px 8px' }}>
        {/* <Row justify="space-between">
          <Col>
            <Image
              preview={false}
              src={mtImg}
              width={40}
              height={40}
              style={{ borderRadius: '50%' }}
              onClick={() => openView('https://developer.meituan.com/docs/biz')}
            />
          </Col>
          <Col>
            <Image
              preview={false}
              src={elmImg}
              width={50}
              height={50}
              style={{ borderRadius: '50%' }}
            />
          </Col>
        </Row> */}
        <Row justify="space-between">
          <Col>
            <Button block onClick={() => openView('https://developer.meituan.com/docs/biz')}>美 团</Button>
          </Col>
          <Col>
            <Button block onClick={() => openView('https://melody.shop.ele.me/login')}>饿了么</Button>
          </Col>
        </Row>
        <Row style={{ marginTop: '12px' }}>
          <Col style={{ width: '100%' }}>
            <Button block type="primary" icon={<LinkOutlined />}>打开链接</Button>
          </Col>
        </Row>
        <List
          style={{ overflowY: 'auto' }}
          dataSource={urlList}
          renderItem={(item) => (
            <List.Item>
              {item}
            </List.Item>
          )}
        />
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <div style={{ width: '100%', height: '100%' }} />
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
