import path from 'path'
import fs from 'fs'
import { app } from 'electron'
import winston from 'winston'
import wd from 'winston-daily-rotate-file'
import { log } from 'console'

// initialize functions
const { combine, timestamp, label, printf } = winston.format
// path
let logpath = 'D:/Data/log'
if (process.env.NODE_ENV === 'development') {
  logpath = path.resolve(app.getPath('userData'), 'log')
} else {
  if (fs.existsSync(logpath)) {
    if (!fs.existsSync(path.join(logpath, 'scheduler'))) {
      fs.mkdirSync(path.join(logpath, 'scheduler'))
    }
    logpath = path.join(logpath, 'scheduler')
  } else {
    logpath = path.resolve(app.getPath('userData'), 'log')
  }
}
console.log(logpath)

const logformat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level} ${message}`
})

const logger = winston.createLogger({
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logformat),
  transports: [
    new wd({
      level: 'info',
      dataPattern: 'YYYY-MM-DD',
      dirname: logpath,
      finename: `%DATE%.log`,
      maxFiles: 30,
      zippedArchive: true
    })
  ],
  exceptionHandlers: [
    new wd({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logpath,
      filename: `%DATE%.exception.log`,
      maxFiles: 30,
      zippedArchive: true
    })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logformat)
    })
  )
}

export default logger
