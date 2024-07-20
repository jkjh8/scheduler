import { app, Menu, Tray, nativeImage, BrowserWindow as bw } from 'electron'
import path from 'path'
const isMac = process.platform === 'darwin'
const img_path = process.env.DEV ? 'public' : process.resourcesPath

const img_logo = nativeImage.createFromPath(path.join(img_path, 'LogoMain.png'))

const template = [
  // { role: 'appMenu' }
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideOthers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
          ]
        }
      ]
    : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      // {
      //   label: 'Open',
      //   accelerator: 'CommandOrControl+o',
      //   click: async () => await openFileDialog()
      // },
      // { type: 'separator' },
      {
        label: 'Quit',
        accelerator: 'CommandOrControl+f4',
        click: () => {
          app.quit()
        }
      }
    ]
  }
  // { role: 'editMenu' }
  // {
  //   label: 'Edit',
  //   submenu: [
  //     { role: 'undo' },
  //     { role: 'redo' },
  //     { type: 'separator' },
  //     { role: 'cut' },
  //     { role: 'copy' },
  //     { role: 'paste' },
  //     ...(isMac
  //       ? [
  //           { role: 'pasteAndMatchStyle' },
  //           { role: 'delete' },
  //           { role: 'selectAll' },
  //           { type: 'separator' },
  //           {
  //             label: 'Speech',
  //             submenu: [{ role: 'startSpeaking' }, { role: 'stopSpeaking' }]
  //           }
  //         ]
  //       : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }])
  //   ]
  // },
  // { role: 'viewMenu' }
  // {
  //   label: 'View',
  //   submenu: [
  //     // { role: 'reload' },
  //     // { role: 'forceReload' },
  //     // { role: 'toggleDevTools' },
  //     // { type: 'separator' },
  //     // { role: 'resetZoom' },
  //     // { role: 'zoomIn' },
  //     // { role: 'zoomOut' },
  //     // { type: 'separator' },
  //     { role: 'togglefullscreen' }
  //   ]
  // },
  // // { role: 'windowMenu' }
  // {
  //   label: 'Window',
  //   submenu: [
  //     { role: 'minimize' },
  //     { role: 'zoom' },
  //     ...(isMac
  //       ? [
  //           { type: 'separator' },
  //           { role: 'front' },
  //           { type: 'separator' },
  //           { role: 'window' }
  //         ]
  //       : [{ role: 'close' }])
  //   ]
  // },
  // {
  //   role: 'help',
  //   submenu: [
  //     {
  //       label: 'About',
  //       accelerator: 'F1',
  //       click: () => {
  //         bw.fromId(1).webContents.send('help', { command: 'help' })
  //       }
  //     }
  //     // {
  //     //   label: 'Learn More',
  //     //   click: async () => {
  //     //     const { shell } = require('electron')
  //     //     await shell.openExternal('https://electronjs.org')
  //     //   }
  //     // }
  //   ]
  // }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

const trayMenu = Menu.buildFromTemplate([
  {
    label: '열기',
    type: 'normal',
    click: () => {
      bw.fromId(1).show()
    }
  },
  {
    label: '트레이 아이콘으로 최소화하기',
    type: 'normal',
    accelerator: 'CommandOrControl+m',
    click: () => {
      bw.fromId(1).hide()
    }
  },
  {
    label: '종료',
    accelerator: 'CommandOrControl+f4',
    click: () => {
      app.quit()
    }
  }
])

const tray = new Tray(img_logo.resize({ width: 16, height: 16 }))
tray.setToolTip('KHNP Scheduler')
tray.setContextMenu(trayMenu)
tray.on('click', () => {
  if (bw.fromId(1).isVisible()) {
    bw.fromId(1).hide()
  } else {
    bw.fromId(1).show()
  }
})
