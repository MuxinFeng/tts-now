import styled from '@emotion/styled'
import { Layout } from 'antd'
import AppMain from './AppMain'
import SiderBar from './SiderBar'
import './index.scss'

import { CheckUpdateDialog } from '../layout/Dialog'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`
const { Header, Content, Footer, Sider } = Layout

const Index = () => (
  // <Wrapper>
  //   <SiderBar />
  //   <AppMain />
  //   <CheckUpdateDialog />
  // </Wrapper>
  <Layout>
    <Header
      style={{
        height: '48px',
        backgroundColor: '#001529',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <span style={{ color: 'white', fontSize: '16px' }}>
        五个火枪手(ノ｀Д)ノ出品 🔫
      </span>
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

export default Index
