/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useRef } from 'react'
import './index.scss'

const MindMap = () => (
  <div className="mind-map-container" style={{ width: '100%', height: '100%' }}>
    <iframe
      style={{
        width: '100%', height: '100%', border: '0', padding: '0'
      }}
      src="https://c.runoob.com/more/kitymind/index.html"
    />
    <div className="title">五个火枪手思维导图</div>
  </div>
)

export default MindMap
