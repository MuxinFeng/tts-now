/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-closing-bracket-location */
import { InboxOutlined } from '@ant-design/icons'
import { Image, Skeleton, Upload, UploadProps, message } from 'antd'
import React, { useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import dongge from './dongge.png'
import './index.scss'

const { Dragger } = Upload
const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files)
  }
}

const Marvel = () => {
  const [active, setActive] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  // useEffect(() => {
  //   ipcRenderer.send('add_marvel', 'https://www.remove.bg/zh/upload')
  // }, [])

  const onChange = (info) => {
    const { status } = info.file
    console.log(info.file, info.fileList)

    if (status === 'uploading') {
      setActive(true)
    }
    if (status === 'done') {
      setActive(false)
      setSuccess(true)
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      setActive(false)
      setSuccess(true)
      message.success(`${info.file.name} file upload successfully.`)
    }
  }

  return (
    <div className="marvel">
      <Dragger {...props} onChange={onChange}>
        {active ? (
          <Skeleton.Image active={active} />
        ) : (
          <>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </>
        )}
      </Dragger>
      {!active && success ? <Image src={dongge} preview={false} /> : null}
    </div>
  )
}

export default Marvel
