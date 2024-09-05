import { io } from 'socket.io-client'
import { BrowserWindow as bw } from 'electron'
import logger from 'src-electron/logger'
import { fnUpdateSchedule } from '../schedules'
import { fnCheckBackupServer, fnCheckMainServer } from '../api/server'
import defaultValue from '../defaultVal'

exports.connectIO = () => {
  try {
    const socket = io.connect(
      process.env.NODE_ENV === 'development'
        ? 'http://10.20.0.191/scheduler'
        : 'http://127.0.0.1:3000/scheduler',
      {
        // secure: true,
        transports: ['websocket'],
        rejectUnauthorized: false,
        autoConnect: true
      }
    )

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
      try {
        const schedule = JSON.parse(data)
        fnUpdateSchedule(schedule)
      } catch (error) {
        logger.error('Error on schedules', error)
      }
    })

    socket.on('setup', () => {
      try {
        fnCheckMainServer()
        fnCheckBackupServer()
      } catch (error) {
        logger.error('Error on setup', error)
      }
    })
    exports.socket = socket
  } catch (error) {
    logger.error('Error on connectIO', error)
  } finally {
    // return socket
  }

  // socketParser(socket)

  //return
}
