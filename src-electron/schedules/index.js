import api from 'src-electron/api'
import logger from 'src-electron/logger'
import defaultValue from 'src-electron/defaultVal'

let schedules = []

const fnUpdateSchedule = (obj) => {
  if (defaultValue.mode === 'main') {
    if (obj.main) {
      schedules = obj.main
    }
  } else {
    if (obj.backup) {
      schedules = obj.backup
    }
  }
}

const fnGetAddr = (addr) => {
  return {
    main: `${defaultValue.mainServer}/${addr}`,
    backup: `${defaultValue.backupServer}/${addr}`
  }
}

export { schedules, fnUpdateSchedule, fnGetAddr }
