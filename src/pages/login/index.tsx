import * as React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
// import { useLocation } from 'react-router-dom'
import {
  Avatar,
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

  // CardActions,
  // CircularProgress
} from 'antd'
import SandBox from '../../assets/img/avatar.png'
import XinDong from '../../assets/img/xindong.jpg'
import CaiXuKun from '../../assets/img/caixunkun.png'

// import AcQrcode from 'ac-qrcodes'

// import LockIcon from '@mui/icons-material/Lock'
// import {
//   Form,
//   required,
//   TextInput,
//   useTranslate,
//   useLogin,
//   useNotify
// } from 'react-admin'

// import Box from '@mui/material/Box'
import './index.scss'
import { fetchToken } from '@/services'

interface FormValues {
  username?: string
  password?: string
}

const prefix = 'login-page'
const contentStyle: React.CSSProperties = {
  // height: '70vh',
  // color: '#fff',
  // // lineHeight: '100%',
  // textAlign: 'center',
  // background: '#364d79'
}
const CarouselContent = [
  {
    img: SandBox,
    title: '麒麟',
    description: '窗口多开,用了都说好'
  },
  {
    img: XinDong,
    title: '素质扩展器',
    description: '平台组素质天花板，'
  },
  {
    img: CaiXuKun,
    title: '走地鸡',
    description: '不要久坐，记得运动'
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
            <div style={{ height: '30vh' }} />
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
