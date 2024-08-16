import logger from 'src-electron/logger'
import { BrowserWindow as bw } from 'electron'
let schedules = []

const fnUpdateSchedule = (arr) => {
  try {
    schedules = arr
    bw.fromId(1).webContents.send('schedules', schedules)
  } catch (error) {
    logger.error('fnUpdateSchedule', error)
  }
}

export { schedules, fnUpdateSchedule }
