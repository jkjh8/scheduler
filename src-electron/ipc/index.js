import { BrowserWindow as bw, ipcMain } from 'electron'
import defaultValue from '../defaultVal'

const fnRt = (channel, obj) => {
  try {
    bw.fromId(1).webContents.send(channel, obj)
  } catch (error) {
    logger.error(`IPC RT Error ${error}`)
  }
}

const fnSetIpcMain = () => {
  ipcMain.on('ui:open', () => {
    fnRt('settings', defaultValue)
  })
}

export { fnSetIpcMain, fnRt }
