import { io } from 'socket.io-client'
import { BrowserWindow as bw } from 'electron'
import logger from 'src-electron/logger'
import { fnUpdateSchedule } from '../schedules'
import { fnCheckBackupServer, fnCheckMainServer } from '../api/server'
import defaultValue from '../defaultVal'

exports.connectIO = () => {
  const socket = io.connect('http://127.0.0.1:3000/scheduler', {
    // secure: true,
    transports: ['websocket'],
    rejectUnauthorized: false,
    autoConnect: true
  })

  socket.on('connect', () => {
    logger.info('Socket.io connected')
    socket.emit('schedules', {})
    defaultValue.connected = true
    bw.fromId(1).webContents.send('settings', defaultValue)
  })

  socket.on('connect_error', (err) => {
    logger.error('Socket.io connect_error', err)
  })

  socket.on('error', (error) => {
    logger.error(`Socket.io error: ${error}`)
  })

  socket.on('disconnect', () => {
    logger.info('Socket.io disconnected')
    defaultValue.connected = false
    bw.fromId(1).webContents.send('settings', defaultValue)
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
