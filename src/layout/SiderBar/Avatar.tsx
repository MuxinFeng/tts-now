import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useState } from 'react';
import { Menu, Dropdown } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import useAppSetting from '@/hook/appHook';
import { voiceTypeList } from '@/config';

const Wrapper = styled.div`
  width: 100%;
  margin: 20px auto;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
`;

const VoiceSelectComponent = (props: any) => {
  const { voiceIndex, voiceSetCallBack } = props;
  return (
    <Menu
      onClick={voiceSetCallBack}
      css={{
        maxHeight: 'calc(100vh - 280px)',
        overflowY: 'auto',
        overflowX: 'hidden',
        borderSize: 'border-box',
        borderRadius: '5px',
        border: '1px solid #eee'
      }}
      selectedKeys={[voiceIndex.toString()]}
    >
      {voiceTypeList.map((voiceType, index) => (
        <Menu.Item
          key={index.toString()}
          css={{ borderBottom: '1px solid #eee' }}
          icon={(
            <img
              src={voiceType.img}
              css={{ height: '30px', width: 'auto' }}
            />
            )}
        >
          {voiceType.speaker}
          ，
          {voiceType.speechType}
        </Menu.Item>
      ))}
    </Menu>
  );
};

const Index = () => {
  const { appSetting, setAppSetting } = useAppSetting();
  const [menuShow, setMenuShow] = useState<boolean>(false);

  const changeVoice = ({ key: voiceSetIndex }) => {
    setAppSetting({ voiceSetIndex });
  };

  return (
    <>
      <Dropdown
        onVisibleChange={(show) => {
          setMenuShow(show);
        }}
        overlay={(
          <VoiceSelectComponent
            voiceIndex={appSetting.voiceSetIndex}
            voiceSetCallBack={changeVoice}
          />
        )}
        arrow
        trigger={['hover']}
      >
        <Wrapper>
          <img
            css={{
              width: '80px',
              height: 'auto',
              marginRight: '20px'
            }}
            src={voiceTypeList[appSetting.voiceSetIndex].img}
          />
          <div>
            <div
              css={css`
                margin: 5px 0 0 0;
                width: 130px;
                font-size: 13.5px;
                color: #000;
              `}
            >
              {voiceTypeList[appSetting.voiceSetIndex].speaker}
            </div>
            <div
              css={css`
                font-size: 13px;
                margin-top: 5px;
                color: #666;
              `}
            >
              {voiceTypeList[appSetting.voiceSetIndex].speechType}
            </div>
          </div>
          <div>{!menuShow ? <CaretDownOutlined /> : <CaretUpOutlined />}</div>
        </Wrapper>
      </Dropdown>
    </>
  );
};

export default Index;
