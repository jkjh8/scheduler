import defaultValue from 'src-electron/defaultVal'
import logger from 'src-electron/logger'
import db from 'src-electron/db'

import { fnRt } from 'src-electron/ipc'
import { schedules, fnUpdateSchedule } from 'src-electron/schedules'

export default function (socket, type) {
  socket.on('today', (data) => {
    if (type === 'main') {
      fnUpdateSchedule({ main: data })
    } else {
      fnUpdateSchedule({ backup: data })
    }
    fnRt('schedules', schedules)
  })

  socket.on('active', (mode) => {
    try {
      db.update(
        { key: 'active' },
        { $set: { value: defaultValue.mode === mode } },
        { upsert: true }
      )
      defaultValue.active = defaultValue.mode === mode
      defaultValue.activeMode = mode
      fnRt('settings', defaultValue)
      fnRt('active:mode', mode)
    } catch (error) {
      logger.error(`Active update ${error}`)
    }
  })

  socket.on('auto', (auto) => {
    try {
      db.update({ key: 'auto' }, { $set: { value: auto } }, { upsert: true })
      defaultValue.auto = auto
      fnRt('settings', defaultValue)
    } catch (error) {
      logger.error(`Auto update ${error}`)
    }
  })

  socket.on('schedule:setup', (data) => {
    if (defaultValue.update) {
      fnRt('setup:update')
      const { active, auto } = data
      db.update(
        { key: 'activeMode' },
        { $set: { value: active } },
        { upsert: true }
      )
      defaultValue.activeMode = active
      if (active === 'main' && defaultValue.mode === 'main') {
        if (defaultValue.active === false) {
          defaultValue.active = true
        }
      } else {
        defaultValue.active = false
      }
      defaultValue.auto = auto

      fnRt('settings', defaultValue)
    }
  })

  socket.on('relayOnTime', (time) => {
    try {
      db.update(
        { key: 'relayOnTime' },
        { $set: { value: time } },
        { upsert: true }
      )
      defaultValue.relayOnTime = time
      fnRt('settings', defaultValue)
      logger.info(`Relay on time update ${time}`)
    } catch (error) {
      logger.error(`Relay on time update ${error}`)
    }
  })
}
