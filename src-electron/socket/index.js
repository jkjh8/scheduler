//socket io client 서버로 연결
import defaultValue from '../defaultVal'
import { io } from 'socket.io-client'
import logger from '../logger'
import { fnRt } from '../ipc'

let mainSocket = null
let backupSocket = null

const connectSocketMainServer = () => {
  if (defaultValue.mainServer) {
    mainSocket = io(`${defaultValue.mainServer}/scheduler`)
  }
}

const connectSocketBackupServer = () => {
  if (defaultValue.backupServer) {
    backupSocket = io(`${defaultValue.backupServer}/scheduler`)
  }
}

export {
  mainSocket,
  backupSocket,
  connectSocketMainServer,
  connectSocketBackupServer
}
