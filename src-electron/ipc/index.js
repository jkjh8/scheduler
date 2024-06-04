import { BrowserWindow as bw, ipcMain } from 'electron'
import defaultValue from '../defaultVal'
import logger from '../logger'
import db from '../db'
import { fnGetSchedule } from '../api/schedule'

const fnRt = (channel, obj) => {
  try {
    bw.fromId(1).webContents.send(channel, obj)
  } catch (error) {
    logger.error(`IPC RT Error ${error}`)
  }
}

const fnSetIpcMain = () => {
  ipcMain.on('ui:open', () => {
    console.log(defaultValue)
    fnRt('settings', defaultValue)
    logger.info('UI Opened')
  })

  ipcMain.on('active', (e, value) => {
    db.update({ key: 'active' }, { $set: { value } }, { upsert: true })
    defaultValue.active = value
    logger.info(`Active update ${value}`)
  })

  ipcMain.on('schedule:refresh', async () => {
    await fnGetSchedule()
  })
}

export { fnSetIpcMain, fnRt }
