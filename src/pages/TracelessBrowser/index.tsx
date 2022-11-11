import { LinkOutlined } from '@ant-design/icons'
import {
  Button, Layout, List, Col, Row, Image, Modal, Input
} from 'antd'
import React, { useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import './index.scss'
import mtImg from '../../static/imgs/mt.png'
import elmImg from '../../static/imgs/elm.png'

const {
  Content, Sider
} = Layout
const App: React.FC = () => {
  const [inputUrl, setInputUrl] = useState('')
  const [open, setOpen] = useState(false)
  const [urlList, setUrlList] = useState([])
  const showModal = () => {
    ipcRenderer.send('hidden_traceless_view')
    setOpen(true)
  }
  const openView = (url) => {
    setUrlList([...urlList, { url, index: urlList.length }] as any)
    ipcRenderer.send('handle_view_position', { x: 418, y: 64 })
    ipcRenderer.send('add_traceless_view', url)
  }
  const hideModal = () => {
    openView(inputUrl)
    setOpen(false)
  }
  const changeUrl = (index) => {
    console.log(index)
    ipcRenderer.send(('switch_traceless_view'), index)
  }
  useEffect(() => ipcRenderer.send('hidden_traceless_view'), [])
  return (
    <>
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
              <Button block type="primary" icon={<LinkOutlined />} onClick={showModal}>打开链接</Button>
            </Col>
          </Row>
          <List
            style={{ overflowY: 'auto' }}
            dataSource={urlList}
            renderItem={(item: any) => (
              <List.Item onClick={() => { changeUrl(item.index) }}>
                {item.url}
              </List.Item>
            )}
          />
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <div />
          </Content>
        </Layout>
      </Layout>
      <Modal
        title="自定义网址"
        open={open}
        onOk={hideModal}
        onCancel={() => setOpen(false)}
        okText="确认"
      >
        <Input placeholder="输入您要访问的网站" value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} />
      </Modal>
    </>
  )
}

export default App
