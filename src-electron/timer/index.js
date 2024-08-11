import moment from 'moment'
import logger from '../logger'
import defaultValue from '../defaultVal'
import { schedules } from '../schedules'
import { fnRt } from '../ipc'
import { fnInTime, fnClean } from '../api/server'

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
      // 타이머 정보 전달
      fnRt('timer', time)
      // active가 true일 때만 실행
      if (defaultValue.active) {
        // 매시간 정각에 이벤트 발생
        if (time.min === '00' && time.sec === '00') {
          // 00:00:00일 때 스케줄 폴더 및 큐시스 스케줄 폴더 초기화
          if (time.hour === '00') {
            fnClean()
          }
        }
        fnCheckSchedule(time)
      }
    } catch (error) {
      logger.error('Timer Error:', error)
    }
  }, 1000)
  logger.info('Timer Started')
}

const fnCheckSchedule = (time) => {
  if (time.sec == 60 - Number(defaultValue.relayOnTime)) {
    schedules.forEach((schedule) => {
      if (schedule.time === time.schedule) {
        logger.info(`schedule in time ${schedule.name}, ${schedule.idx}`)
        fnInTime(schedule)
      }
    })
  }
}

export { fnTimer }
