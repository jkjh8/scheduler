import { io } from 'socket.io-client'
import logger from 'src-electron/logger'
import { fnUpdateSchedule } from '../schedules'
import { fnCheckBackupServer, fnCheckMainServer } from '../api/server'

exports.connectIO = () => {
  const socket = io.connect('http://192.168.1.129/scheduler', {
    // secure: true,
    transports: ['websocket'],
    rejectUnauthorized: false,
    autoConnect: true
  })

  socket.on('connect', () => {
    logger.info('Socket.io connected')
    socket.emit('schedules')
  })

  socket.on('connect_error', (err) => {
    logger.error('Socket.io connect_error', err)
  })

  socket.on('error', (error) => {
    logger.error(`Socket.io error: ${error}`)
  })

  socket.on('disconnect', () => {
    logger.info('Socket.io disconnected')
  })

  socket.on('schedules', (data) => {
    fnUpdateSchedule(JSON.parse(data))
  })

  socket.on('setup', () => {
    fnCheckMainServer()
    fnCheckBackupServer()
  })

  // socketParser(socket)

  //return
  exports.socket = socket
}
