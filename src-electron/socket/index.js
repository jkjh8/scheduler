//socket io client 서버로 연결
import defaultValue from '../defaultVal'
import logger from '../logger'
import { fnRt } from '../ipc'
import { fnConnectSocket } from './connect'

let mainSocket = null
let backupSocket = null

const fnConnectSocketMainServer = () => {
  if (defaultValue.mainServer) {
    if (mainSocket && mainSocket.connected) {
      mainSocket.disconnect()
    }
    mainSocket = fnConnectSocket('main')
  } else {
    // If the main server is not set, set the mainStatus to false
    defaultValue.mainStatus = false
    fnRt('settings', defaultValue)
    logger.error('Main Server IP Address is not set')
  }
}

const fnConnectSocketBackupServer = () => {
  if (defaultValue.backupServer) {
    if (backupSocket && backupSocket.connected) {
      backupSocket.disconnect()
    }
    backupSocket = fnConnectSocket('backup')
  } else {
    // If the backup server is not set, set the backupStatus to false
    defaultValue.backupStatus = false
    fnRt('settings', defaultValue)
    logger.error('Backup Server IP Address is not set')
  }
}

const fnConnectSockets = () => {
  fnConnectSocketMainServer()
  fnConnectSocketBackupServer()
}

const fnSocketAddressChange = (type) => {
  if (type === 'main') {
    if (mainSocket && mainSocket.connected) {
      mainSocket.disconnect()
    }
    fnConnectSocketMainServer()
  } else {
    if (backupSocket && backupSocket.connected) {
      backupSocket.disconnect()
    }
    fnConnectSocketBackupServer()
  }
}

const fnSendSockets = (addr, data) => {
  if (mainSocket && mainSocket.connected) {
    mainSocket.emit(addr, data)
  }
  if (backupSocket && backupSocket.connected) {
    backupSocket.emit(addr, data)
  }
}

export {
  mainSocket,
  backupSocket,
  fnSendSockets,
  fnConnectSocketMainServer,
  fnConnectSocketBackupServer,
  fnConnectSockets,
  fnSocketAddressChange
}
