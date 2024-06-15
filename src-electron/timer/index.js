import moment from 'moment'
import logger from '../logger'
import { schedules } from '../schedules'
import { fnRt } from '../ipc'
import { fnSendSockets } from '../socket'

moment.locale('ko')
let mainInterval = null
let time

const fnTimer = () => {
  mainInterval = setInterval(() => {
    // Do something here
    try {
      const t = moment()
      time = {
        full: moment(t).format('YYYY-MM-DD hh:mm:ss A dddd'),
        time: moment(t).format('HH:mm:ss'),
        date: moment(t).format('YYYY-MM-DD'),
        schedule: moment(t).add(1, 'm').format('HH:mm'),
        day: moment(t).format('dddd'),
        hour: moment(t).format('HH'),
        min: moment(t).format('mm'),
        sec: moment(t).format('ss')
      }
      fnCheckSchedule(time)
      fnRt('timer', time)
    } catch (error) {
      logger.error('Timer Error:', error)
    }
  }, 1000)
  logger.info('Timer Started')
}

const fnCheckSchedule = (time) => {
  // Do something here
  if (time.sec === '58') {
    logger.info(`Time: ${time}`)
    schedules.forEach((schedule) => {
      if (schedule.time === time.schedule) {
        logger.info('Schedule Time:', time.schedule)
        fnSendSockets('inTime', schedule)
        // Do something here
      }
    })
    // Do something here
  }
}
export { fnTimer }
