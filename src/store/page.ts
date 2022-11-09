import { makeAutoObservable } from 'mobx'

export enum PageEnum {
  qilin = 'qilin',
  browser = 'browser',
  notice = 'notice',
  toolbox = 'toolbox',
  calendar = 'calendar',
  chat = 'chat',
  marvel = 'marvel'
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
