import { io } from 'socket.io-client'
import { BrowserWindow as bw } from 'electron'
import logger from 'src-electron/logger'
import { fnUpdateSchedule } from '../schedules'
import { fnCheckBackupServer, fnCheckMainServer } from '../api/server'
import defaultValue from '../defaultVal'

let socket = null

const connectIO = () => {
  try {
    const socket = io.connect(
      process.env.NODE_ENV === 'development'
        ? 'https://10.20.0.192/scheduler'
        : 'http://127.0.0.1:3000/scheduler',
      {
        // secure: true,
        transports: ['websocket'],
        rejectUnauthorized: false,
        autoConnect: true,
        extraHeaders: {
          token: process.env.SCHEDULER_PASS
        }
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

    socket.on('active', (mode) => {
      try {
        defaultValue.activeMode = mode
        defaultValue.active = mode === defaultValue.mode
        bw.fromId(1).webContents.send('settings', defaultValue)
      } catch (error) {
        logger.error('Error on active', error)
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
  } catch (error) {
    logger.error('Error on connectIO', error)
  } finally {
    // return socket
  }

  // socketParser(socket)

  //return
}

export { connectIO, socket }
