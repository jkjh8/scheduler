import defaultValue from 'src-electron/defaultVal'
import { io } from 'socket.io-client'
import logger from 'src-electron/logger'

import { fnRt } from 'src-electron/ipc'
import { schedules, fnUpdateSchedule } from 'src-electron/schedules'

import defaultListener from './default'
import customListener from './event'

let transferTimeout = null

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

  // default socket event listeners
  defaultListener(socket, type)

  // socket event listeners
  socket.on('connect', () => {
    // 연결
    defaultValue[type + 'Status'] = true
    // 메인 서버 연결시 세팅 받아오기
    if (type === 'main') {
      socket.emit('schedule:setup')
    }
    // 메인 연결시 자동 전환
    if (defaultValue.auto) {
      if (transferTimeout) {
        clearTimeout(transferTimeout)
        transferTimeout = null
      }
      fnRt('autoconnect')
      defaultValue.active =
        (defaultValue.mode === 'main' && type === 'main') ||
        (defaultValue.mode !== 'main' && type !== 'main')
    }
    // 프론트엔드에 세팅 전달
    fnRt('settings', defaultValue)
    fnRt('connect', { type })
    // 로그
    logger.info(`${type} Server Connected`)
  })

  socket.on('disconnect', () => {
    // 연결 끊김
    defaultValue[type + 'Status'] = false
    // 연결 끈어졌을때 자동 전환
    if (defaultValue.auto) {
      if (type === 'main') {
        fnRt('autodisconnect')
        transferTimeout = setTimeout(() => {
          if (defaultValue.mode === 'main') {
            defaultValue.active = false
          } else {
            defaultValue.active = true
          }
          fnRt('settings', defaultValue)
          transferTimeout = null
        }, 1000 * 60 * 5)
      }
    }
    // 프론트엔드에 세팅 전달
    fnRt('settings', defaultValue)
    fnRt('disconnect', { type })
    // 로그
    logger.info(`${type} Server Disconnected`)
  })

  // custom socket event listeners
  customListener(socket, type)
  // return the socket
  return socket
}
