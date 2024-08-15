import { BrowserWindow as bw, ipcMain } from 'electron'
import logger from 'src-electron/logger'
import { schedules } from 'src-electron/schedules'
import { fnGetScheduleToday, fnPutActiveMode } from 'src-electron/api/server'
import ipcSettings from './settings'
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

  // schedule refresh
  ipcMain.on('schedule:refresh', async () => {
    fnGetScheduleToday()
  })

  // handle ipcMain async
  ipcMain.handle('schedules', async (event) => {
    return schedules
  })

  // active mode
  ipcMain.on('active:mode', async (event, mode) => {
    fnPutActiveMode(mode)
    // fnSendSocketsAll('active:mode', mode)
  })
}

export { fnSetIpcMain, fnRt }
