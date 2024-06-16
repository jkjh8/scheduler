import logger from 'src-electron/logger'
export default function (socket, type) {
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
}
