import { makeAutoObservable } from 'mobx'

export enum PageEnum {
  qilin = 'qilin',
  browser = 'browser',
  notice = 'notice',
  calendar = 'calendar',
  chat = 'chat',
  marvel = 'marvel',
  mindMap = 'mindMap',
  todoList = 'todoList'
}

class Page {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  currentPage: PageEnum = PageEnum.qilin

  // eslint-disable-next-line no-return-assign
  setCurrentPage = (checked: PageEnum) => (this.currentPage = checked)
}

export default new Page()
