import { BrowserWindow as bw } from 'electron'
import logger from 'src-electron/logger'
import defaultValue from 'src-electron/defaultVal'

const fnRt = (channel, obj) => {
  try {
    bw.fromId(1).webContents.send(channel, obj)
  } catch (error) {
    logger.error(`IPC RT Error ${error}`)
  }
}

const fnRtSettings = () => {
  fnRt('settings', defaultValue)
}

export { fnRt, fnRtSettings }
