import { ipcMain } from 'electron'
import defaultValue from 'src-electron/defaultVal'
import logger from 'src-electron/logger'

// import { fnInitMulticast } from 'src-electron/multicast'
import { connectIO } from 'src-electron/socket'
import { fnRt } from 'src-electron/api'
import { fnCheckMainServer, fnCheckBackupServer } from 'src-electron/api/server'
import { fnTimer } from 'app/src-electron/timer'

export default function settings() {
  ipcMain.on('ui:open', () => {
    try {
      // fnInitMulticast()
      connectIO()
      fnTimer()
      fnCheckMainServer()
      fnCheckBackupServer()
      fnRt('settings', defaultValue)
      logger.info('UI Opened')
    } catch (error) {
      logger.error(`UI Open Error ${error}`)
    }
  })
}
