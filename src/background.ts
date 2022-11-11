/* eslint-disable indent */
/* eslint-disable operator-linebreak */
import {
  app,
  protocol,
  BrowserWindow,
  BrowserView,
  ipcMain,
  Menu,
  dialog,
  shell,
  session
} from 'electron'

import { nanoid } from 'nanoid'

const Store = require('electron-store')

const PackgeInfo = require('../package.json')

const config = require('../app.config')

let win: BrowserWindow
let currView: BrowserView
let qilinView: BrowserView

const viewPosition = {
  x: 208, y: 54, width: 0, height: 0
}

const viewList: BrowserView[] = []
const isDevelopment = process.env.NODE_ENV === 'development'
const isMac = process.platform === 'darwin'

Store.initRenderer()

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

/**
 * 禁止刷新和调试
 */
function stopKey(_win: BrowserWindow) {
  const KEY_BLACK_LIST = ['I', 'R']
  const FKEY_BLACK_LIST = ['F5', 'F12']
  _win.webContents.on('before-input-event', (event, input) => {
    console.log('before-input-event', input)
    // input.control 为windows CTRL；input.meta 为mac Ctrl键
    // 以下条件为禁止组合键和F键 刷新和调试
    if (
      ((input.control || input.meta) &&
        KEY_BLACK_LIST.includes(input.key.toUpperCase())) ||
      FKEY_BLACK_LIST.includes(input.key.toUpperCase())
    ) {
      event.preventDefault()
    }
  })
}

function registerLocalResourceProtocol() {
  protocol.registerFileProtocol('local-resource', (request, callback): void => {
    const url = request.url.replace(/^local-resource:\/\//, '')
    // Decode URL to prevent errors when loading filenames with UTF-8 chars or chars like "#"
    const decodedUrl = decodeURI(url) // Needed in case URL contains spaces
    try {
      callback(decodedUrl)
    } catch (error) {
      console.error(
        'ERROR: registerLocalResourceProtocol: Could not get file path:',
        error
      )
    }
  })
}

function createWindow() {
  // https://www.electronjs.org/zh/docs/latest/api/browser-window
  win = new BrowserWindow({
    title: PackgeInfo.name,
    show: isDevelopment,
    width: 1024,
    height: 745,
    minHeight: 745,
    minWidth: 1024,
    fullscreenable: isDevelopment,
    maximizable: true,
    movable: true,
    titleBarStyle: 'hiddenInset', // 无边框
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration:
        (process.env.ELECTRON_NODE_INTEGRATION || 'true').toUpperCase() ===
        'TRUE',
      contextIsolation: false,
      webSecurity: false
    }
  })

  // 禁止页面不可见时停止计时器。防止setTimeout问题
  win.webContents.setBackgroundThrottling(false)
  if (isDevelopment) {
    win.loadURL(`http://${config.devServer.host}:${config.devServer.port}`)
    win.resizable = true
    win.webContents.openDevTools({ mode: 'detach' })
  } else {
    // Load the index.html when not in development
    win.loadURL(`file://${__dirname}/index.html`)

    stopKey(win)

    win.on('ready-to-show', () => {
      win.show()
    })
  }
  // 添加变更窗口方法
  win.on('will-resize', (_event, bound) => {
    const { width, height } = bound
    viewPosition.width = width - 20
    viewPosition.height = height - 70
    if (currView) {
      currView.setBounds(viewPosition)
    }
  })
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', () => {
  createWindow()

  // 注册自定义协议
  registerLocalResourceProtocol()

  console.log('app temp path:', app.getPath('temp'))

  // 选择要转换的文件或其他选择
  ipcMain.on('select_files', (event, arg) => {
    console.log(event, arg)

    // https://www.electronjs.org/docs/latest/api/dialog
    dialog
      .showOpenDialog(win, {
        title: '选择文件',
        buttonLabel: '确定',
        properties: ['openFile', 'multiSelections'],
        filters: [{ name: '文件', extensions: ['txt', 'text'] }],
        ...(arg.config || {})
      })
      .then((_rlt) => {
        console.log(_rlt)
        event.reply('selected_files', {
          data: _rlt,
          action: arg.action
        })
      })
  })

  // 设置麒麟 cookie
  ipcMain.on('window-set-cookie', (_event, value) => {
    const cookie = { url: 'https://qilin.zaihuiba.com/', name: 'pigeon', value }
    session.defaultSession.cookies.set(cookie)
  })

  // 加载麒麟页面
  ipcMain.on('open-qilin-view', (_event, position) => {
    const bound = win.getBounds()
    if (qilinView) {
      win.setTopBrowserView(qilinView)
    } else {
      const view = new BrowserView()
      win.addBrowserView(view)
      qilinView = view
      qilinView.webContents.loadURL('https://qilin.zaihuiba.com/')
    }
    position.width = bound.width - position.x - 20
    position.height = bound.height - position.y - 70
    qilinView.setBounds(position)
    qilinView.setAutoResize({
      height: true,
      horizontal: true
    })
    currView = qilinView
  })

  ipcMain.on('open-external', (_event, arg) => {
    shell.openExternal(arg)
  })

  ipcMain.on('getpath', (_event, arg) => {
    console.log(_event, arg)
    _event.reply('getpath', {
      path: app.getPath(
        arg.pathName as
        | 'home'
        | 'appData'
        | 'userData'
        | 'sessionData'
        | 'temp'
        | 'exe'
        | 'module'
        | 'desktop'
        | 'documents'
        | 'downloads'
        | 'music'
        | 'pictures'
        | 'videos'
        | 'recent'
        | 'logs'
        | 'crashDumps'
      ),
      arg
    })
  })

  ipcMain.on('open-close-dialog', (_event, _arg) => {
    dialog
      .showMessageBox(win, {
        type: 'info',
        title: '提示',
        message: '是否关闭应用程序？',
        buttons: ['取消', '关闭']
      })
      .then((res) => {
        if (res.response === 1) {
          app.exit()
        }
      })
      .catch((error) => {
        console.log(error)
      })
  })
  // 创建无痕窗口方法
  ipcMain.on('add_traceless_view', (_event, url) => {
    console.log(url)
    const view = new BrowserView({
      webPreferences: {
        // partition 项设置唯一值使不同的页面使用不同的 session
        partition: nanoid()
      }
    })
    win.addBrowserView(view)
    view.setBounds(viewPosition)
    view.setAutoResize({
      width: true,
      height: true,
      horizontal: true,
      vertical: true
    })
    view.webContents.loadURL(url)
    viewList.push(view)
    currView = view
  })
  // 切换无痕窗口方法
  ipcMain.on('switch_traceless_view', (_event, index) => {
    win.setTopBrowserView(viewList[index])
  })
  // 删除无痕窗口方法
  ipcMain.on('delete_traceless_view', (_event, index) => {
    win.removeBrowserView(viewList[index])
    viewList.splice(index, 1)
  })
  // 隐藏无痕窗口方法
  ipcMain.on('hidden_traceless_view', (_event) => {
    currView.setBounds({
      x: 0, y: 0, width: 0, height: 0
    })
  })
  ipcMain.on('handle_view_position', (_event, position) => {
    const bound = win.getBounds()
    viewPosition.x = position.x
    viewPosition.y = position.y

    viewPosition.width = bound.width - position.x - 20
    viewPosition.height = bound.height - position.y - 40
  })
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

app.on('second-instance', () => {
  if (win) {
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

const menuTemplate: any = [
  ...(isMac
    ? [
      {
        label: app.name,
        submenu: [
          { role: 'about', label: '关于' },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide', label: '隐藏' },
          { role: 'hideOthers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit', label: '退出' }
        ]
      }
    ]
    : [
      {
        label: config.appName,
        submenu: [
          {
            label: '退出',
            click: () => {
              app.quit()
            }
          }
        ]
      }
    ]),
  {
    label: '编辑',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac
        ? [
          { role: 'pasteAndMatchStyle' },
          { role: 'delete' },
          { role: 'selectAll' },
          { type: 'separator' },
          {
            label: 'Speech',
            submenu: [{ role: 'startSpeaking' }, { role: 'stopSpeaking' }]
          }
        ]
        : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }])
    ]
  },
  {
    label: '帮助',
    role: 'help',
    submenu: [
      {
        label: 'SSML标记语言',
        click: async () => {
          await shell.openExternal(
            'https://help.aliyun.com/document_detail/101645.html'
          )
        }
      },
      {
        label: '帮助',
        click: async () => {
          await shell.openExternal('https://funnyzak.github.io/tts-now')
        }
      },
      {
        label: '检查更新',
        click: async () => {
          await shell.openExternal(
            'https://github.com/funnyzak/tts-now/releases/latest'
          )
        }
      }
    ]
  }
]
const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)
