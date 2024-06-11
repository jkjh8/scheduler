import { ipcMain } from 'electron'
import defaultValue from 'src-electron/defaultVal'
import logger from 'src-electron/logger'
import db from 'src-electron/db'
import { fnRt } from '../index'
import { fnGetMainServerToken, fnGetBackupServerToken } from 'src-electron/api'

export default function apis() {
  ipcMain.on('api:tokens', async () => {
    if (defaultValue.mainServer) {
      await fnGetMainServerToken()
    }
    if (defaultValue.backupServer) {
      await fnGetBackupServerToken()
    }
  })
}
