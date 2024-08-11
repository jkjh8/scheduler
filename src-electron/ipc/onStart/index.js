import { ipcMain } from 'electron'
import defaultValue from 'src-electron/defaultVal'
import logger from 'src-electron/logger'

import { fnInitMulticast } from 'src-electron/multicast'
import { fnRt, fnHartBeat, fnSchedulesInterval } from 'src-electron/api'
import { fnTimer } from 'app/src-electron/timer'

export default function settings() {
  ipcMain.on('ui:open', () => {
    try {
      fnInitMulticast()
      fnTimer()
      fnHartBeat()
      fnSchedulesInterval()
      fnRt('settings', defaultValue)
      logger.info('UI Opened')
    } catch (error) {
      logger.error(`UI Open Error ${error}`)
    }
  })
}
