import { BrowserWindow as bw } from 'electron'
import logger from 'src-electron/logger'
import defaultValue from 'src-electron/defaultVal'
import {
  fnGetScheduleToday,
  fnCheckBackupServer,
  fnCheckMainServer
} from './server'

let intervalHB = null
let intervalSchedules = null

const fnRt = (channel, obj) => {
  try {
    bw.fromId(1).webContents.send(channel, obj)
  } catch (error) {
    logger.error(`IPC RT Error ${error}`)
  }
}

const fnRtSettings = () => {
  fnRt('settings', defaultValue)
}

const fnSchedulesInterval = () => {
  fnGetScheduleToday()
  intervalSchedules = setInterval(() => {
    fnGetScheduleToday()
  }, 1000 * 60 * 5.5)
  logger.info('Schedules Interval Started')
}

const fnHartBeat = () => {
  fnCheckMainServer()
  fnCheckBackupServer()
  intervalHB = setInterval(() => {
    fnCheckMainServer()
    fnCheckBackupServer()
  }, 1000 * 60)
  logger.info('HartBeat Started')
}

export { fnRt, fnRtSettings, fnHartBeat, fnSchedulesInterval }
