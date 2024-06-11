import { ipcMain } from 'electron'
import defaultValue from 'src-electron/defaultVal'
import logger from 'src-electron/logger'
import db from 'src-electron/db'
import { fnRt } from 'src-electron/ipc'
import { fnConnectSockets } from 'app/src-electron/socket'

export default function settings() {
  ipcMain.on('ui:open', () => {
    fnConnectSockets()
    fnRt('settings', defaultValue)
    logger.info('UI Opened')
  })
}
