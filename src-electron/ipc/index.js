import { BrowserWindow as bw, ipcMain } from 'electron'
import defaultValue from 'src-electron/defaultVal'
import logger from 'src-electron/logger'
import db from 'src-electron/db'
import { fnGetMainServerToken } from 'src-electron/api'
import { fnSendSockets } from 'src-electron/socket'
import { schedules } from 'src-electron/schedules'

import ipcSettings from './settings'
import ipcApis from './api'
import ipcOnStart from './onStart'

const fnRt = (channel, obj) => {
  try {
    bw.fromId(1).webContents.send(channel, obj)
  } catch (error) {
    logger.error(`IPC RT Error ${error}`)
  }
}

const fnSetIpcMain = () => {
  ipcOnStart()
  ipcSettings()
  ipcApis()

  ipcMain.on('api:main:token', async () => {
    const token = await fnGetMainServerToken()
  })

  // schedule refresh
  ipcMain.on('schedule:refresh', async () => {
    console.log('refres')
    fnSendSockets('schedule:refresh')
  })

  // handle ipcMain async
  ipcMain.handle('schedules', async (event) => {
    return schedules
  })
}

export { fnSetIpcMain, fnRt }
