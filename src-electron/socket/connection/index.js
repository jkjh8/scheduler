import { io } from 'socket.io-client'
import defaultValue from 'app/src-electron/defaultVal'
import logger from 'app/src-electron/logger'

const connect = (address) => {
  const socket = io(address, {
    autoConnect: true
  })

  socket.on('connect', () => {
    logger.info('socket connected')
  })

  socket.on('disconnect', () => {
    logger.info('socket disconnected')
  })

  socket.on('connect_error', (error) => {
    logger.error(`socket connect_error ${error}`)
  })

  socket.on('connect_timeout', (timeout) => {
    logger.error(`socket connect_timeout ${timeout}`)
  })

  socket.on('error', (error) => {
    logger.error(`socket error ${error}`)
  })
}

export { connect }
