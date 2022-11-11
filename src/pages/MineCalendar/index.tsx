/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable object-curly-newline */
import {
  Badge,
  Calendar,
  BadgeProps,
  Button,
  Input,
  message,
  DatePicker,
  TimePicker
} from 'antd'
import moment from 'moment'
import type { Moment } from 'moment'
import { useEffect, useState, useReducer } from 'react'
import './index.scss'

const normalFormat = 'YYYY-MM-DD'
const onlyTime = 'HH:mm'
interface SelectDate {
  date?: any
  time?: any
  type?: any
  content?: any
}
const MineCalendar = () => {
  // eslint-disable-next-line prefer-destructuring
  const forceUpdate = useReducer((bool) => !bool, false)[1]

  const [selectDate, setSelectDate] = useState<SelectDate>({})
  const [input, setInput] = useState<any>()
  const [scheduleList, setScheduleList] = useState<SelectDate[]>([])

  const getMonthData = (value: Moment) => (value.month() === 8 ? 1394 : 2022)

  const monthCellRender = (value: Moment) => {
    const num = getMonthData(value)
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Learning Browser and Javascript V8</span>
      </div>
    ) : null
  }

  const dateCellRender = (value: Moment) => {
    const listData = scheduleList?.filter(
      (item) => item.date === value.format(normalFormat)
    )
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.time}>
            <Badge
              status={item.type as BadgeProps['status']}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    )
  }

  const addSchedule = () => {
    if (!input || !selectDate.date) {
      message.warning('请选择日期，并且输入日程内容')
      return
    }

    const myNotification = new Notification(`新建日程 ${selectDate.date}`, {
      body: `${selectDate.time || selectDate.date}：${input}`
    })

    myNotification.onclick = () => {
      console.log('通知被点击后触发')
    }
    setScheduleList(
      scheduleList?.concat({
        type: 'warning',
        content: input,
        date: selectDate.date,
        time: selectDate.time
      })
    )
    forceUpdate()
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '80%',
          margin: '0 0 20px'
        }}>
        <Button type="primary" onClick={addSchedule}>
          新建日程
        </Button>
        <Input
          style={{ width: '100%' }}
          placeholder={`请输入，加入${
            selectDate.date ? `${selectDate.date} ${selectDate.time || ''}` : ''
          }日程`}
          onChange={(e) => setInput(e.target.value)}
        />
        <TimePicker
          format="HH:mm"
          style={{ width: '20%' }}
          onChange={(time) =>
            setSelectDate({
              ...selectDate,
              time: time ? moment(time).format(onlyTime) : ''
            })
          }
        />
      </div>

      <Calendar
        className="diy-calendar"
        monthCellRender={monthCellRender}
        dateCellRender={dateCellRender}
        onSelect={(e) => {
          setSelectDate({
            ...selectDate,
            date: moment(e).format(normalFormat)
          })
        }}
      />
    </>
  )
}
export default MineCalendar
