import defaultValue from '../../defaultVal'
import { io } from 'socket.io-client'
import logger from '../../logger'
import { fnRt } from '../../ipc'
import { schedules, fnUpdateSchedule } from 'src-electron/schedules'
import db from '../../db'

export const fnConnectSocket = (type) => {
  // Create a socket variable
  let socket

  // Check the type of socket connection
  socket = io(`https://${defaultValue[type + 'Server']}/scheduler`, {
    autoConnect: true,
    transports: ['websocket'],
    rejectUnauthorized: false,
    extraHeaders: {
      type: defaultValue.mode
    }
  })

  // socket event listeners
  socket.on('connect', () => {
    defaultValue[type + 'Status'] = true
    if (type === 'main') {
      socket.emit('schedule:setup')
    }
    fnRt('settings', defaultValue)
    logger.info(`${type} Server Connected`)
  })
  socket.on('disconnect', () => {
    defaultValue[type + 'Status'] = false
    fnRt('settings', defaultValue)
    logger.info(`${type} Server Disconnected`)
  })
  socket.on('reconnect', () => {
    logger.info(`${type} Server Reconnected`)
  })
  socket.on('reconnect_attempt', () => {
    logger.info(`${type} Server Reconnect Attempt`)
  })
  socket.on('reconnect_failed', () => {
    logger.info(`${type} Server Reconnect Failed`)
  })
  socket.on('reconnect_error', (error) => {
    logger.info(`${type} Server Reconnect Error`, error)
  })
  socket.on('connect_error', (error) => {
    logger.info(`${type} Server Connect Error`, error)
  })
  socket.on('connect_timeout', () => {
    logger.info(`${type} Server Connect Timeout`)
  })
  socket.on('error', (error) => {
    logger.info(`${type} Server Error`, error)
  })
  // custom socket event listeners
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
      fnRt('settings', defaultValue)
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
  // return the socket
  return socket
}
