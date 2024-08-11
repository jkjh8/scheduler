import logger from 'src-electron/logger'
import { fnRt } from 'src-electron/api'
import { fnUpdateSchedule } from 'src-electron/schedules'

const fnMulticastParser = (key, value) => {
  switch (key) {
    case 'schedules':
      fnUpdateSchedule(value)
      fnRt('schedules', value)
      break
    default:
      logger.warn(`Unknown key: ${key}`)
  }
}

export { fnMulticastParser }
