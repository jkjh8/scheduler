import { ipcMain } from 'electron'
import defaultValue from 'src-electron/defaultVal'
import logger from 'src-electron/logger'
import db from 'src-electron/db'
// return to ipcRenderer
import { fnRt } from '../index'
// socket connect
import { fnSendSockets, fnSocketAddressChange } from 'src-electron/socket'

export default function settings() {
  // APP 동작
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
  // APP 모드
  ipcMain.on('settings:mode', (e, value) => {
    try {
      db.update({ key: 'mode' }, { $set: { value } }, { upsert: true })
      defaultValue.mode = value
      logger.info(`Mode update ${value}`)
    } catch (error) {
      logger.error(`Mode update ${error}`)
    } finally {
      fnRt('settings', defaultValue)
    }
  })
  // Auto Mode
  ipcMain.on('settings:auto', (e, value) => {
    try {
      db.update({ key: 'auto' }, { $set: { value } }, { upsert: true })
      defaultValue.auto = value
      logger.info(`Auto update ${value}`)
    } catch (error) {
      logger.error(`Auto update ${error}`)
    } finally {
      fnRt('settings', defaultValue)
    }
  })
  // update
  ipcMain.on('settings:update', (e, value) => {
    try {
      db.update({ key: 'update' }, { $set: { value } }, { upsert: true })
      defaultValue.update = value
      logger.info(`Update update ${value}`)
    } catch (error) {
      logger.error(`Update update ${error}`)
    } finally {
      fnRt('settings', defaultValue)
    }
  })
  // Change Main Server IP Address
  ipcMain.on('settings:main:ipaddress', async (e, value) => {
    try {
      db.update({ key: 'mainServer' }, { $set: { value } }, { upsert: true })
      defaultValue.mainServer = value
      logger.info(`Main Server IP Address update ${value}`)
      fnSocketAddressChange('main')
    } catch (error) {
      logger.error(`Main Server IP Address update ${error}`)
    } finally {
      fnRt('settings', defaultValue)
    }
  })
  // Change Backup Server IP Address
  ipcMain.on('settings:backup:ipaddress', async (e, value) => {
    try {
      db.update({ key: 'backupServer' }, { $set: { value } }, { upsert: true })
      defaultValue.backupServer = value
      logger.info(`Backup Server IP Address update ${value}`)
      fnSocketAddressChange('backup')
    } catch (error) {
      logger.error(`Backup Server IP Address update ${error}`)
    } finally {
      fnRt('settings', defaultValue)
    }
  })

  ipcMain.on('settings:relayOnTime', () => {
    console.log('relayOnTime')
    try {
      fnSendSockets('relayOnTime')
    } catch (error) {
      logger.error(`Relay On Time update ${error}`)
    }
  })
}
