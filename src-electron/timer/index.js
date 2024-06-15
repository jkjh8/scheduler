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
      // 00:00:00일 때 스케줄 폴더 및 큐시스 스케줄 폴더 초기화
      if (time.time === '00:00:00') {
        fnClean()
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
  if (time.sec === '58') {
    schedules.forEach((schedule) => {
      if (schedule.time === time.schedule) {
        // 백업 로직 추가 필요
        logger.info(`schedule in time ${schedule.name}, ${schedule.idx}`)
        fnSendSockets('inTime', schedule)
      }
    })
  }
}

const fnClean = () => {
  fnSendSockets('clean', {})
}
export { fnTimer, fnClean }
