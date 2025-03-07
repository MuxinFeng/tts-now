/* eslint-disable global-require */
import * as React from 'react'
import { useState } from 'react'
import {
  Button,
  Card,
  Form,
  Row,
  Col,
  Carousel,
  Space,
  Tabs,
  Input,
  Select,
  Checkbox,
  Spin
} from 'antd'
import { ipcRenderer } from 'electron'
import { fetchToken } from '@/services'

// import SandBox from '../../assets/img/avatar.png'
// import XinDong from '../../assets/img/xindong.jpg'
// import CaiXuKun from '../../assets/img/caixunkun.png'

import './index.scss'

const prefix = 'login-page'

const CarouselContent = [
  {
    img: require('../../assets/img/duozhanghao.jpg'),
    title: '多账号登录',
    description: '家里有一个，外面也可以有多个'
  },
  {
    img: require('../../assets/img/shuijiao.jpg'),
    title: '智能唤醒',
    description: '轻轻唤起沉睡的心灵'
  },
  {
    img: require('../../assets/img/gongju.jpg'),
    title: '其他工具',
    description: '用了工具，一个人就能顶半边山'
  },
  {
    img: require('../../assets/img/beijing.jpg'),
    title: '移除背景',
    description: '一键移除背景'
  },
  {
    img: require('../../assets/img/liaotian.jpg'),
    title: '聊天工具',
    description: '不再担心当面被怼 bug'
  },
  {
    img: require('../../assets/img/zhineng.jpg'),
    title: '你说我画',
    description: '智能生成图片配图,比美颜更好用'
  }
]
interface Props {
  loginSuccess: () => void
}

const Login = (props: Props) => {
  const { loginSuccess } = props
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    const { token } = await fetchToken(
      { username: 'fengxin', password: 'Fx33561088' },
      ''
    )
    ipcRenderer.send('window-set-cookie', token)
    console.log(token)
    const myNotification = new Notification('登录成功', {
      body: '全都是科技与狠货啊'
    })

    myNotification.onclick = () => {
      console.log('通知被点击后触发')
    }
    loginSuccess()
    setLoading(false)
  }

  return (
    <Spin spinning={loading}>
      <div className={`${prefix}`}>
        <Row>
          <Col span={10}>
            <div style={{ height: '20vh' }} />
            <div className={`${prefix}-carousel`}>
              <Carousel autoplay>
                {CarouselContent.map((item) => (
                  <div className={`${prefix}-carousel-item`}>
                    <Space direction="vertical">
                      <img src={item.img} />
                      <div>
                        <h1>{item.title}</h1>
                        <h3>{item.description}</h3>
                      </div>
                    </Space>
                  </div>
                ))}
              </Carousel>
            </div>
            <div style={{ height: '20vh' }} />
          </Col>
          <Col span={14}>
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20vh 20vw 20vh 10vw'
              }}>
              <Card
                style={{
                  height: '60vh',
                  width: '100%',
                  borderRadius: '10px',
                  boxShadow: '0 4px 10px 0 rgba(114, 120, 141, 0.1)'
                }}
                title="欢迎使用麒麟工作台">
                <Tabs>
                  <Tabs.TabPane tab="手机号" key="phone">
                    <Form>
                      <Form.Item>
                        <Input.Group compact style={{ width: '100%' }}>
                          <Select
                            defaultValue="Zhejiang"
                            style={{ width: '30%' }}>
                            <Select.Option value="Zhejiang">+86</Select.Option>
                            <Select.Option value="Jiangsu">+110</Select.Option>
                          </Select>
                          <Input
                            style={{ width: '70%' }}
                            placeholder="请输入你的手机号"
                          />
                        </Input.Group>
                      </Form.Item>
                      <Form>
                        <Input
                          style={{ width: '100%' }}
                          placeholder="请输入密码"
                        />
                      </Form>

                      <Form.Item>
                        <div style={{ height: '30px' }} />
                        <Checkbox defaultChecked={false}>
                          我已阅读并同意 <a>服务协议</a> 和 <a>隐私政策</a>
                        </Checkbox>
                        <br />
                        <Checkbox defaultChecked={false}>
                          15 天内自动登录
                        </Checkbox>
                      </Form.Item>
                    </Form>
                    <Button
                      type="primary"
                      style={{ width: '100%' }}
                      onClick={handleLogin}>
                      登录
                    </Button>
                  </Tabs.TabPane>

                  <Tabs.TabPane tab="邮箱" key="email">
                    <Form>
                      <Form.Item>
                        <Input
                          suffix="@kezaihui.com"
                          placeholder="请输入邮箱"
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                      <Form>
                        <Input
                          style={{ width: '100%' }}
                          placeholder="请输入密码"
                        />
                      </Form>

                      <Form.Item>
                        <div style={{ height: '30px' }} />
                        <Checkbox defaultChecked={false}>
                          我已阅读并同意 <a>服务协议</a> 和 <a>隐私政策</a>
                        </Checkbox>
                        <br />
                        <Checkbox defaultChecked={false}>
                          15 天内自动登录
                        </Checkbox>
                      </Form.Item>
                    </Form>
                    <Button
                      type="primary"
                      style={{ width: '100%' }}
                      onClick={handleLogin}>
                      登录
                    </Button>
                  </Tabs.TabPane>

                  <Tabs.TabPane tab="扫码" key="pic">
                    <div style={{ textAlign: 'center' }}>
                      <p>请使用企业微信移动端扫描二维码</p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '50-px 0'
                      }}>
                      <img
                        src={require('../../assets/img/erweima.png')}
                        style={{ width: '180px' }}
                      />
                    </div>
                  </Tabs.TabPane>
                </Tabs>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </Spin>
  )
}

export default Login
