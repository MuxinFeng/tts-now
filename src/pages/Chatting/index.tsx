/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react'
import '@chatui/core/es/styles/index.less'
import Chat, { Bubble, useMessages } from '@chatui/core'
import '@chatui/core/dist/index.css'
import dongge from './dongge.jpeg'

import './index.scss'

// 默认快捷短语，可选
const defaultQuickReplies = [
  {
    icon: 'message',
    name: '联系人工服务',
    isNew: true,
    isHighlight: true
  },
  {
    name: '短语1',
    isNew: true
  },
  {
    name: '短语2',
    isHighlight: true
  },
  {
    name: '短语3'
  }
]

const initialMessages = [
  {
    type: 'text',
    content: { text: '在呢，我是你的智能助理，你的贴心小助手~' },
    user: {
      avatar: dongge
    }
  }
]

const Chatting = () => {
  const { messages, appendMsg, setTyping } = useMessages(initialMessages)

  // 发送回调
  function handleSend(type, val) {
    if (type === 'text' && val.trim()) {
      // TODO: 发送请求
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right'
      })

      setTyping(true)

      // 模拟回复消息
      setTimeout(() => {
        appendMsg({
          type: 'text',
          content: {
            text: '在的宝贝~'
          },
          user: {
            avatar: dongge
          }
        })
      }, 1000)
    }
  }
  function renderMessageContent(msg) {
    const { content } = msg
    return <Bubble content={content.text} />
  }

  // 快捷短语回调，可根据 item 数据做出不同的操作，这里以发送文本消息为例
  function handleQuickReplyClick(item) {
    handleSend('text', item.name)
  }

  return (
    <div
      style={{
        display: 'inline-flex'
      }}>
      <Chat
        navbar={{ title: '嘟嘟' }}
        messages={messages}
        renderMessageContent={renderMessageContent}
        onSend={handleSend}
        quickReplies={defaultQuickReplies}
        onQuickReplyClick={handleQuickReplyClick}
      />
    </div>
  )
}

export default Chatting
