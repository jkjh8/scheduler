import { BrowserWindow as bw, ipcMain } from 'electron'
import defaultValue from '../defaultVal'
import logger from '../logger'
import db from '../db'
import { fnGetSchedule } from '../schedules'

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
    logger.info('UI Opened')
  })

  ipcMain.on('settings:active', (e, value) => {
    try {
      db.update({ key: 'active' }, { $set: { value } }, { upsert: true })
      defaultValue.active = value
      logger.info(`Active update ${value}`)
    } catch (error) {
      logger.error(`Active update ${error}`)
    } finally {
      fnRt('settings', defaultValue)
    }
  })

  ipcMain.on('schedule:refresh', async () => {
    await fnGetSchedule()
  })

  ipcMain.on('settings:main:ipaddress', async (e, value) => {
    try {
      db.update({ key: 'mainServer' }, { $set: { value } }, { upsert: true })
      defaultValue.mainServer = value
      logger.info(`Main Server IP Address update ${value}`)
    } catch (error) {
      logger.error(`Main Server IP Address update ${error}`)
    } finally {
      fnRt('settings', defaultValue)
    }
  })

  ipcMain.on('settings:backup:ipaddress', async (e, value) => {
    try {
      db.update({ key: 'backupServer' }, { $set: { value } }, { upsert: true })
      defaultValue.backupServer = value
      logger.info(`Backup Server IP Address update ${value}`)
    } catch (error) {
      logger.error(`Backup Server IP Address update ${error}`)
    } finally {
      fnRt('settings', defaultValue)
    }
  })
}

export { fnSetIpcMain, fnRt }
