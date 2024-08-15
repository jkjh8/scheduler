import logger from 'src-electron/logger'
let schedules = []

const fnUpdateSchedule = (arr) => {
  try {
    schedules = arr
  } catch (error) {
    logger.error('fnUpdateSchedule', error)
  }
}

export { schedules, fnUpdateSchedule }
